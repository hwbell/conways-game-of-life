import React, { Component } from 'react';
import '../App.css';

const mainColor = '#48C9B0'

class ControlButtons extends Component {
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

    return (

      <div className="container">
        <hr />
        <div className="row control-buttons" id="">
          <button onClick={() => { this.props.runGame() }} className="btn col">
            <i className="fa fa-play"></i>
          </button>
          <button onClick={() => { this.props.pauseBoard() }} className="btn col">
            <i className="fa fa-pause"></i>
          </button>
          <button onClick={() => { this.props.clearBoard() }} className="btn col">
            <i className="fas fa-redo-alt"></i>
          </button>

          <button onClick={() => { this.props.restartGame() }} className="btn col">
            <i className="fas fa-dice"></i>
          </button>
          <button onClick={() => { this.props.handleClick() }} className="btn col">
            <i className="fa fa-question"></i>
          </button>

        </div>
        <hr />
      </div>
    )
  }
}

export default ControlButtons;
