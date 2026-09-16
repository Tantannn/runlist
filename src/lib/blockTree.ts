import type { DataNode } from 'antd/es/tree'
import type { Block } from '../components/blocks'

export type DropMode = 'before' | 'after' | 'inside'

/** Only nodes below the top level get a checkbox. */
export function toTreeData(blocks: Block[], depth = 0): DataNode[] {
  return blocks.map((block) => ({
    key: block.id,
    title: block.children?.length
      ? `${block.name} (${block.children.length})`
      : block.name,
    checkable: depth > 0,
    children: block.children && toTreeData(block.children, depth + 1),
  }))
}

function removeBlock(
  blocks: Block[],
  id: string,
): { next: Block[]; removed: Block | null } {
  let removed: Block | null = null
  const next: Block[] = []

  for (const block of blocks) {
    if (block.id === id) {
      removed = block
      continue
    }
    if (block.children) {
      const inner = removeBlock(block.children, id)
      if (inner.removed) {
        removed = inner.removed
        next.push({ ...block, children: inner.next })
        continue
      }
    }
    next.push(block)
  }

  return { next, removed }
}

function insertBlock(
  blocks: Block[],
  targetId: string,
  block: Block,
  mode: DropMode,
): Block[] {
  return blocks.flatMap((current) => {
    if (current.id === targetId) {
      if (mode === 'before') return [block, current]
      if (mode === 'after') return [current, block]
      return [{ ...current, children: [...(current.children ?? []), block] }]
    }
    return [
      current.children
        ? { ...current, children: insertBlock(current.children, targetId, block, mode) }
        : current,
    ]
  })
}

/** Returns the original array unchanged when the drag id is not found. */
export function moveBlock(
  blocks: Block[],
  dragId: string,
  dropId: string,
  mode: DropMode,
): Block[] {
  const { next, removed } = removeBlock(blocks, dragId)
  if (!removed) return blocks
  return insertBlock(next, dropId, removed, mode)
}
