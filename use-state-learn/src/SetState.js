export default function SetState() {
  let statuses = ["empty", "typing", "submitting", "success", "error"];

  return (
    <>
      {statuses.map((status) => (
        <section>
          <h4>Form ({status}):</h4>
          <Form status={status}></Form>
        </section>
      ))}
    </>
  );
}

function Form({ status }) {
  if (status === "success") {
    return <h1>That's right!</h1>;
  }
  return (
    <form>
      <textarea disabled={status === "submitting"}></textarea>
      <br />
      <button disabled={status === "submitting" || status === "empty"}>
        Submit
      </button>
      {/* 如果为真，则渲染后面的 */}
      {status === "error" && (
        <p className="Error">Good Guess but a wrong answer!</p>
      )}
    </form>
  );
}

// 总结：
// 如果两个 state 变量总是一起更新，请考虑将它们合并为一个。
// 仔细选择你的 state 变量，以避免创建“极难处理”的 state。
// 用一种减少出错更新的机会的方式来构建你的 state。
// 避免冗余和重复的 state，这样你就不需要保持同步。
// 除非你特别想防止更新，否则不要将 props 放入 state 中。
// 对于选择类型的 UI 模式，请在 state 中保存 ID 或索引而不是对象本身。
// 如果深度嵌套 state 更新很复杂，请尝试将其展开扁平化。
