import { useState } from "react";
import { type Block } from "./blocks";
import { Tree, type NodeRendererProps } from "react-arborist";

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
          { id: "d2-1", name: "Alice" },
          { id: "d2-2", name: "Bob" },
          { id: "d2-3", name: "Charlie" },
        ],
      },
      { id: "d4", name: "Charlie" },
    ],
  },
];

const Content = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleChecked = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const Node = ({ node, style, dragHandle }: NodeRendererProps<Block>) => {
    const isTopLevel = node.level === 0;

    return (
      <div style={style} ref={dragHandle}>
        {node.isInternal && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              node.toggle();
            }}
          >
            {node.isOpen ? "▾" : "▸"}
          </span>
        )}
        {!isTopLevel && (
          <input
            type="checkbox"
            checked={checked.has(node.id)}
            onChange={() => toggleChecked(node.id)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <span>{node.data.name}</span>
      </div>
    );
  };

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
      disableDrop={({ parentNode, dragNodes }) =>
        !parentNode.isRoot && dragNodes.some((n) => n.level === 0)
      }
    >
      {Node}
    </Tree>
  );
};

export default Content;
