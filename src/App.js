import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// components
import ControlButtons from './components/ControlButtons';
import GameInfo from './components/GameInfo';
import Game from './components/Game';
import ModifierButtons from './components/ModifierButtons';
import Introduction from './components/Introduction';
import ReactCardFlip from 'react-card-flip';

const mainColor = '#48C9B0'

class App extends Component {
  constructor(props) {
    super(props)
    this.clearBoard = this.clearBoard.bind(this)
    this.pauseBoard = this.pauseBoard.bind(this)
    this.runGame = this.runGame.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isFlipped: false,
      intervalId: null,
      deadCell: "white",
      aliveCell: mainColor,
      size: 15,
      totalRows: 15,
      totalColumns: 15,
      boardMatrix: this.makeRandomBoard(15, 15),
      speed: 500,
      generation: 0
    }
  }

  componentDidMount() {
    console.log("mounted")
    this.runGame()
  }

  // this function is for the flipping of the main container
  // to the game itself - courtesy of react-card-flip
  handleClick() {
    //e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
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
      if (length > 15) { length = length - 5 }
      if (width > 15) { width = width - 5 }
    } else {
      if (length < 40) { length = length + 5 }
      if (width < 40) { width = width + 5 }
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
      if (speed < 2000) { speed = speed + 250 };
    } else {
      if (speed > 250) { speed = speed - 250 };
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
    //console.log("generating next generation")
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
          if (thisNeighbor === aliveCell) { count++ }
        })
        if (square === aliveCell) {
          //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
          if (count < 2) { square = deadCell }
          //Any live cell with two or three live neighbours lives on to the next generation.
          if (count !== 2 && count !== 3) { square = deadCell }
          //Any live cell with more than three live neighbours dies, as if by overpopulation.
          if (count > 3) { square = deadCell }
        } else {
          //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
          if (count === 3) { square = aliveCell }
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

    return (
      <ReactCardFlip isFlipped={this.state.isFlipped}>
        <div className="" key="front" >
          <Introduction handleClick={this.handleClick}/>
        </div>

        <div className="container" key="back">
          <h2 className="text-center">Conway's Game of Life</h2>

          <ControlButtons
            runGame={this.runGame}
            pauseBoard={this.pauseBoard}
            clearBoard={this.clearBoard}
            handleClick={this.handleClick}
          />

          <GameInfo
            generation={this.state.generation}
            speed={this.state.speed}
          />

          <Game
            boardMatrix={this.state.boardMatrix}
            handleButtonClick={this.handleButtonClick}
          />

          <div className="row modifier-buttons" id="">

            <button onClick={() => { this.changeSize(0) }} className="btn col">
              <i className="fa fa-compress"></i>
            </button>
            <button onClick={() => { this.changeSize(1) }} className="btn col">
              <i className="fa fa-expand"></i>
            </button>
          </div>


          <div className="row modifier-buttons">

            <button onClick={() => { this.changeSpeed(0) }} className="btn col">
              <i className="fa fa-walking"></i>
            </button>
            <button onClick={() => { this.changeSpeed(1) }} className="btn col">
              <i className="fa fa-running"></i>
            </button>
          </div>


        </div>
      </ReactCardFlip>
    )
  }
}

export default App;
