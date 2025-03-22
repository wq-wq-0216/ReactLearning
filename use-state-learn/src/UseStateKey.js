import { useState } from "react";

const contacts = [
  { id: 0, name: "Taylor", email: "taylor@123.com" },
  { id: 1, name: "WQ", email: "wq@123.com" },
  { id: 2, name: "nina", email: "nina@123.com" },
];

function ContactList({ selectedContact, contacts, onSelect }) {
  return (
    <section>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button onClick={() => onSelect(contact)}>{contact.name}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Chat({ contact }) {
  const [text, setText] = useState("");
  return (
    <section className="chat">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <br />
      <button>transfer to {contact.email}</button>
    </section>
  );
}

export default function UseStateKey() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={(contact) => setTo(contact)}
      ></ContactList>
      <Chat key={to.id} contact={to}></Chat>
    </div>
  );
}
// 因为相同位置的相同组件是会保留state的，所以设置key
// 使用 key 重置表单
// 请记住 key 不是全局唯一的。它们只能指定 父组件内部 的顺序。
// 指定一个 key 能够让 React 将 key 本身而非它们在父组件中的顺序作为位置的一部分。

// 在真正的聊天应用中，你可能会想在用户再次选择前一个收件人时恢复输入 state。对于一个不可见的组件，有几种方法可以让它的 state “活下去”：
// 1.与其只渲染现在这一个聊天，你可以把 所有 聊天都渲染出来，但用 CSS 把其他聊天隐藏起来。这些聊天就不会从树中被移除了，所以它们的内部 state 会被保留下来。
// 这种解决方法对于简单 UI 非常有效。但如果要隐藏的树形结构很大且包含了大量的 DOM 节点，那么性能就会变得很差。
// 2.你可以进行 状态提升 并在父组件中保存每个收件人的草稿消息。这样即使子组件被移除了也无所谓，因为保留重要信息的是父组件。这是最常见的解决方法。
// 3.除了 React 的 state，你也可以使用其他数据源。例如，也许你希望即使用户不小心关闭页面也可以保存一份信息草稿。要实现这一点，你可以让 Chat 组件通过读取 localStorage 对其 state 进行初始化，并把草稿保存在那里。
// 无论采取哪种策略，与 Alice 的聊天在概念上都不同于 与 Bob 的聊天，因此根据当前收件人为 <Chat> 树指定一个 key 是合理的。
