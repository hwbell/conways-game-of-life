
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
        <h5 className="text-center" style={styles.subtitle}>{text.subtitle}</h5>
        <p className="" style={styles.description}>
          {text.description}
        </p>

        <p className="" style={styles.description}>
          {text.patterns}
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns">
            here. </a>
        </p>

        <p className="" style={styles.description}>
          {text.footer}
        </p>

        <button className="btn btn-sm col" style={styles.button} onClick={this.props.handleClick}>Explore the possibilities</button>
      </div>
    )
  }
}

const text = {
  title: "Conway's Game of Life",
  subtitle: '~ simple math creates cellular automation ~ ',
  description: 'The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.',
  source: '-Wikipedia',
  patterns: ' Many different types of patterns occur in the Game of Life, which are classified according to their behaviour. Common pattern types include: still lifes, which do not change from one generation to the next; oscillators, which return to their initial state after a finite number of generations; and spaceships, which translate themselves across the grid. Read more ',
  footer: 'Try drawing some on the board yourself to see what happens!'
}

const styles = {
  container: {
    width: '100%',
    margin: 'auto auto'
  },
  title: {
    margin: 20,
    marginTop: 50
  },
  subtitle: {
    margin: '20px 20px'
  },
  description: {
    margin: '20px 20px',

  },
  source: {
    marginLeft: '40px',
  },
  
}

export default Introduction;
