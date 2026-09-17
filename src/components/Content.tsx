import { useMemo, useRef, useState, type Key } from "react";
import { Tree, type TreeProps } from "antd";
import { moveBlock, toTreeData } from "../lib/blockTree";
import { INITIAL_BLOCKS } from "./content.constants";
import NodeTitle from "./NodeTitle";

const Content = () => {
  const activeMenuRef = useRef<((open: boolean) => void) | null>(null);

  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);
  const treeData = useMemo(() => toTreeData(blocks), [blocks]);
  const topLevelIds = useMemo(
    () => new Set(blocks.map((block) => block.id)),
    [blocks],
  );

  const allowDrop: TreeProps["allowDrop"] = ({
    dragNode,
    dropNode,
    dropPosition,
  }) => {
    if (!topLevelIds.has(String(dragNode.key))) return true;
    return dropPosition !== 0 && topLevelIds.has(String(dropNode.key));
  };

  const handleDrop: TreeProps["onDrop"] = (info) => {
    const positions = info.node.pos.split("-");
    const offset = info.dropPosition - Number(positions.at(-1) ?? 0);
    const mode = !info.dropToGap ? "inside" : offset < 0 ? "before" : "after";

    setBlocks((previous) =>
      moveBlock(
        previous,
        String(info.dragNode.key),
        String(info.node.key),
        mode,
      ),
    );
  };

  const handleCheck: TreeProps["onCheck"] = (keys) => {
    setCheckedKeys(Array.isArray(keys) ? keys : keys.checked);
  };

  return (
    <Tree
      blockNode
      checkable
      draggable
      treeData={treeData}
      checkedKeys={checkedKeys}
      onCheck={handleCheck}
      titleRender={(node) => (
        <NodeTitle node={node} activeMenuRef={activeMenuRef} />
      )}
      allowDrop={allowDrop}
      onDrop={handleDrop}
    />
  );
};

export default Content;
