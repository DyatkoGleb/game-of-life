class DOMManager
{
    isAboutBlockActive = false
    isPresetsBlockActive = false

    constructor (app, presetStorage, stateManager) {
        this.presetStorage = presetStorage
        this.stateManager = stateManager
        this.app = app

        this.initDOMElements()

        this.setHandlers()
    }

    initDOMElements = () => {
        this.blockAbout = document.getElementById('block-about')
        this.blockPresets = document.getElementById('block-presets')
        this.inputWidth = document.getElementById('input-width')
        this.inputHeight = document.getElementById('input-height')
        this.btnStart = document.getElementById('btn-start')
        this.btnCreateBoard = document.getElementById('btn-create-board')
        this.btnGenerateRandomCells = document.getElementById('btn-generate-random-cells')
        this.counterNewGeneration = document.getElementById('counter-new-generation')
        this.counterNewGenerationWithRerender = document.getElementById('counter-new-generation-with-rerender')
        this.counterGeneration = document.getElementById('counter-generation')
    }

    setHandlers = () => {
        this.stateManager.setStoppedGameHandler(this.stoppedGameHandler)
        this.stateManager.showNumberOfGeneration(this.showNumberOfGeneration)
        this.stateManager.showTimeToNewGeneration(this.showTimeToNewGeneration)
        this.stateManager.showTimeToNewGenerationWithRerender(this.showTimeToNewGenerationWithRerender)

        document.addEventListener('mousedown', this.handleMouseDown)
        document.addEventListener('mouseup', this.handleMouseUp)
        document.addEventListener('mouseover', this.handleMouseOver)

        document.addEventListener('click', (event) => this.clickHandlers(event.target))
    }

    handleMouseDown = (event) => {
        this.isMouseDown = true

        if (!this.stateManager.isGameProcessing) {
            this.updateBoard(event.target)
        }
    }

    handleMouseOver = (event) => {
        if (this.isMouseDown && !this.stateManager.isGameProcessing) {
            this.updateBoard(event.target)
        }
    }

    updateBoard = (element) => {
        if (element.classList.contains('cell')) {
            const [_, x, y] = element.getAttribute('id').split('_')

            this.app.updateBoard(element, x, y)
        }
    }

    handleMouseUp = () => {
        this.isMouseDown = false
    }

    clickHandlers = (element) => {
        switch (element.id) {
            case 'btn-about':
                return this.showAboutBlock()
            case 'btn-presets':
                return this.showPresetsBlock()
            case 'btn-create-board':
                return this.app.createBoard(this.inputWidth.value, this.inputHeight.value)
            case 'btn-start':
                return this.startStopGame()
        }

        if (this.stateManager.isGameProcessing) {
            return
        }

        switch (element.id) {
            case 'btn-create-board':
                return this.app.createBoard(this.inputWidth.value, this.inputHeight.value)
            case 'btn-generate-random-cells':
                return this.app.createRandomLifeBoard()
        }

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

    stoppedGameHandler = () => {
        this.btnStart.innerText = 'Start'
        this.btnCreateBoard.classList = 'btn'
        this.btnGenerateRandomCells.classList = 'btn'
    }

    startStopGame = () => {
        this.stateManager.isGameProcessing = !this.stateManager.isGameProcessing

        if (this.stateManager.isGameProcessing) {
            this.btnStart.innerText = 'Stop'
            this.btnCreateBoard.classList = 'inactive-btn'
            this.btnGenerateRandomCells.classList = 'inactive-btn'
        } else {
            this.stoppedGameHandler()
        }

        this.app.startNewGame()
    }

    showTimeToNewGeneration = (time) => {
        this.counterNewGeneration.textContent = time
    }

    showTimeToNewGenerationWithRerender = (time) => {
        this.counterNewGenerationWithRerender.textContent = time
    }

    showNumberOfGeneration = (num) => {
        this.counterGeneration.textContent = num
    }

}