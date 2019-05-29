import React from 'react';
import './App.css';
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzleNumbers: [1, 2, 3, 4, 5, 6, 7, ' ', 8],
      emptySquare: 7,
      isSolved: false
    }
    this.emptyPuzzleSquare = this.emptyPuzzleSquare.bind(this)
    this.moveSquare = this.moveSquare.bind(this)
    this.randomize = this.randomize.bind(this)
    this.isPuzzleSolved = this.isPuzzleSolved.bind(this)
  }
  moveSquare(event) {
      if (this.state.isSolved === false){
        const adjacentSquares = this.getAdjacentSquare(event.target.value)
      if (adjacentSquares.includes(this.state.emptySquare)) {
        let newPuzzle = this.state.puzzleNumbers
        newPuzzle[this.state.emptySquare] = this.state.puzzleNumbers[event.target.value]
        newPuzzle[event.target.value] = ''
        this.setState({
          puzzleNumbers: newPuzzle,
          emptySquare: event.target.value
        })
      }
      this.isPuzzleSolved()
    }
  };
  emptyPuzzleSquare() { //I wrote this but I don't thik I actually use it... I'll probably delete it.
    for (let i = 0; i < this.state.puzzleNumbers.length; i++) {
      if (this.state.puzzleNumbers[i] === '') {
        this.setState({
          emptySquare: this.state.puzzleNumbers.indexOf(this.state.puzzleNumbers[i])
        })
      }
    }
  }
  getAdjacentSquare (i) {
    let adjacentSquares = []
    if (i - 3 >= 0) {
      adjacentSquares.push(i-3)
    }
    if (i - 1 >= 0) {
      adjacentSquares.push(i-1)
    }
    if (i + 3 <= 8) {
      adjacentSquares.push(i+3)
    }
    if (i + 1 <= 8) {
      adjacentSquares.push(i+1)
    }
    return adjacentSquares
  }
  randomize() {
    let randomizedPuzzle = []
    let randomValue = 0
    while (randomizedPuzzle.length < 9){
      randomValue = Math.ceil(Math.random()*10)
      if (randomizedPuzzle.includes('') === false){
        if (randomValue === 9) {
          randomizedPuzzle.push('')
        }
      }
      if (randomizedPuzzle.includes(randomValue) === false && randomValue !== 9 && randomValue !== 10) {
        randomizedPuzzle.push(randomValue)
      }
    }
    this.setState({
      puzzleNumbers: randomizedPuzzle,
      emptySquare: randomizedPuzzle.indexOf(''),
      isSolved: false
    })
  }
  isPuzzleSolved() {
    if (this.state.puzzleNumbers.join('') === "12345678" && this.state.puzzleNumbers[8] === '') { // It's a lazy way to check the winning condition but hey, it works.
      this.setState({
        isSolved: true
      })
    }
  }
  componentWillMount() { // This guarantees the puzzle will be random the first time.
    this.randomize()
  }
  render() {
    const puzzleNumbers = this.state.puzzleNumbers.map(i => <li key={this.state.puzzleNumbers.indexOf(i).toString()} onClick={this.moveSquare} value={this.state.puzzleNumbers.indexOf(i)}> {i} </li>);
    return(
      <div className="Game">
          <div>
            <div className="Puzzle">
              {puzzleNumbers}
            </div>
            <button onClick={this.randomize}> Randomize </button>
            {this.state.isSolved ? <h2> You've won! </h2> : <span/>}
          </div>
      </div>
    )
  }
}
function App() {
  return (
    <div className="App">
      <div/>
        <Game/>
      <div/>
    </div>
  );
}

export default App;
