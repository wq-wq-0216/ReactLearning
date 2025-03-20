import { useState } from "react";

const initialList = [
  { id: 0, title: "Big Bellies", seen: false },
  { id: 1, title: "Lunar Landscape", seen: false },
  { id: 2, title: "Terracotta Army", seen: true },
];

export default function UpdateArrayState() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(initialList);

  function handleToggleMyList(artworkId, nextSeen) {
    // 这样写有问题。
    // 两个不同的艺术品清单有着相同的初始 state。他们本应该互不影响，
    // 但是因为一次 mutation，他们的 state 被意外地共享了，勾选一个清单中的事项会影响另外一个清单
    // 虽然 myNextList 这个数组是新的，但是其内部的元素本身与原数组 myList 是相同的。
    // 因此，修改 artwork.seen，其实是在修改原始的 artwork 对象。而这个 artwork 对象也被 yourList 使用，这样就带来了 bug。
    // const myNextList = [...myList];
    // const artwork = myNextList.find((a) => a.id === artworkId);
    // artwork.seen = nextSeen;
    // setMyList(myNextList);

    // 使用 map 在没有 mutation 的前提下将一个旧的元素替换成更新的版本
    // 改为：
    setMyList(
      myList.map((artwork) => {
        if (artwork.id === artworkId) {
          return { ...artwork, seen: true };
        } else {
          return artwork;
        }
      })
    );
  }

  function handleToggleYourList(artworkId, nextSeen) {
    // const yourNextList = [...yourList];
    // const artwork = yourNextList.find((a) => a.id === artworkId);
    // artwork.seen = nextSeen;
    // setYourList(yourNextList);
    // 改为：
    setYourList(
      yourList.map((artwork) => {
        if (artwork.id === artworkId) {
          return { ...artwork, seen: true };
        } else {
          return artwork;
        }
      })
    );
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
