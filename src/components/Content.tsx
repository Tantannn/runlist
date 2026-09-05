import { type Block } from "./blocks";
import { Tree } from "react-arborist";


const INITIAL_BLOCKS: Block[] = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      {
        id: "d2",
        name: "Bob",
        children: [
          { id: "d1", name: "Alice" },
          { id: "d2", name: "Bob" },
          { id: "d3", name: "Charlie" },
        ],
      },
      { id: "d3", name: "Charlie" },
    ],
  },
];
const Content = () => {
  return (
    <Tree
      initialData={INITIAL_BLOCKS}
      openByDefault={false}
      width={600}
      height={1000}
      indent={24}
      rowHeight={36}
      overscanCount={1}
      paddingTop={30}
      paddingBottom={10}
      padding={25 /* sets both */}
    />
  );
};

export default Content;
