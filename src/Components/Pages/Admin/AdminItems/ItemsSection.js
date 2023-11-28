import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Popconfirm, Table, Select } from "antd";
import { Item, GetItems } from "../../../../api";
import { styled } from "@mui/material/styles";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import MusicLogo from "../../../../assets/svg/music-play-svgrepo-com.svg";
import { Button } from "@mui/material";

const { Option } = Select;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const myItem = new Item();
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
      console.log("record id en save", record._id);
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
  const { itemsdata, fetchItemsData } = GetItems();
  const [dataSource, setDataSource] = useState([]);
  const [showCaseLimit, setShowCaseLimt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchItemsData();
  }, [dataSource]);

  useEffect(() => {
    setDataSource(itemsdata);
  }, [itemsdata]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredDataSource = selectedCategory
    ? dataSource.filter((item) => item.Categorie === selectedCategory)
    : dataSource;

  const handleFileChange = async (e, record) => {
    console.log("id del record en fileChange", record._id);
    const formData = new FormData();
    const fileList = e.target.files;
    if (fileList.length > 0) {
      const selectedFile = fileList[0];
      formData.append("Photo", selectedFile);

      await myItem.modifyPhoto(formData, token, record._id);
    }
  };

  const updateTableData = (_id, Active) => {
    const updatedData = dataSource.map((item) =>
      item._id === _id ? { ...item, Active } : item
    );
    setDataSource(updatedData);
  };

  const updateShowTableData = (_id, Showcase) => {
    const updatedData = dataSource.map((item) =>
      item._id === _id ? { ...item, Showcase } : item
    );
    setDataSource(updatedData);
  };

  const toggleModifyItem = async (data, token, _id) => {
    console.log("im here to modify the world");
    await myItem.modifyItem(data, token, _id);
  };

  const toggleNewItem = async (data, token) => {
    console.log("im here to create a new item");
    await myItem.NewItem(data, token);
  };

  const toggleItemStatus = async (_id, currentActiveState) => {
    try {
      if (currentActiveState) {
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

  const toggleItemShowCase = async (_id, currentActiveState) => {
    const activeShowcaseItemsCount = dataSource.filter(
      (item) => item.Showcase
    ).length;

    try {
      if (currentActiveState) {
        await myItem.NotShowItem(token, _id);
        updateShowTableData(_id, false);
      } else {
        if (activeShowcaseItemsCount < 6) {
          setShowCaseLimt(false);
          await myItem.ShowItem(token, _id);
          updateShowTableData(_id, true);
        } else {
          setShowCaseLimt(true);
        }
      }
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  };

  const defaultColumns = [
    {
      title: "Photo",
      dataIndex: "Photo",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          record.Photo ? (
            <Button
              component="label"
              variant="contained"
              style={{ backgroundColor: "transparent" }}
              startIcon={
                <img
                  src={`data:image/png;base64,${record.Photo}`}
                  alt={record.Title}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              }
            >
              <VisuallyHiddenInput
                type="file"
                name="itemFile"
                onChange={(e) => handleFileChange(e, record)}
              />
            </Button>
          ) : (
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadOutlined />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                name="itemFile"
                onChange={(e) => handleFileChange(e, record)}
              />
            </Button>
          )
        ) : (
          <img src={MusicLogo} alt="default image" />
        ),
    },
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
            <a onClick={() => toggleItemStatus(record._id, true)}>True</a>
          ) : (
            <a onClick={() => toggleItemStatus(record._id, false)}>False</a>
          )
        ) : null,
    },
    {
      title: "Showcase",
      dataIndex: "Showcase",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          record.Showcase === true ? (
            <a onClick={() => toggleItemShowCase(record._id, true)}>
              <EyeOutlined />
            </a>
          ) : showCaseLimit ? (
            <Popconfirm title="there is 6 items in the slider">
              <a onClick={() => toggleItemShowCase(record._id, false)}>
                <EyeInvisibleOutlined />
              </a>
            </Popconfirm>
          ) : (
            <a onClick={() => toggleItemShowCase(record._id, false)}>
              <EyeInvisibleOutlined />
            </a>
          )
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      Price: `10`,
      Title: "new string",
      Text: `i have lost my pick  20000th pick`,
      Categorie: "Accessory",
    };
    toggleNewItem(newData, token);
    if (toggleNewItem) {
      setDataSource([...dataSource, newData]);
    }
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row._id === item._id);
    const item = newData[index];
    const formData = new FormData();
    formData.append("Price", row.Price);
    formData.append("Title", row.Title);
    formData.append("Text", row.Text);
    formData.append("Categorie", row.Categorie);
    formData.append("Active", row.Active);
    formData.append("Showcase", row.Showcase);
    toggleModifyItem(formData, token, item._id);
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
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Filter by Category:</span>
        <Select
          style={{ width: 150 }}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <Option value={null}>All</Option>
          <Option value="Instrument">Instruments</Option>
          <Option value="Accessory">Accessories</Option>
        </Select>
      </div>

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
        pagination={{ pageSize: 4 }}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={filteredDataSource}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default ItemSection;
