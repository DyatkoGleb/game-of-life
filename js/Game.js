class Game
{
    ALLOWED_NUMBER_NEIGHBORS_FOR_SURVIVAL = [2, 3]
    ALLOWED_NUMBER_NEIGHBORS_FOR_NEW_LIFE = 3
    mapDeadCells = []

    constructor (board, stateManager) {
        this.stateManager = stateManager
        this.board = board
    }

    start = () => {
        this.stateManager.fixStateBeforeNextGeneration()
            .setNewLifeMap(this.createNewLifeMap())

        this.board.rerender()
            .makeNewBoardLifeMap()

        requestAnimationFrame(() => this.start())
    }

    createNewLifeMap = () => {
        this.findSurvivingCellsAndCreateMapDeadCells()
        this.findBornCells()

        return this.stateManager.newLifeMap
    }

    findSurvivingCellsAndCreateMapDeadCells = () => {
        this.addLiveCellsToMap(this.stateManager.oldLifeMap, this.isSurvivor)
    }

    findBornCells = () => {
        this.addLiveCellsToMap(this.mapDeadCells, this.isLifeMustBeBorn)
    }

    addLiveCellsToMap = (map, callback) => {
        for (let y in map) {
            for (let idx in map[y]) {
                const x = Number(map[y][idx])
                y = Number(y)

                if (callback(x, y)) {
                    this.addCoordinatesToLifeMap(x, y)
                }
            }
        }
    }

    isLivingCell = (x, y) => {
        return this.board.boardMap[y][x].life
    }

    addCellToMap = (map, x, y) => {
        if (!map[y]) {
            map[y] = [x]
            return
        }

        map[y] = [...map[y], x]
    }

    addCoordinatesToLifeMap = (x, y) => {
        this.stateManager.updateLifeMap(x, y)
    }

    isSurvivor = (x, y) => {
        let counter = 0

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue
                }

                const [neighborX, neighborY] = this.getNeighborCoordinates(x, y, i, j)

                this.isLivingCell(neighborX, neighborY) ? counter++ : this.addCellToMap(this.mapDeadCells, neighborX, neighborY)
            }
        }

        return this.ALLOWED_NUMBER_NEIGHBORS_FOR_SURVIVAL.includes(counter)
    }

    isLifeMustBeBorn = (x, y) => {
        let counter = 0

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue
                }

                const [neighborX, neighborY] = this.getNeighborCoordinates(x, y, i, j)

                if (this.isLivingCell(neighborX, neighborY)) {
                    counter++
                }
            }
        }

        return counter === this.ALLOWED_NUMBER_NEIGHBORS_FOR_NEW_LIFE
    }

    getNeighborCoordinates = (x, y, offsetX, offsetY) => {
        let neighborX = x + offsetX
        let neighborY = y + offsetY

        if (neighborX > this.board.width - 1) {
            neighborX = 0
        } else if (neighborX < 0) {
            neighborX = this.board.width - 1
        }

        if (neighborY > this.board.height - 1) {
            neighborY = 0
        } else if (neighborY < 0) {
            neighborY = this.board.height - 1
        }

        return [neighborX, neighborY]
    }
}