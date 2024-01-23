class App
{
    constructor (board, stateManager, game) {
        this.stateManager = stateManager
        this.board = board
        this.game = game
    }

    createBoard = (width, height) => {
        this.board
            .reset()
            .setSize(width, height)
            .makeBoardMap()
            .draw()
    }

    createRandomLifeBoard = () => {
        this.board
            .reset()
            .setSize()
            .makeBoardMap()

        this.stateManager.fixStateBeforeNextGeneration()
            .generateRandomLifeMap(this.board.width, this.board.height)

        this.board
            .updateBoardMap(this.stateManager.mergeOldAndNewLifeMaps())
            .draw()
    }

    startNewGame = () => {
        this.game.start()
    }

    updateBoard = (clickedElement, x, y) => {
        this.board.updateBoard(clickedElement, x, y)
        this.stateManager.updateLifeMap(x, y, true)
    }

    setPreset = ({ width, height, preset }) => {
        this.stateManager.newLifeMap = preset

        this.board
            .clearBoard()
            .setSize(width, height)
            .makeBoardMap()
            .updateBoardMap(this.stateManager.newLifeMap)
            .draw()
    }
}