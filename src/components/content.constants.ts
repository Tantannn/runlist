import type { Block } from './blocks'

export const INITIAL_BLOCKS: Block[] = [
  { id: '1', name: 'Unread' },
  { id: '2', name: 'Threads' },
  {
    id: '3',
    name: 'Chat Rooms',
    children: [
      { id: 'c1', name: 'General' },
      { id: 'c2', name: 'Random' },
      { id: 'c3', name: 'Open Source Projects' },
    ],
  },
  {
    id: '4',
    name: 'Direct Messages',
    children: [
      { id: 'd1', name: 'Alice' },
      {
        id: 'd2',
        name: 'Bob',
        children: [
          { id: 'd2-1', name: 'Alice' },
          { id: 'd2-2', name: 'Bob' },
          { id: 'd2-3', name: 'Charlie' },
        ],
      },
      { id: 'd4', name: 'Charlie' },
    ],
  },
]
