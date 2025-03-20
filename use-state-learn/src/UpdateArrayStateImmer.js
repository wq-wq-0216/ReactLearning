import { useState } from "react";
import { useImmer } from "use-immer";

const initialList = [
  { id: 0, title: "Big Bellies", seen: false },
  { id: 1, title: "Lunar Landscape", seen: false },
  { id: 2, title: "Terracotta Army", seen: true },
];

export default function UpdateArrayStateImmer() {
  const [myList, updateMyList] = useImmer(initialList);
  const [yourList, updateYourList] = useImmer(initialList);

  function handleToggleMyList(id, nextSeen) {
    updateMyList((draft) => {
      // 找到用户点击的那个list
      const artwork = draft.find((a) => a.id === id);
      // 当使用 Immer 时，类似 artwork.seen = nextSeen 这种会产生 mutation 的语法不会再有任何问题了
      // 因为并不是在直接修改原始的 state，而是在修改 Immer 提供的一个特殊的 draft 对象。
      // 同理，你也可以为 draft 的内容使用 push() 和 pop() 这些会直接修改原值的方法
      // 在幕后，Immer 总是会根据你对 draft 的修改来从头开始构建下一个 state。这使得你的事件处理程序非常的简洁，同时也不会直接修改 state
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList((draft) => {
      const artwork = draft.find((a) => a.id === artworkId);
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList artworks={myList} onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList artworks={yourList} onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={(e) => {
                onToggle(artwork.id, e.target.checked);
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}

// 总结：
// 可以把数组放入 state 中，但你不应该直接修改它。
// 不要直接修改数组，而是创建它的一份 新的 拷贝，然后使用新的数组来更新它的状态。
// 可以使用 [...arr, newItem] 这样的数组展开语法来向数组中添加元素。
// 可以使用 filter() slice()来删除元素。
// 使用map()来替代元素
// 先将数组复制一份，然后再使用sort(),reverse()来操作，再set(新数组)
// 可以使用 Immer 来保持代码简洁
