class App
{
    btnRandomLifeGeneration = document.getElementById('btn-generate-random-cells')
    btnCreateBoard = document.getElementById('btn-create-board')
    btnStart = document.getElementById('btn-start')
    inputWidth = document.getElementById('input-width')
    inputHeight = document.getElementById('input-height')

    constructor (board, stateManager) {
        this.board = board
        this.stateManager = stateManager

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

    startNewGame = () => {}

    updateBoard = (clickedElement) => {
        if (clickedElement.classList.contains('cell')) {
            const [_, x, y] = clickedElement.getAttribute('id').split('_')

            this.board.updateBoard(clickedElement, x, y)
            this.stateManager.updateLifeMap(x, y, true)
        }
    }
}