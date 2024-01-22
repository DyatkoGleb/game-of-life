class DOMManager
{
    isAboutBlockActive = false
    isPresetsBlockActive = false

    constructor (app, presetStorage) {
        this.presetStorage = presetStorage
        this.app = app


        this.btnAbout = document.getElementById('btn-about')
        this.blockAbout = document.getElementById('block-about')
        this.btnPresets = document.getElementById('btn-presets')
        this.blockPresets = document.getElementById('block-presets')

        this.setHandlers()
    }

    setHandlers = () => {
        this.btnAbout.addEventListener('click', () => this.showAboutBlock())
        this.btnPresets.addEventListener('click', () => this.showPresetsBlock())

        document.addEventListener('click', (event) => this.elementsHandler(event.target))
    }

    elementsHandler = (element) => {
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