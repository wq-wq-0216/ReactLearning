import React from "react";
import { useRef, useState, useEffect } from "react";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  // 因为是严格模式 每个组件会渲染两次，有三个实例 所以会有六次日志输出
  console.log(editButtonRef.current);
  // 在组件渲染后执行
  useEffect(() => {
    console.log("side effect");
  });
  // main render 会比side effect 先打印出来
  console.log("main render");

  // 是一个自定义钩子，用于跨渲染周期跟踪值
  // 1.使用钩子创建一个空的 useRef()
  // 2.将ref.current的值返回给调用它的组件
  // 3.在每次渲染调用组件后调用并更新存储在ref.current中的值
  // 因为在调用中更新，所以它总是比组件主渲染周期中的任何值落后一步
  function usePrevious(value) {
    // 初始化为undefined
    const ref = useRef();
    // 初次渲染完，变为false 点击edit按钮之后，调用usePrevious时返回的值即为false，渲染完ref.current变为true
    useEffect(() => {
      ref.current = value;
    });
    // 取决于​调用usePrevious时ref.current的值
    return ref.current;
  }
  // 编辑按钮上一次的状态
  const wasEditing = usePrevious(isEditing);
  console.log("wasEditing", wasEditing);
  // 第二个参数数组将仅在其中一个值更改时运行。我们只希望在isEditing、wasEditing发生变化时更改焦点
  // 当用户点击编辑按钮后，页面会重新渲染，也会重新执行useEffect，每个Todo都有自己的isEditing
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  // 编辑、查看模板
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          ref={editFieldRef}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          ref={editButtonRef}
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  // 使用三元运算符来选择渲染 查看 还是 编辑 模板
  // 在查看模板中点击编辑，则isEditing就会变为true，然后重新渲染为编辑模板
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
