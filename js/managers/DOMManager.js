class DOMManager
{
    isAboutBlockActive = false
    isPresetsBlockActive = false

    constructor (app, presetStorage) {
        this.presetStorage = presetStorage
        this.app = app


        this.blockAbout = document.getElementById('block-about')
        this.blockPresets = document.getElementById('block-presets')
        this.inputWidth = document.getElementById('input-width')
        this.inputHeight = document.getElementById('input-height')


        document.addEventListener('click', (event) => this.clickHandlers(event.target))
    }

    clickHandlers = (element) => {
        if (element.classList.contains('btn-preset')) {
            switch (element.id) {
                case 'preset-glasses':
                    return this.app.setPreset(this.presetStorage.glasses())
                case 'preset-heptapole':
                    return this.app.setPreset(this.presetStorage.heptapole())
                case 'preset-figure-eight':
                    return this.app.setPreset(this.presetStorage.figureEight())
                case 'preset-pulsar':
                    return this.app.setPreset(this.presetStorage.pulsar())
                case 'preset-hammerhead':
                    return this.app.setPreset(this.presetStorage.hammerhead())
                case 'preset-gosper-glider-gun':
                    return this.app.setPreset(this.presetStorage.gosperGliderGun())
            }
        }

        if (element.classList.contains('cell')) {
            const [_, x, y] = element.getAttribute('id').split('_')

            return this.app.updateBoard(element, x, y)
        }

        switch (element.id) {
            case 'btn-about':
                return this.showAboutBlock()
            case 'btn-presets':
                return this.showPresetsBlock()
            case 'btn-create-board':
                return this.app.createBoard(this.inputWidth.value, this.inputHeight.value)
            case 'btn-generate-random-cells':
                return this.app.createRandomLifeBoard()
            case 'btn-start':
                return this.app.startNewGame()
        }
    }

    showAboutBlock = () => {
        this.blockAbout.classList.toggle('active')

        if (this.isPresetsBlockActive) {
            this.showPresetsBlock()
        }

        this.isAboutBlockActive = !this.isAboutBlockActive
    }

    showPresetsBlock = () => {
        this.blockPresets.classList.toggle('active')

        if (this.isAboutBlockActive) {
            this.showAboutBlock()
        }

        this.isPresetsBlockActive = !this.isPresetsBlockActive
    }
}