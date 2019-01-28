import React, { Component } from 'react';
import '../App.css';

const mainColor = '#48C9B0'

class App extends Component {
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
        <div className="row modifier-buttons" id="">

          <button onClick={() => { this.props.changeSize(0) }} className="btn col-3">
            <i className="fa fa-compress"></i>
          </button>
          <button onClick={() => { this.props.changeSize(1) }} className="btn col-3">
            <i className="fa fa-expand"></i>
          </button>

          <button onClick={() => { this.props.changeSpeed(0) }} className="btn col-3">
            <i className="fa fa-walking"></i>
          </button>
          <button onClick={() => { this.props.changeSpeed(1) }} className="btn col-3">
            <i className="fa fa-running"></i>
          </button>

        </div>
      </div>
    )
  }
}

export default App;
