import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UpdateObjectState from "./UpdateObjectState"; //默认导出
import { UpdateObjectStateImmer } from "./UpdateObjectStateImmer"; //具名导出
import UpdateArrayState from "./UpdateArrayState";
import UpdateArrayStateImmer from "src/UpdateArrayStateImmer.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 第一个APP.js讲述state是快照 */}
    {/* <App /> */}
    {/* 这个讲述如何正确更新state中的对象 */}
    {/* {<UpdateState />} */}
    {/* 这个讲述如何使用Immer对state简洁地写更新逻辑 */}
    {/* {<UpdateObjectStateImmer />} */}
    {/* 这个讲述如何正确更新state中的数组 */}
    {/* {<UpdateArrayState />} */}
    {/* 这个讲述如何使用Immer正确更新state中的数组 */}
    {<UpdateArrayStateImmer />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
