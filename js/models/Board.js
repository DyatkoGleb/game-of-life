class Board
{
    boardMap = []

    constructor (width, height) {
        this.width = width
        this.height = height

        this.makeBoardMap()
    }

    setSize = (width, height) => {
        this.width = width
        this.height = height

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

    reset = () => {
        document.querySelector('.board')?.remove()

        this.boardMap = []

        return this
    }
}