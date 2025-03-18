import { useState } from "react";
import "./App.css";
export default function Game() {
  // 状态提升：
  // 要从多个子组件收集数据，或让两个子组件相互通信，请改为在其父组件中声明共享 state。
  // 父组件可以通过 props 将该 state 传回给子组件。这使子组件彼此同步并与其父组件保持同步。
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // 跟踪用户当前正在查看的步骤
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  function handleClick(i) {
    // 避免重复落子 或 判断是否成功
    if (squares[i] || calculateWinner(squares)) return;
    // 创建 squares 数组的副本
    const nextSquares = squares.slice();
    // 交替落子
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // JavaScript 支持 闭包，这意味着内部函数（例如 handleClick）可以访问外部函数（例如 Board）中定义的变量和函数。
    // handleClick 函数可以读取 squares state 并调用 setSquares 方法，因为它们都是在 Board 函数内部定义的。
    onPlay(nextSquares);
  }
  // 用来判断是否有三个成一行或一列
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // 注意函数onSquareClick的传递方式：
  // 当你传递 onSquareClick={handleClick} 时，你将 handleClick 函数作为 props 向下传递。你不是在调用它！但是现在你立即调用了该函数——注意 handleClick(0) 中的括号——这就是它运行得太早的原因。你不想在用户点击之前调用 handleClick！
  // 你可以通过创建调用 handleClick(0) 的函数（如 handleFirstSquareClick）、调用 handleClick(1) 的函数（如 handleSecondSquareClick）等来修复。你可以将这些函数作为 onSquareClick={handleFirstSquareClick} 之类的 props 传递（而不是调用）。这将解决无限循环的问题。
  // 但是，定义九个不同的函数并为每个函数命名过于冗余。
  // 所以：新的 () => 语法。这里，() => handleClick(0) 是一个箭头函数，它是定义函数的一种较短的方式。
  // 单击方块时，=>“箭头”之后的代码将运行，调用 handleClick(0)
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        ></Square>
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        ></Square>
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        ></Square>
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        ></Square>
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        ></Square>
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        ></Square>
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        ></Square>
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
