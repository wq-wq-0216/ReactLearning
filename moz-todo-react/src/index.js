import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
  // 严格模式的行为是：
  // 在组件挂载时，React 会渲染组件一次，然后立即卸载它，再重新挂载一次。
  // 因此，每个组件实例会渲染两次。
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
