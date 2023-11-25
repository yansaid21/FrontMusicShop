import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { Item, GetItems } from "../../../../api";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";


const myItem= new Item();
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const ItemSection = ({ token }) => {
  /* const myItem= new Item(); */
  const { itemsdata, fetchItemsData } = GetItems(token);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (token) {
      fetchItemsData();
    }
  }, [token]);

  useEffect(() => {
    setDataSource(itemsdata);
  }, [itemsdata]);

  const [count, setCount] = useState(2);
  /* const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
};
setDataSource(newData); */
const updateTableData = (_id, Active) => {
    const updatedData = dataSource.map((item) => (item._id === _id ? { ...item, Active } : item));
    setDataSource(updatedData);
  };
  
  const toggleItemStatus = async (_id, currentActiveState) => {
    try {
      if (currentActiveState) {
        console.log("entro al if de true de itemStatus");
        await myItem.deactivateItem(token, _id);
        updateTableData(_id, false);
      } else {
        await myItem.activateItem(token, _id);
        updateTableData(_id, true);
      }
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  };

  const defaultColumns = [
    {
      title: "Price",
      dataIndex: "Price",
      editable: true,
    },
    {
      title: "Title",
      dataIndex: "Title",
      editable: true,
    },
    {
      title: "Text",
      dataIndex: "Text",
      width: "30%",
      editable: true,
    },
    {
      title: "Categorie",
      dataIndex: "Categorie",
      editable: true,
    },
    {
      title: "Active",
      dataIndex: "Active",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          record.Active === true ? (
            <a onClick={()=>toggleItemStatus(record._id,true)}>True</a>
          ) : (
            <a onClick={()=>toggleItemStatus(record._id,false)}>False</a>
          )
        ) : null,
    },
    {
      title: "Showcase",
      dataIndex: "Showcase",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          record.Showcase === true ? (
            <a>
              <EyeOutlined />
            </a>
          ) : (
            <a>
              <EyeInvisibleOutlined />
            </a>
          )
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      price: `Edward King ${count}`,
      title: "32",
      text: `London, Park Lane no. ${count}`,
      categorie: "32",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add item
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </div>
  );
};
export default ItemSection;
