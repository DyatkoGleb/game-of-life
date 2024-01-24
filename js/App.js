class App
{
    constructor (board, stateManager) {
        this.stateManager = stateManager
        this.board = board

        this.createBoard()
    }

    createBoard = (width, height) => {
        this.board
            .reset()
            .setNewSize(width, height)
            .makeBoardMap()
            .draw()
    }

    createRandomLifeBoard = () => {
        this.board
            .reset()
            .makeBoardMap()

        this.stateManager.fixStateBeforeNextGeneration()
            .generateRandomLifeMap(this.board.width, this.board.height)

        this.board
            .updateBoardMap(this.stateManager.mergeOldAndNewLifeMaps())
            .draw()
    }

    updateBoard = (clickedElement, x, y) => {
        this.board.updateBoard(clickedElement, x, y)
        this.stateManager.updateLifeMap(x, y, true)
    }

    setPreset = ({ width, height, preset }) => {
        this.board.reset()

        this.stateManager.newLifeMap = preset

        this.board
            .setNewSize(width, height)
            .makeBoardMap()
            .updateBoardMap(this.stateManager.newLifeMap)
            .draw()
    }
}