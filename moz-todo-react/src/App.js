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
  // 任务列表
  const taskList = tasks?.map((task) => (
    <Todo
      name={task.name}
      id={task.id}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
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
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton name="all" />
        <FilterButton name="all1" />
        <FilterButton name="all3" />
      </div>
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
