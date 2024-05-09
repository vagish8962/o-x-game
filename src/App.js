import { useState } from 'react';
import './App.css';

const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const initialState = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialState);
  const [isXTurn, setIsXTurn] = useState(false);

  const calculateWinner = () => {
    for(let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if(board[a] && board[a]=== board[b] && board[b]=== board[c]) {
        return board[a];
      }
    }
    return null
  }

  const boxHandleClick = (i) => {
    const winner = calculateWinner();
    if(winner) return;
    setIsXTurn(!isXTurn);
    const cloneboard = [...board];
    cloneboard[i] = isXTurn ? 'X' : 'O';
    setBoard(cloneboard);
   
  }

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isXTurn ? "X" : "O"} turn`;
  };

  return (
    <div class="game">
      <h1>{getStatusMessage()}</h1>
        <div className='board'>
            {
              board.map((b, i) => <button className='box' onClick={() => boxHandleClick(i)} key={i}  disabled={b !== null}
              >{b}</button> )
            }
        </div>
    </div>
  );
}

export default App;
