class App
{
    btnRandomLifeGeneration = document.getElementById('btn-generate-random-cells')
    btnCreateBoard = document.getElementById('btn-create-board')
    btnStart = document.getElementById('btn-start')
    inputWidth = document.getElementById('input-width')
    inputHeight = document.getElementById('input-height')

    constructor (board, stateManager, game) {
        this.stateManager = stateManager
        this.board = board
        this.game = game

        this.setHandlers()
    }

    setHandlers = () => {
        document.addEventListener('mousedown', this.handleMouseDown)
        document.addEventListener('mouseup', this.handleMouseUp)
        document.addEventListener('mouseover', this.handleMouseOver)

        this.btnCreateBoard.addEventListener('click', () => this.createBoard())
        this.btnRandomLifeGeneration.addEventListener('click', () => this.createRandomLifeBoard())
        this.btnStart.addEventListener('click', () => this.startNewGame())
    }

    handleMouseDown = (event) => {
        this.isMouseDown = true

        this.updateBoard(event.target)
    }

    handleMouseOver = (event) => {
        if (this.isMouseDown) {
            this.updateBoard(event.target)
        }
    }

    handleMouseUp = () => {
        this.isMouseDown = false
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

    updateBoard = (element) => {
        if (element.classList.contains('cell')) {
            const [_, x, y] = element.getAttribute('id').split('_')

            this.board.updateBoard(element, x, y)
            this.stateManager.updateLifeMap(x, y, true)
        }
    }
}