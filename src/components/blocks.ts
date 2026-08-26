
export interface TextPanel {
  id: string
  label: string
  kind: 'text'
  text: string
}

export interface TablePanel {
  id: string
  label: string
  kind: 'table'
}

export type Panel = TextPanel | TablePanel

export interface Block {
  id: string
  label: string
  panels: Panel[]
}

export const BLOCK_GROUP = 'blocks'

const PANEL_GROUP_PREFIX = 'panels:'

export const panelGroup = (blockId: string) => `${PANEL_GROUP_PREFIX}${blockId}`

export const blockIdFromPanelGroup = (group: unknown): string | null =>
  typeof group === 'string' && group.startsWith(PANEL_GROUP_PREFIX)
    ? group.slice(PANEL_GROUP_PREFIX.length)
    : null

export function move<T>(list: T[], from: number, to: number): T[] {
  const next = [...list]
  const [moved] = next.splice(from, 1)
  if (moved === undefined) return list
  next.splice(to, 0, moved)
  return next
}
