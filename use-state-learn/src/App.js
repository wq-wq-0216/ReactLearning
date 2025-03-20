import "./App.css";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>

      <button
        onClick={() => {
          setNumber(number + 5);
          alert(number);
        }}
      >
        +5
      </button>

      <button
        onClick={() => {
          setNumber(number + 10);
          setTimeout(() => alert(number), 3000);
        }}
      >
        +10
      </button>

      <h1>批处理 counter的使用</h1>
      <h2>{counter}</h2>
      <button
        onClick={() => {
          setCounter((c) => c + 1);
          setCounter((c) => c + 1);
          setCounter((c) => c + 1);
        }}
      >
        +3
      </button>

      <button
        onClick={() => {
          setCounter(counter + 5);
          setCounter((c) => c + 5);
          alert(counter);
        }}
      >
        +5
      </button>

      <button
        onClick={() => {
          setCounter(counter + 8);
          setCounter((c) => c + 8);
          setCounter(42);
          alert(counter);
        }}
      >
        +8
      </button>

      <button
        onClick={() => {
          setCounter((c) => c + 10);
          setTimeout(() => alert(counter), 3000);
        }}
      >
        +10
      </button>
    </>
  );
}

// 用意：
// 1. 按下 +3 按钮数字会变为3吗？不会，而是会变为1。为什么？
// 因为 尽管调用了三次 setNumber(number + 1)，但在 这次渲染的 事件处理函数中 number 会一直是 0，所以会三次将 state 设置成 1
// 2. 按下 +5 按钮，弹出的数字为6吗？不会，而是弹出1。为什么？
// 因为此时渲染的事件处理函数中 number 一直是 1，所以会弹出 0，但state下次渲染时则为6
// 3. 按下 +10 按钮，设置了3秒的定时器用来弹出number，但这时弹出的是16吗？不是，而是弹出6。为什么？
// 因为此时渲染的事件处理函数中 number 一直是 6，所以会弹出 6，但state下次渲染时则为16

// 为什么会这样？
// 因为：
// 1、在 React 中，state 的更新是异步的，所以在一个事件处理函数中，state 的值不会立即更新，而是在下一次渲染时才会更新
// 2、当你调用 useState 时，React 会为你提供该次渲染 的一张 state 快照。
// 3、变量和事件处理函数不会在重渲染中“存活”。每个渲染都有自己的事件处理函数。
// 4、每个渲染（以及其中的函数）始终“看到”的是 React 提供给这个 渲染的 state 快照。
// 5、过去创建的事件处理函数拥有的是创建它们的那次渲染中的 state 值。

// 那如果我想连续多次对同一 state 变量进行更新呢？
// 看一下counter的使用 利用批处理的方式

// 结果：第一个按钮点击后显示3；第二个按钮显示10，弹出0；第三个按钮显示42，弹出0；第四个按钮显示10，弹出0。
// 与上述的区别体现在：像 setNumber(n => n + 1) 这样传入一个根据队列中的前一个 state 计算下一个 state 的 函数，而不是像 setNumber(number + 1) 这样传入 下一个 state 值。
// 这是一种告诉 React “用 state 值做某事”而不是仅仅替换它的方法。

// 批处理：React 会将多个 state 更新合并成一个更新。
// 解释：
// 1、设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染。
// 2、React 会在事件处理函数执行完成之后处理 state 更新。这被称为批处理。
// 3、要在一个事件中多次更新某些 state，你可以使用 setNumber(n => n + 1) 更新函数。命名：一般以变量的首字母命名，如 n，c

// 详见：https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates
export default App;
