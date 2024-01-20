class StateManager
{
    oldLifeMap = {}
    newLifeMap = {}

    constructor () {
        this.utils = new Utils()
    }

    generateRandomLifeMap = (boardWidth, boardHeight) => {
        const countRandomCells = this.utils.getRandomNumber(boardWidth - 1, boardWidth * boardHeight / 4)

        for (let i = 0; i < countRandomCells; i++) {
            const x = this.utils.getRandomNumber(0, boardWidth - 1)
            const y = this.utils.getRandomNumber(0, boardHeight - 1)

            this.updateLifeMap(this.newLifeMap, x, y)
        }
    }

    updateLifeMap = (map, x, y, needRemoveIfExists = false) => {
        if (!map.hasOwnProperty(y)) {
            map[y] = []
        }

        x = Number(x)
        y = String(y)

        if (!map[y].includes(x)) {
            map[y].push(x)
        } else if (needRemoveIfExists) {
            this.removeCell(map[y], x)
        }
    }

    removeCell = (list, x) => {
        return list.filter(newX => newX !== x)
    }

    creteMapForRerender = () => {
        if (!Object.keys(this.oldLifeMap).length) {
            return this.newLifeMap
        }

        return this.mergeOldAndNewLifeMaps()
    }

    mergeOldAndNewLifeMaps = () => {
        const mapForUpdating = this.utils.deepCopy(this.newLifeMap)

        for (let oldY in this.oldLifeMap) {
            if (mapForUpdating[oldY] === undefined) {
                mapForUpdating[oldY] = [...this.oldLifeMap[oldY]]
            } else {
                for (let idx in this.oldLifeMap[oldY]) {
                    const oldX = this.oldLifeMap[oldY][idx]

                    if (mapForUpdating[oldY].includes(oldX)) {
                        mapForUpdating[oldY] = this.removeCell(mapForUpdating[oldY], oldX)
                    } else {
                        mapForUpdating[oldY].push(oldX)
                    }
                }
            }
        }

        return mapForUpdating
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