import React, { Component } from 'react';
import '../App.css';

const mainColor = '#48C9B0'

class Game extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      //
    }
  }

  componentDidMount() {
    // console.log("mounted")
  }

  render() {

    var row = -1;
    const self = this; // this is necessary for access inside of the map function below.
    
    return (
      
      <div className="text-center grid-holder">
          {this.props.boardMatrix.map(function (thisRow) {
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
                    <button key={column} onClick={() => { self.props.handleButtonClick(currentRow, currentColumn) }} className="gamebutton" /*id={buttonId}*/ style={{ "backgroundColor": color }} ></button>
                  )
                })}
              </div>
            )

          })}
        </div>
    )
  }
}

export default Game;
