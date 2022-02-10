document.getElementById('play')
    .addEventListener('click', async () => window.game.emit('game:start'));

window.game.on('game:update-started', () => {
    document.getElementById('play').classList.add('hide');
    document.getElementById('update').classList.remove('hide');
});
window.game.on('game:update-progress', (event, progress) => {
    document.getElementById('update-percentage').innerText = progress;
});
window.game.on('game:update-finished', () => {
    document.getElementById('play').classList.remove('hide');
    document.getElementById('update').classList.add('hide');
});
window.game.on('game:update-error', (event, error) => {
    document.getElementById('update').classList.add('hide');
    document.getElementById('update-error').classList.remove('hide');
});
