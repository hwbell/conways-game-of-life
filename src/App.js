import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const mainColor = 'black'

class App extends Component {
  constructor(props) {
    super(props)
    this.clearBoard = this.clearBoard.bind(this)
    this.pauseBoard = this.pauseBoard.bind(this)
    this.runGame = this.runGame.bind(this)
    this.state = {
      intervalId: null,
      deadCell: "white",
      aliveCell: mainColor,
      size: 20,
      totalRows: 20,
      totalColumns: 20,
      boardMatrix: this.makeRandomBoard(20, 20),
      speed: 500,
      generation: 0
    }
  }

  componentDidMount() {
    console.log("mounted")
    this.runGame()
  }

  makeBoard(length, width) {
    var deadCell = "white"
    let grid = []
    for (let i = 0; i < length; i++) {
      grid.push(Array(width).fill(deadCell))
    }
    return grid
  }

  makeRandomBoard(length, width) {
    var cells = ["white", mainColor]
    let grid = []
    for (let i = 0; i < length; i++) {
      let row = []
      var squareColor
      for (let i = 0; i < width; i++) {

        var randomColor = Math.random()
        if (randomColor < 0.75) {
          // option 1: chance 0.0–0.499...
          squareColor = cells[0]
        } else if (randomColor < 1) {
          // option 2: chance 0.50—0.7499...
          squareColor = cells[1]
        }
        row.push(squareColor)
      }
      grid.push(row)
    }
    return grid
  }

  changeSize(int) {
    let length = this.state.totalRows
    let width = this.state.totalColumns
    if (int === 0) {
      if (length > 20) {length = length - 5}
      if (width > 20)  {width = width - 5}
    } else {
      if (length < 60)  {length = length + 5}
      if (width < 60)  {width = width + 5}
    }
    this.clearBoard()
    this.setState({
      boardMatrix: this.makeBoard(length, width),
      totalRows: length,
      totalColumns: width
    })
  }

  changeSpeed(int) {
    let speed = this.state.speed
    if (int === 0) {
      if (speed < 2000)  {speed = speed + 250};
    } else {
      if (speed > 250) {speed = speed - 250};
    }
    this.setState({ speed: speed })
  }

  handleButtonClick(row, column) {
    console.log(row, column)
    let newBoard = this.state.boardMatrix.slice()
    let newRow = newBoard[row].slice()
    console.log(newBoard[row][column])
    newRow[column] = newRow[column] !== this.state.aliveCell ? this.state.aliveCell : this.state.deadCell
    newBoard.splice(row, 1, newRow)
    //grid = newBoard
    this.setState({ boardMatrix: newBoard })
  }

  generateNextGeneration() {
    this.setState({ generation: this.state.generation + 1 })
    let self = this
    console.log("generating next generation")
    let currentBoard = this.state.boardMatrix.slice()
    let newBoard = []
    let row = 0
    let length = this.state.totalRows
    let deadCell = this.state.deadCell
    let aliveCell = this.state.aliveCell

    currentBoard.map(function (thisRow) {
      //console.log(thisRow)

      let column = 0
      let newRow = []
      //console.log("currentBoard length is: " + currentBoard.length)
      //console.log("***********this row is " + row)
      thisRow.map(function (thisSquare) {
        //console.log("analyzing square")
        let square = thisSquare
        let neighbors = []
        //console.log("row: " + row)
        //console.log("column: " + column)
        for (var i = row - 1; i < row + 2; i++) {
          //console.log("i: " + i, "row: " + row)
          for (var j = column - 1; j < column + 2; j++) {
            //console.log("i: " + i, "j: " + j)
            if (i !== row || j !== column) {
              if (i < currentBoard.length) {
                i > -1 && j > -1 ? neighbors.push(currentBoard[i][j]) : neighbors.push("OOB")
              }
              //row === 7 && column === 0 ? console.log(column, neighbors) : null
            }

          }
        }
        let count = 0
        //row===7 && column===0 ? console.log(neighbors) : null
        neighbors.map(function (thisNeighbor) {
          if (thisNeighbor === aliveCell) {count++}
        })
        if (square === aliveCell) {
          //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
          if (count < 2) {square = deadCell}
          //Any live cell with two or three live neighbours lives on to the next generation.
          if (count !== 2 && count !== 3) {square = deadCell}
          //Any live cell with more than three live neighbours dies, as if by overpopulation.
          if (count > 3) {square = deadCell}
        } else {
          //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
          if (count === 3) {square = aliveCell}
        }
        newRow.push(square)
        column++
        //console.log("now column is: " + column)
      })

      newBoard.push(newRow)
      //console.log(newBoard[row], row)

      row++
      //console.log("next row is: " + row)
      if (row === currentBoard.length) {
        self.setState({ boardMatrix: newBoard })
      }
    })
    //console.log("resetting state")
    //self.setState({boardMatrix: newBoard})
  }

  runGame(event) {
    let self = this
    let generation = this.state.generation
    console.log("running game!")
    var game = window.setInterval(function () {
      self.generateNextGeneration()
    }, this.state.speed)
    this.setState({ intervalId: game })
  }

  clearBoard(event) {
    console.log("clearing board")
    let length = this.state.totalRows
    let width = this.state.totalColumns
    console.log(length, width)
    this.setState({
      boardMatrix: this.makeBoard(length, width),
      generation: 0
    })
    console.log(length, width)
    window.clearInterval(this.state.intervalId)
  }

  pauseBoard(event) {
    console.log("paused board")
    //this.setState({boardMatrix: grid})
    window.clearInterval(this.state.intervalId)
  }

  render() {

    console.log("rendering")
    const self = this // cannot simply access this.state.whatevervarsneeded
    var row = -1

    return (


      <div className="container">
        <h2 className="text-center">Conway's Game of Life</h2>
        <div className="row control-buttons" id="">
          <button onClick={() => { self.runGame() }} className="btn col">Start</button>
          <button onClick={() => { self.pauseBoard() }} className="btn col">Pause</button>
          <button onClick={() => { self.clearBoard() }} className="btn col">Clear</button>
        </div>


        <div className="text-center grid-holder">
          {this.state.boardMatrix.map(function (thisRow) {
            row++
            var column = 0
            //console.log(row, column)
            return (

              <div className="" key={row}>
                {thisRow.map(function () {
                  //console.log(thisRow[column])
                  let color = thisRow[column]
                  //let buttonId = "#row" + row + "col" + column
                  let currentRow = row
                  let currentColumn = column
                  //console.log(buttonId)
                  column++
                  return (
                    <button key={column} onClick={() => { self.handleButtonClick(currentRow, currentColumn) }} className="btn btn-sm gamebutton" /*id={buttonId}*/ style={{ "backgroundColor": color }} ></button>
                  )
                })}
              </div>
            )

          })}
        </div>

        <div className="generation-info text-center row">

          <div className="col-4 board-info">
            <i className="fa fa-code-fork"></i>
            <p className="" id="">{this.state.generation}</p>
          </div>
          <div className="col-4 board-info">
            <i className="fa fa-clock-o"></i>
            <p className="" id="">{this.state.speed} ms</p>
          </div>
        </div>

        <div className="row modifier-buttons" id="">

          <button onClick={() => { self.changeSize(0) }} className="col">
            <i className="fa fa-compress"></i>
          </button>
          <button onClick={() => { self.changeSize(1) }} className="col">
            <i className="fa fa-expand"></i>
          </button>
        </div>


        <div className="row modifier-buttons">

          <button onClick={() => { self.changeSpeed(0) }} className="col">
            <i className="fa fa-walking"></i>
          </button>
          <button onClick={() => { self.changeSpeed(1) }} className="col">
            <i className="fa fa-running"></i>
          </button>
        </div>


      </div>
    )
  }
}

export default App;
