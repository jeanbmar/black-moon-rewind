const EventEmitter = require('events');
const frida = require('frida');
const { makeCompiler } = require('frida-compile');

class FridaClient extends EventEmitter {
  static async compile(script, cache = {}, options = {}) {
    return makeCompiler(script, cache, options)();
  }

  static async inject(device, pid, source, options) {
    const session = await device.attach(pid, options);
    return session.createScript(source);
  }

  configureEvents(script) {
    script.message.connect((message) => {
      if (message.type === 'send') {
        const { payload } = message;
        if (typeof payload === 'string') {
          this.emit('info', payload);
        } else {
          this.emit(payload.type, payload.message);
        }
      } else if (message.type === 'error') {
        this.emit('error', message.stack);
      }
    });
  }

  async connect(options = {}) {
    const { packageName, packageOptions, script: agentScript, cwd } = options;
    const { bundle: source } = await FridaClient.compile(agentScript);
    this.emit('info', 'agent built successfully');
    const device = await frida.getLocalDevice();
    const pid = await device.spawn(packageName, { argv: packageOptions, cwd });
    this.emit('info', `spawned ${packageName} with pid ${pid}`);
    const script = await FridaClient.inject(device, pid, source);
    this.configureEvents(script);
    await script.load();
    const done = script.exports.init(null, options);
    this.emit('info', `${packageName} injected`);
    await device.resume(pid);
    this.emit('info', 'app execution resumed');
    done.catch((error) => this.emit('error', error));
    return script;
  }
}

module.exports = FridaClient;
