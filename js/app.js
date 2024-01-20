class App
{
    btnRandomLifeGeneration = document.getElementById('btn-create-board')
    btnCreateBoard = document.getElementById('btn-create-board')
    btnStart = document.getElementById('btn-start')
    inputWidth = document.getElementById('input-width')
    inputHeight = document.getElementById('input-height')

    constructor (board) {
        this.board = board

        this.setHandlers()
    }

    setHandlers = () => {
        this.btnCreateBoard.addEventListener('click', () => this.createBoard())
        this.btnRandomLifeGeneration.addEventListener('click', () => this.createRandomLifeBoard())
        this.btnStart.addEventListener('click', () => this.startNewGame())
    }

    createBoard = () => {
        this.board
            .reset()
            .setSize(this.inputWidth.value, this.inputHeight.value)
            .makeBoardMap()
            .draw()
    }

    createRandomLifeBoard = () => {}

    startNewGame = () => {}
}