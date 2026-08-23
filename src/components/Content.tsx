import { DragSortTable, type ActionType, type ProColumns } from '@ant-design/pro-components'
import { Collapse, message, Table } from 'antd'
import type { CollapseProps } from 'antd/lib'
import { useRef, useState, type Key } from 'react'

interface Row {
  key: string
  name: string
  age: number
  address: string
}

const columns: ProColumns<Row>[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    editable: false,
    width: 60,
  },
  Table.SELECTION_COLUMN,
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: 'Icon',
    editable: false,
  },
  /**
   * Mounting point for the editable-row actions, and the reason saving works
   * at all: columnRender.js:108 only calls `editableUtils.actionRender` for a
   * `valueType: 'option'` column in edit mode, and that call is what attaches
   * the ref `saveEditable` invokes. With no such column the ref stays null,
   * `saveEditable` no-ops silently, and `onSave` never runs.
   *
   * `render` covers read mode only — the edit-mode branch returns before it.
   */
  {
    title: '',
    valueType: 'option',
    width: 1,
    className: 'p-0!',
    render: () => null,
  },
]

const data: Row[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
]

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;



const Content = () => {
  const [dataSource, setDataSource] = useState(data)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [editableKeys, setEditableKeys] = useState<Key[]>([])

  /**
   * pro-components renders its editable-row save control as `<a onClick>`, not
   * `<button type="submit">`, so a form never gets an implicit-submit default
   * button and Enter has nothing to trigger. There is no built-in keyboard
   * handling either. `saveEditable` / `cancelEditable` off `actionRef` are the
   * programmatic equivalents — bind them ourselves.
   */
  const actionRef = useRef<ActionType>(null)

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  const getRowClassName = (record: Row) =>
    selectedRowKeys.includes(record.key) ? 'checked-gray-row' : ''

  const handleDragSortEnd = (
    _beforeIndex: number,
    _afterIndex: number,
    newDataSource: Row[],
  ) => {
    setDataSource(newDataSource)
    message.success('修改列表排序成功')
  }


  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <DragSortTable<Row>
        actionRef={actionRef}
        headerTitle="拖拽排序(默认把手)"
        columns={columns}
        rowKey="key"
        search={false}
        pagination={false}
        dataSource={dataSource}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd}
        rowSelection={rowSelection}
        rowClassName={getRowClassName}
        onRow={(record) => ({
          onDoubleClick: () => {
            setEditableKeys([record.key])
          },
          // Fires for keystrokes bubbling out of any editable cell in this row.
          onKeyDown: (event) => {
            if (!editableKeys.includes(record.key)) return
            if (event.key === 'Enter') {
              event.preventDefault()
              void actionRef.current?.saveEditable(record.key)
            }
            if (event.key === 'Escape') {
              event.preventDefault()
              void actionRef.current?.cancelEditable(record.key)
            }
          },
        })}
        editable={{
          type: 'single',
          editableKeys,
          onChange: setEditableKeys,
          onSave: async (key, row) => {
            setDataSource((current) =>
              current.map((item) => (item.key === key ? { ...item, ...row } : item)),
            )
          },
          actionRender: (_row, _config, defaultDoms) => [
            <span key="save" className="hidden">
              {defaultDoms.save}
            </span>,
          ],
        }}
      />,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ];

  return (
    <Collapse 
      defaultActiveKey={['1']}
      items={items}
    />

  )
}

export default Content
