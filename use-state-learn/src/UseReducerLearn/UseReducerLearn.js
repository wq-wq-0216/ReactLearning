import { useReducer } from "react"
import MessageReducer from "./MessageReducer"
import { initialState } from "./MessageReducer"
import ContactList from "./ContactList"
import Chat from "./Chat"

export default function UseReducerLearn() {
    const [state, dispatch] = useReducer(MessageReducer, initialState)
    const message = state.messages[state.selectedId]
    const contact = contacts.find((contact) => contact.id === state.selectedId)
    return (
        <div>
            <ContactList contacts={contacts} selectedId={state.selectedId} dispatch={dispatch} />
            <Chat contact={contact} message={message} dispatch={dispatch} />
        </div>
    )
}
const contacts = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' },
];

// 总结：
// 可以将组件的所有状态更新逻辑整合到一个外部函数中，这个函数叫作 reducer
// useReducer 钩子接受 2 个参数：一个 reducer 函数，一个初始的 state
// 它返回如下内容：一个有状态的值，一个 dispatch 函数（用来 “派发” 用户操作给 reducer）
// 如果你在修改某些组件状态时经常出现问题或者想给组件添加更多逻辑时，我们建议你还是使用 reducer。

// reducer 必须是纯粹的。 这一点和 状态更新函数 是相似的，reducer 是在渲染时运行的！（actions 会排队直到下一次渲染)。 这就意味着 reducer 必须纯净，即当输入相同时，输出也是相同的。它们不应该包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）。它们应该以不可变值的方式去更新 对象 和 数组。
// 每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。