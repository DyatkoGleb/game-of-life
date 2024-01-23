class StateManager
{
    oldLifeMap = {}
    newLifeMap = {}

    isGameProcessing = false

    constructor () {
        this.utils = new Utils()
    }

    generateRandomLifeMap = (boardWidth, boardHeight) => {
        const countRandomCells = this.utils.getRandomNumber(boardWidth - 1, boardWidth * boardHeight / 4)

        for (let i = 0; i < countRandomCells; i++) {
            const x = this.utils.getRandomNumber(0, boardWidth - 1)
            const y = this.utils.getRandomNumber(0, boardHeight - 1)

            this.updateLifeMap(x, y)
        }
    }

    updateLifeMap = (x, y, needRemoveIfExists = false) => {
        if (!this.newLifeMap.hasOwnProperty(y)) {
            this.newLifeMap[y] = []
        }

        x = Number(x)
        y = String(y)

        if (!this.newLifeMap[y].includes(x)) {
            this.newLifeMap[y].push(x)
        } else if (needRemoveIfExists) {
            this.newLifeMap = this.removeCell(this.newLifeMap, y, x)
        }
    }

    removeCell = (map, y, x) => {
        map[y] = map[y].filter(newX => newX !== x)

        if (!map[y].length) {
            delete map[y]
        }

        return map
    }

    createMapForRerender = () => {
        if (!Object.keys(this.oldLifeMap).length) {
            return this.newLifeMap
        }

        return this.mergeOldAndNewLifeMaps()
    }

    /**
     * Генерирует объект c координатами ячеек, которые должны измениться на текущем ходе:
     * - умереть - те, что были на предыдущей итерации и отсутствуют на текущей,
     * - родиться - те, которых не было на предыдущей итерации, но появились на текущей.
     *
     * @function
     * @returns {Object<number, number[]>} - Объект c координатами клеток которые нужно "перевернуть"
     */
    mergeOldAndNewLifeMaps = () => {
        let mapForUpdating = this.utils.deepCopy(this.newLifeMap)

        for (let oldY in this.oldLifeMap) {
            for (let idx in this.oldLifeMap[oldY]) {
                const oldX = this.oldLifeMap[oldY][idx]

                if (mapForUpdating[oldY] === undefined) {
                    mapForUpdating[oldY] = []
                }

                if (mapForUpdating[oldY].includes(oldX)) {
                    mapForUpdating = this.removeCell(mapForUpdating, oldY, oldX)
                } else {
                    mapForUpdating[oldY].push(oldX)
                }
            }
        }

        return mapForUpdating
    }

    setNewLifeMap = (newLifeMap) => {
        this.newLifeMap = newLifeMap

        return this
    }

    fixStateBeforeNextGeneration = () => {
        this.oldLifeMap = this.newLifeMap
        this.newLifeMap = {}

        return this
    }

    reset = () => {
        this.oldLifeMap = {}
        this.newLifeMap = {}
    }
}