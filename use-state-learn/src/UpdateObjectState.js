import { useState } from "react";

export default function UpdateObjectState() {
  //默认导出
  const [person, setPerson] = useState({
    firstName: "Barbara",
    lastName: "Hepworth",
    email: "bhepworth@sculpture.com",
  });

  function handleFirstNameChange(e) {
    // 修改输入框的内容无效
    // 这段代码直接修改了 上一次渲染中 分配给 person 的对象。
    // 但是因为并没有使用 state 的设置函数，React 并不知道对象已更改。所以 React 没有做出任何响应。
    // person.firstName = e.target.value;

    // 为了真正地 触发一次重新渲染，你需要创建一个新对象并把它传递给 state 的设置函数
    // 使用对象展开语法：本质为浅拷贝，只会复制一层，执行速度很快，但是也意味着想要更新一个嵌套属性时，必须得多次使用展开语法
    setPerson({ ...person, firstName: e.target.value });
  }

  function handleLastNameChange(e) {
    // person.lastName = e.target.value;
    setPerson({ ...person, lastName: e.target.value });
  }

  function handleEmailChange(e) {
    // person.email = e.target.value;
    setPerson({ ...person, email: e.target.value });
  }

  // 也可以使用一个事件处理函数
  // function handleChange(e) {
  //   setPerson({
  //     ...person,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  // 而如果person变为这样：
  //const [person, setPerson] = useState({
  //     name: 'Niki de Saint Phalle',
  //     artwork: {
  //       title: 'Blue Nana',
  //       city: 'Hamburg',
  //       image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  //     }
  //   });
  // 写更新逻辑就比较麻烦：例如：
  //   setPerson({
  //       ...person,
  //       artwork: {
  //           ...person,
  //           city:e.target.value
  //       }
  //   });

  // 所以 使用Immer编写简洁的更新逻辑
  return (
    <>
      <label>
        First name:
        <input value={person.firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last name:
        <input value={person.lastName} onChange={handleLastNameChange} />
      </label>
      <label>
        Email:
        <input value={person.email} onChange={handleEmailChange} />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email})
      </p>
    </>
  );
}
