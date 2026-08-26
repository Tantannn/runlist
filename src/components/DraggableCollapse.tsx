import { HolderOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/react/sortable'
import { Card } from 'antd'
import { BLOCK_GROUP, panelGroup, type Panel } from './blocks'
import RunTable from './RunTable'
import SortablePanel from './SortablePanel'

interface DraggableCollapseProps {
  id: string
  index: number
  label: string
  panels: Panel[]
}

const DraggableCollapse = ({ id, index, label, panels }: DraggableCollapseProps) => {
  const { ref, handleRef, isDragging } = useSortable({
    id,
    index,
    group: BLOCK_GROUP,
    type: 'block',
    accept: ['block'],
  })

  return (
    <div ref={ref} className="mb-3" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card
        size="small"
        title={
          <span className="flex items-center gap-2">
            <span ref={handleRef} className="cursor-grab">
              <HolderOutlined />
            </span>
            {label}
          </span>
        }
      >
        {panels.map((panel, panelIndex) => (
          <SortablePanel
            key={panel.id}
            id={panel.id}
            index={panelIndex}
            group={panelGroup(id)}
            label={panel.label}
          >
            {panel.kind === 'table' ? <RunTable /> : <p>{panel.text}</p>}
          </SortablePanel>
        ))}
      </Card>
    </div>
  )
}

export default DraggableCollapse
