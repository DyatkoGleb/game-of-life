class App
{
    constructor (board, stateManager, game) {
        this.stateManager = stateManager
        this.board = board
        this.game = game

        this.btnRandomLifeGeneration = document.getElementById('btn-generate-random-cells')
        this.btnCreateBoard = document.getElementById('btn-create-board')
        this.btnStart = document.getElementById('btn-start')
        this.inputWidth = document.getElementById('input-width')
        this.inputHeight = document.getElementById('input-height')

        this.setHandlers()
    }

    setHandlers = () => {
        this.btnCreateBoard.addEventListener('click', () => this.createBoard())
        this.btnRandomLifeGeneration.addEventListener('click', () => this.createRandomLifeBoard())
        this.btnStart.addEventListener('click', () => this.startNewGame())
        document.addEventListener('click', (event) => this.updateBoard(event.target))
    }

    createBoard = () => {
        this.board
            .reset()
            .setSize(this.inputWidth.value, this.inputHeight.value)
            .makeBoardMap()
            .draw()
    }

    createRandomLifeBoard = () => {
        this.stateManager.fixStateBeforeNextGeneration()
            .generateRandomLifeMap(this.board.width, this.board.height)

        this.board.updateBoardMap(this.stateManager.mergeOldAndNewLifeMaps())
            .rerender()
    }

    startNewGame = () => {
        this.game.start()
    }

    updateBoard = (clickedElement) => {
        if (clickedElement.classList.contains('cell')) {
            const [_, x, y] = clickedElement.getAttribute('id').split('_')

            this.board.updateBoard(clickedElement, x, y)
            this.stateManager.updateLifeMap(x, y, true)
        }
    }

    setPreset = ({ width, height, preset}) => {
        this.stateManager.newLifeMap = preset

        this.board
            .reset()
            .setSize(width, height)
            .makeBoardMap()
            .updateBoardMap(this.stateManager.newLifeMap)
            .draw()
    }
}