import {
  DragSortTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { message, Table } from "antd";
import { useRef, useState, type Key } from "react";

interface Row {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ProColumns<Row>[] = [
  {
    title: "排序",
    dataIndex: "sort",
    editable: false,
    width: 60,
  },
  Table.SELECTION_COLUMN,
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "Icon",
    editable: false,
  },
  {
    title: "",
    valueType: "option",
    width: 1,
    className: "p-0!",
    render: () => null,
  },
];

const data: Row[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  { key: "3", name: "Joe Black", age: 32, address: "Sidney No. 1 Lake Park" },
];

const RunTable = () => {
  const [dataSource, setDataSource] = useState(data);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [editableKeys, setEditableKeys] = useState<Key[]>([]);

  const actionRef = useRef<ActionType>(null);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const getRowClassName = (record: Row) =>
    selectedRowKeys.includes(record.key) ? "checked-gray-row" : "";

  const handleDragSortEnd = (
    _beforeIndex: number,
    _afterIndex: number,
    newDataSource: Row[],
  ) => {
    setDataSource(newDataSource);
    message.success("修改列表排序成功");
  };

  return (
    <DragSortTable<Row>
      actionRef={actionRef}
      columns={columns}
      rowKey="key"
      headerTitle={false}
      search={false}
      options={false}
      pagination={false}
      dataSource={dataSource}
      showHeader={false}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd}
      rowSelection={rowSelection}
      rowClassName={getRowClassName}
      onRow={(record) => ({
        onDoubleClick: () => {
          setEditableKeys([record.key]);
        },
        onKeyDown: (event) => {
          if (!editableKeys.includes(record.key)) return;
          if (event.key === "Enter") {
            event.preventDefault();
            void actionRef.current?.saveEditable(record.key);
          }
          if (event.key === "Escape") {
            event.preventDefault();
            void actionRef.current?.cancelEditable(record.key);
          }
        },
      })}
      // expandable={}
      editable={{
        type: "single",
        editableKeys,
        onChange: setEditableKeys,
        onSave: async (key, row) => {
          setDataSource((current) =>
            current.map((item) =>
              item.key === key ? { ...item, ...row } : item,
            ),
          );
        },
        actionRender: (_row, _config, defaultDoms) => [
          <span key="save" className="hidden">
            {defaultDoms.save}
          </span>,
        ],
      }}
    />
  );
};

export default RunTable;
