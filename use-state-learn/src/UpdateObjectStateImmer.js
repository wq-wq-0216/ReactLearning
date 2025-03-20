import { useImmer } from "use-immer";
//具名导出
export function UpdateObjectStateImmer() {
  // 由 Immer 提供的 draft 是一种特殊类型的对象，被称为 Proxy，它会记录你用它所进行的操作。
  // 这就是你能够随心所欲地直接修改对象的原因所在！
  // 从原理上说，Immer 会弄清楚 draft 对象的哪些部分被改变了，并会依照你的修改创建出一个全新的对象。
  const [person, updatePerson] = useImmer({
    name: "wq",
    artwork: {
      title: "engineer",
      city: "beijing",
      salary: "500000",
    },
  });
  function handleNameChange(e) {
    updatePerson((draft) => {
      draft.name = e.target.value;
    });
  }
  function handleTitleChange(e) {
    updatePerson((draft) => {
      draft.artwork.title = e.target.value;
    });
  }
  function handleCityChange(e) {
    updatePerson((draft) => {
      draft.artwork.city = e.target.value;
    });
  }
  function handleSalaryChange(e) {
    updatePerson((draft) => {
      draft.artwork.salary = e.target.value;
    });
  }
  return (
    <>
      <label>
        Name:{person.name}
        <input value={person.name} onChange={handleNameChange}></input>
      </label>
      <label>
        Title:{person.title}
        <input value={person.title} onChange={handleTitleChange}></input>
      </label>
      <label>
        City:{person.city}
        <input value={person.city} onChange={handleCityChange}></input>
      </label>
      <label>
        Salary:{person.salary}
        <input value={person.salary} onChange={handleSalaryChange}></input>
      </label>
    </>
  );
}
