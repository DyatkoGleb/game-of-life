class Board
{
    boardMap = []

    constructor (stateManager, width, height) {
        this.stateManager = stateManager
        this.width = width
        this.height = height

        this.makeBoardMap()
    }

    setSize = (width = 30, height = 30) => {
        if (!this.width) {
            this.width = width
        }
        if (!this.height) {
            this.height = height
        }

        return this
    }

    setNewSize = (width, height) => {
        if (!width) {
            this.width = 20
        } else {
            this.width = width
        }
        if (!height) {
            this.height = 20
        } else {
            this.height = height
        }

        return this
    }

    makeBoardMap = () => {
        for (let i = 0; i < this.height; i++) {
            const row = []

            for (let j = 0; j < this.width; j++) {
                row.push(new Cell(j, i, false))
            }

            this.boardMap.push(row)
        }

        return this
    }

    draw = () => {
        document.getElementById('board-wrapper').append(this.makeBoard())
    }

    makeBoard = () => {
        const board = document.createElement('div')
        board.classList.add('board')

        this.boardMap.forEach(boardRow => {
            board.append(this.makeRow(boardRow))
        })

        return board
    }

    makeRow = (boardRow) => {
        const row = document.createElement('div')
        row.classList.add('row')

        boardRow.forEach(boardCell => {
            const cell = document.createElement('div')
            cell.classList = boardCell.life ? 'cell life' : 'cell'
            cell.id = `cell_${boardCell.x}_${boardCell.y}`

            row.append(cell)
        })

        return row
    }

    updateBoardMap = (map) => {
        for (let y in map) {
            for (let i = 0; i < map[y].length; i++) {
                this.updateLifeInCellOnBoardMap(map[y][i], y)
            }
        }

        return this
    }

    updateLifeInCellOnBoardMap = (x, y) => {
        this.boardMap[y][x].life = !this.boardMap[y][x].life
    }

    rerender = () => {
        const mapForRerender = this.stateManager.createMapForRerender()

        for (let y in mapForRerender) {
            if (mapForRerender[y].length) {
                for (let i = 0; i < mapForRerender[y].length; i++) {
                    this.toggleElementCellClassState(document.getElementById(`cell_${mapForRerender[y][i]}_${y}`))
                }
            }
        }

        return this
    }

    toggleElementCellClassState = (element) => {
        element.classList.toggle('life')
    }

    updateBoard = (element, x, y) => {
        this.updateLifeInCellOnBoardMap(x, y)
        this.toggleElementCellClassState(element)
    }

    makeNewBoardLifeMap = () => {
        this.updateBoardMap(this.stateManager.mergeOldAndNewLifeMaps())
    }

    clearBoard = () => {
        document.querySelector('.board')?.remove()

        this.boardMap = []

        return this
    }

    reset = () => {
        this.clearBoard()

        this.stateManager.reset()

        return this
    }
}