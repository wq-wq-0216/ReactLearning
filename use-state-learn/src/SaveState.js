import { useState } from "react";
import "./SaveState.css";

export default function SaveState() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {/* {isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />} */}
      <Counter isFancy={isFancy} />
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => setIsFancy(e.target.checked)}
        ></input>
        使用好看的样式
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);
  let className = "counter";
  if (hover) {
    className += "hover";
  }
  if (isFancy) {
    className += "fancy";
  }
  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>加一</button>
    </div>
  );
}

// 从使用好看的样式到选择不使用好看的样式时，页面闪动是因为鼠标还在Enter div的情况

//当你勾选或清空复选框的时候，计数器 state 并没有被重置。
// 不管 isFancy 是 true 还是 false，根组件 App 返回的 div 的第一个子组件都是 <Counter />
// 它是位于相同位置的相同组件，所以对 React 来说，它是同一个计数器
// 所以：
// 1、只要一个组件还被渲染在 UI 树的相同位置，React 就会保留它的 state
// 2、如果它被移除，或者一个不同的组件被渲染在相同的位置，那么 React 就会丢掉它的 state。
// 即：相同位置的相同组件会使得 state 被保留下来
// 注意：（对 React 来说重要的是组件在 UI 树中的位置,而不是在 JSX 中的位置！）
// 并且，当你在相同位置渲染不同的组件时，组件的整个子树都会被重置
// 如果你想在重新渲染时保留 state，几次渲染中的树形结构就应该相互“匹配”
