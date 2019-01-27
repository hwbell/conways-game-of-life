
import React, { Component } from 'react';
import '../App.css';

const mainColor = '#48C9B0'

class Introduction extends Component {
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


      <div className="container" style={styles.container}>
        <h2 className="text-center" style={styles.title}>{text.title}</h2>
        <h4 className="text-center" style={styles.subtitle}>{text.subtitle}</h4>
        <p className="" style={styles.description}>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Origins">The Game of Life</a>
          , also known simply as Life, is a cellular automaton devised by the British mathematician John 
          Horton Conway in 1970. The game is a zero-player game, meaning that its evolution is determined 
          by its initial state, requiring no further input. One interacts with the Game of Life by 
          creating an initial configuration and observing how it evolves, or, for advanced players, 
          by creating patterns with particular properties
        </p>
        <p className="" style={styles.source}>
           {text.source}
        </p>

        <button className="btn col" style={styles.button} onClick={this.props.handleClick}>Explore the possibilities</button>
      </div>
    )
  }
}

const text = {
  title: "Conway's Game of Life",
  subtitle: 'simple math creates cellular automation ',
  description: 'The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.',
  source: '-Wikipedia',
}

const styles = {
  container: {
    width: '100%',
    margin: 'auto auto'
  },
  title: {
    margin: '40px 20px'
  },
  subtitle: {
    margin: '40px 20px'
  },
  description: {
    margin: '20px 20px',
    
  },
  source: {
    marginLeft: '40px',
  }, 
  button: {
    
  }
}

export default Introduction;
