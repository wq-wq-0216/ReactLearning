/* eslint-disable jsx-a11y/no-redundant-roles */
import Todo from "./components/Todo";
import "./App.css";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  // 添加任务
  // tasks初始为index.js传递过来的
  const [tasks, setTasks] = useState(props.tasks);
  // form表单提交后，子组件触发事件传递name过来，再修改tasks的值，tasks发生变化后触发页面重新渲染
  function addTask(name) {
    // 制定唯一标识符
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
    console.log("tasks", tasks);
  }
  // 定义过滤器
  const [filter, setFilter] = useState("All");
  // 这是一个键值对Map，键为All Active Completed，值则为对应的函数
  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  //包含了 FILTER_MAP 的所有键（即 ["All", "Active", "Completed"]）
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  // 任务列表 有进行过滤 当点击别的之后，会触发setFilter改变filter的值，从而过滤器也会发生改变
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  // 标题文字
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  // 将复选框与浏览器中的状态统一
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    // 更新任务复选框状态
    setTasks(updatedTasks);
    console.log("tasks", taskList);
  }
  // 删除任务
  function deleteTask(id) {
    console.log("id", id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  // 编辑任务
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
