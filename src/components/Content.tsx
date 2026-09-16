import { useMemo, useState, type Key } from 'react'
import { Tree, type TreeProps } from 'antd'
import { moveBlock, toTreeData } from '../lib/blockTree'
import { INITIAL_BLOCKS } from './content.constants'
import { Button } from 'antd/lib/radio'
import { PlusOutlined } from '@ant-design/icons'

const renderTitle: TreeProps['titleRender'] = (node) => {
  const count = node.children?.length ?? 0
  const isParent = count > 0

  return (
    <span className="group flex w-full items-center gap-1">
      <span className="truncate">{node.title as string}</span>

      {isParent && <span className="opacity-60">({count})</span>}

      <Button
        type="text"
        size="small"
        icon={<PlusOutlined />}
        aria-label={`Add under ${node.title as string}`}
        className={`opacity-0 group-hover:opacity-100 ${isParent ? '' : 'ml-auto'}`}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          // your handler, node.key is the block id
        }}
      />
    </span>
  )
}

const Content = () => {
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS)
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([])

  const treeData = useMemo(() => toTreeData(blocks), [blocks])
  const topLevelIds = useMemo(
    () => new Set(blocks.map((block) => block.id)),
    [blocks],
  )

  /** A top-level block stays top-level: never dropped into a node, only beside one. */
  const allowDrop: TreeProps['allowDrop'] = ({ dragNode, dropNode, dropPosition }) => {
    if (!topLevelIds.has(String(dragNode.key))) return true
    return dropPosition !== 0 && topLevelIds.has(String(dropNode.key))
  }

  const handleDrop: TreeProps['onDrop'] = (info) => {
    const positions = info.node.pos.split('-')
    const offset = info.dropPosition - Number(positions.at(-1) ?? 0)
    const mode = !info.dropToGap ? 'inside' : offset < 0 ? 'before' : 'after'

    setBlocks((previous) =>
      moveBlock(previous, String(info.dragNode.key), String(info.node.key), mode),
    )
  }

  const handleCheck: TreeProps['onCheck'] = (keys) => {
    setCheckedKeys(Array.isArray(keys) ? keys : keys.checked)
  }

  return (
    <Tree
      blockNode
      checkable
      draggable
      treeData={treeData}
      checkedKeys={checkedKeys}
      onCheck={handleCheck}
      titleRender={renderTitle}
      allowDrop={allowDrop}
      onDrop={handleDrop}
    />
  )
}

export default Content
