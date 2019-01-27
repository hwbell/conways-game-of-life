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


      <div className="row control-buttons" id="">
        <button onClick={() => { this.props.runGame() }} className="btn col">Start</button>
        <button onClick={() => { this.props.pauseBoard() }} className="btn col">Pause</button>
        <button onClick={() => { this.props.clearBoard() }} className="btn col">Clear</button>
        <button onClick={() => { this.props.handleClick() }} className="btn col">Info</button>
      </div>
    )
  }
}

export default ControlButtons;
