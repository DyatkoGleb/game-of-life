document.addEventListener('DOMContentLoaded', () => {
    new ScriptLoader().loadScripts().then(() => {
        const stateManager = new StateManager()
        const board = new Board(stateManager)
        const game = new Game(board, stateManager)
        const app = new App(board, stateManager, game)

        new DOMManager(app, new PresetStorage(), stateManager)
    }).catch((error) => {
        console.error('Error loading scripts:', error)
    })
})

class ScriptLoader {
    scriptPaths = [
        './js/App',
        './js/models/Cell',
        './js/models/Board',
        './js/Utils',
        './js/managers/StateManager',
        './js/Game',
        './js/managers/DOMManager',
        './js/PresetStorage',
    ]

    loadScript = (src) => {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script')
            script.src = src + '.js'

            script.onload = () => resolve(script)
            script.onerror = () => reject(new Error(`Error loading the script ${src}`))

            document.head.append(script)
        })
    }

    loadScripts = () => {
        return Promise.all(this.scriptPaths.map(path => this.loadScript(path)))
    }
}