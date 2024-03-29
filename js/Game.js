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
        const startTime = new Date().getTime()

        this.stateManager.fixStateBeforeNextGeneration()
            .setNewLifeMap(this.createNewLifeMap())
            .setGenerationNumber(this.stateManager.generationNumber + 1)

        this.stateManager.showNumberOfGeneration(this.stateManager.generationNumber)

        this.stateManager.showTimeToNewGeneration(new Date().getTime() - startTime)

        this.board.rerender()
            .makeNewBoardLifeMap()

        this.stateManager.showTimeToNewGenerationWithRerender(new Date().getTime() - startTime)

        if (!Object.keys(this.stateManager.oldLifeMap).length) {
            this.stateManager.isGameProcessing = false
            return
        }

        if (this.stateManager.isGameProcessing) {
            requestAnimationFrame(() => this.start())
        }
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
            y = Number(y)
            for (let i = 0; i < map[y].length; i++) {
                const x = Number(map[y][i])

                if (callback(x, y)) {
                    this.addCoordinatesToLifeMap(x, y)
                }
            }
        }
    }

    addCoordinatesToLifeMap = (x, y) => {
        this.stateManager.updateLifeMap(x, y)
    }

    /**
     * Проверяет, выживет ли ячейка с заданными координатами в следующем поколении, основываясь на количестве живых соседей.
     * Если проверяемый сосед - мёртвая клетка - заносит в массив клеток, которые нужно проверить на предмет возможности
     * зарождения новой жизни.
     *
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    isSurvivor = (x, y) => {
        let counter = 0

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue
                }

                const [neighborX, neighborY] = this.getNeighborCoordinates(x, y, i, j)

                this.isLivingCell(neighborX, neighborY) ? counter++ : this.addCellToChecklistForBirthNewLife(this.mapDeadCells, neighborX, neighborY)
            }
        }

        return this.ALLOWED_NUMBER_NEIGHBORS_FOR_SURVIVAL.includes(counter)
    }

    /**
     * Проверяет, зародится ли новая жизнь в ячейке с заданными координатами в следующем поколении, основываясь на
     * количестве живых соседей.
     *
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
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

                if (counter > this.ALLOWED_NUMBER_NEIGHBORS_FOR_NEW_LIFE) {
                    return false
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

    isLivingCell = (x, y) => {
        return this.board.boardMap[y][x].life
    }

    addCellToChecklistForBirthNewLife = (map, x, y) => {
        if (!map[y]) {
            map[y] = [x]
            return
        }

        map[y] = [...map[y], x]
    }
}