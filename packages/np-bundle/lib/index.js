/* eslint-disable no-await-in-loop,no-restricted-syntax */
const fs = require('fs/promises');
const { join, relative, dirname } = require('path');
const Arborist = require('@npmcli/arborist');
const packlist = require('npm-packlist');

const copyPacklist = async (from, to) => {
  const list = await packlist({ path: from });
  for (const file of list) {
    // packlist will include bundled node_modules. ignore it because we're
    // already handling copying dependencies.
    if (!file.startsWith('node_modules/')) {
      await fs.cp(join(from, file), join(to, file), {
        recursive: true,
        errorOnExist: false,
      });
    }
  }
};

const relativeSymlink = async (target, path) => {
  try {
    await fs.mkdir(dirname(path), { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
  await fs.symlink(`./${relative(dirname(path), target)}`, path);
};

const bundle = async (source, destination, options = {}) => {
  const { root = source, omit = new Set() } = options;
  const tree = await new Arborist({ path: root }).loadActual();
  const destinations = new Map();
  for (const edge of tree.edgesOut.values()) {
    if (edge.workspace && source === edge.to.realpath) {
      const to = join(destination, edge.to.location);
      destinations.set(edge.to, to);
    }
  }
  for (const [node, dest] of destinations) {
    if (!node.dev) {
      if (node.isLink && node.target) {
        const targetPath = destinations.get(node.target);
        if (targetPath == null) {
          // This is the first time the link target was seen, it will be the
          // only copy in dest, other links to the same target will link to
          // this copy.
          destinations.set(node.target, dest);
        } else {
          // The link target is already in the destination
          await relativeSymlink(targetPath, dest);
        }
      } else {
        if (node.isWorkspace || node.isRoot) {
          // workspace and root packages have not been published so they may
          // have files that should be excluded.
          await copyPacklist(node.target.realpath, dest);
        } else {
          // copy the modules files but not dependencies.
          const nm = join(node.realpath, 'node_modules');
          await fs.cp(node.realpath, dest, {
            recursive: true,
            errorOnExist: false,
            filter: (src) => src !== nm,
          });
        }
        // add dependency edges to the queue.
        for (const edge of node.edgesOut.values()) {
          if (!omit.has(edge.type) && edge.to != null) {
            destinations.set(
              edge.to,
              join(
                destinations.get(edge.to.parent) || destination,
                relative(edge.to.parent.location, edge.to.location)
              )
            );
          }
        }
      }
    }
  }
};

module.exports = { bundle };
