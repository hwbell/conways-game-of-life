import React, { Component } from 'react';
import '../App.css';

const mainColor = '#48C9B0'

class GameInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  componentDidMount() {
    console.log("mounted");
  }

  render() {

    return (

        <div className="text-center row generation-info">

          <div className="text-center col-6">
            <div className="row" >
              <i className="col-6 fas fa-code-branch" aria-hidden="true"></i>
              <p className="col-6" id="">{this.props.generation}</p>
            </div>
          </div>
          <div className="text-center col-6">
            <div className="row" >
              <i className="col-6 fa fa-clock"></i>
              <p className="col-6" id="">{this.props.speed} ms</p>
            </div>
          </div>

        </div>
    )
  }
}

// const styles = {
//   text: {
//     fontWeight: 'bolder !important'
//   }
// }

export default GameInfo;
