import { HolderOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/react/sortable'
import { Collapse } from 'antd'
import type { ReactNode } from 'react'

interface SortablePanelProps {
  id: string
  index: number
  group: string
  label: ReactNode
  children: ReactNode
}

function SortablePanel({ id, index, group, label, children }: SortablePanelProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id,
    index,
    group,
    type: 'panel',
    accept: ['panel'],
  })

  return (
    <div ref={ref} className="mb-1" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Collapse
        items={[
          {
            key: id,
            label,
            children,
            extra: (
              <span
                ref={handleRef}
                className="cursor-grab px-1"
                onClick={(event) => event.stopPropagation()}
              >
                <HolderOutlined />
              </span>
            ),
          },
        ]}
      />
    </div>
  )
}

export default SortablePanel
