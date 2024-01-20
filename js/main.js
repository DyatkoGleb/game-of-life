document.addEventListener('DOMContentLoaded', () => {
    new ScriptLoader().loadScripts().then(() => {
        new App(new Board())
    }).catch((error) => {
        console.error('Error loading scripts:', error)
    })
})

class ScriptLoader {
    scriptPaths = [
        './js/app',
        './js/models/Cell',
        './js/models/Board',
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