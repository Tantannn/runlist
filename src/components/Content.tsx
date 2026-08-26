import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import { useState } from 'react'
import {
  BLOCK_GROUP,
  blockIdFromPanelGroup,
  move,
  type Block,
} from './blocks'
import DraggableCollapse from './DraggableCollapse'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const INITIAL_BLOCKS: Block[] = [
  {
    id: 'block-1',
    label: 'First Collapse',
    panels: [
      { id: 'p1-1', label: 'This is panel header 1', kind: 'table' },
      { id: 'p1-2', label: 'This is panel header 2', kind: 'text', text },
      { id: 'p1-3', label: 'This is panel header 3', kind: 'text', text },
    ],
  },
  {
    id: 'block-2',
    label: 'Second Collapse',
    panels: [
      { id: 'p2-1', label: 'Second panel header 1', kind: 'text', text },
      { id: 'p2-2', label: 'Second panel header 2', kind: 'text', text },
    ],
  },
]

const Content = () => {
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS)

  /**
   * One provider drives both nesting levels, so this handler dispatches on the
   * source's sortable group: BLOCK_GROUP reorders the block list, a panel group
   * reorders the panels of the block that group belongs to.
   */
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return

    const source = event.operation.source
    if (!isSortable(source)) return

    const { group, initialIndex, index } = source.sortable
    if (initialIndex === index) return

    if (group === BLOCK_GROUP) {
      setBlocks((prev) => move(prev, initialIndex, index))
      return
    }

    const blockId = blockIdFromPanelGroup(group)
    if (!blockId) return

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? { ...block, panels: move(block.panels, initialIndex, index) }
          : block,
      ),
    )
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {blocks.map((block, index) => (
        <DraggableCollapse
          key={block.id}
          id={block.id}
          index={index}
          label={block.label}
          panels={block.panels}
        />
      ))}
    </DragDropProvider>
  )
}

export default Content
