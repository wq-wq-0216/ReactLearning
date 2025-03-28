import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UpdateObjectState from "./UpdateObjectState"; //默认导出
import { UpdateObjectStateImmer } from "./UpdateObjectStateImmer"; //具名导出
import UpdateArrayState from "./UpdateArrayState";
import UpdateArrayStateImmer from "./UpdateArrayStateImmer";
import SetState from "./SetState";
import SaveState from "./SaveState";
import UseStateKey from "./UseStateKey";

import UseReducerLearn from "./UseReducerLearn/UseReducerLearn";

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
    {/* {<UpdateArrayStateImmer />} */}
    {/* 这个讲述如何合理选择设置state */}
    {/* {<SetState />} */}
    {/* 这个讲述state的保留和重置 */}
    {/* {<SaveState />} */}
    {/* 这个讲述如何使用key来重置state */}
    {/* {<UseStateKey />} */}
    {/* 这个用来讲述useReducer的使用 */}
    {<UseReducerLearn />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
