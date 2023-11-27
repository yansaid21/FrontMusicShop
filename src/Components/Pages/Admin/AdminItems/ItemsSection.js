import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Popconfirm, Table } from "antd";
import { Item, GetItems } from "../../../../api";
import { styled } from '@mui/material/styles';
import { EyeOutlined, EyeInvisibleOutlined,CloudUploadOutlined } from "@ant-design/icons";
import MusicLogo from "../../../../assets/svg/music-play-svgrepo-com.svg"
import { Button } from "@mui/material";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const myItem= new Item();
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (

    <Form form={form} component={false} >
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
      console.log("record id en save",record._id);
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
  const { itemsdata, fetchItemsData } = GetItems();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {   
      fetchItemsData();
  }, [dataSource]);

  useEffect(() => {
    setDataSource(itemsdata);
  }, [itemsdata]);
 /* console.log("datasource",dataSource); */
  const [file, setFile] = useState(null);

const handleFileChange = (e) => {
    const fileList = e.target.files;
    if (fileList.length > 0) {
        const selectedFile = fileList[0];
        setFile(selectedFile);
        console.log("soy selected",selectedFile);

      // Puedes agregar más lógica aquí, como mostrar la vista previa de la imagen si es necesario
    }
  };
  /* const updatePhoto = () */
const updateTableData = (_id, Active) => {
    const updatedData = dataSource.map((item) => (item._id === _id ? { ...item, Active } : item));
    setDataSource(updatedData);
  };
  const updateShowTableData = (_id, Showcase) => {
    const updatedData = dataSource.map((item) => (item._id === _id ? { ...item, Showcase } : item));
    setDataSource(updatedData);
  };
  
  const toggleModifyItem =async (data, token, _id)=>{
    console.log("im here to modify the world");
    await myItem.modifyItem(data,token,_id)
  }

  const toggleNewItem = async (data, token )=>{
    console.log("im here to create a new item");
    await myItem.NewItem(data,token)
  }

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
    try {
      if (currentActiveState) {
        await myItem.NotShowItem(token, _id);
        updateShowTableData(_id, false);
      } else {
        await myItem.ShowItem(token, _id);
        updateShowTableData(_id, true);
      }
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  };

  const defaultColumns = [
    {
        title: "Photo",
        dataIndex: "Photo",
        render: (_, record) => dataSource.length >= 1 ?(
            record.Photo?(
                <Button component="label" variant="contained" style={{backgroundColor: 'transparent'}} startIcon={<img src={`data:image/png;base64,${record.Photo}`} alt={record.Title} style={{ maxWidth: "100px", maxHeight: "100px" }} />}>
                <VisuallyHiddenInput type="file" name="itemFile" onChange={handleFileChange}/>
                </Button>
          
                
        ):<Button component="label" variant="contained" startIcon={<CloudUploadOutlined />}>
        Upload file
        <VisuallyHiddenInput type="file" name="itemFile" onChange={handleFileChange}/>
      </Button>):<img src={MusicLogo} alt="default image"/>,
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
            <a onClick={()=> toggleItemShowCase(record._id,true)}>
              <EyeOutlined />
            </a>
          ) : (
            <a onClick={()=> toggleItemShowCase(record._id,false)}>
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
      Text: `i loose my pick number 20000`,
      Categorie: "accessory",
    };
    toggleNewItem(newData,token)
    if(toggleNewItem){
        setDataSource([...dataSource, newData]);
    }
  };
  const handleSave = (row) => {
    row.Photo=file
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row._id === item._id);
    const item = newData[index];
    console.log("valores dentro de row",row);
    console.log("valores dentro de item",item);
    console.log("item id",item._id);
    const formData = new FormData();
    formData.append('Price', row.Price);
    formData.append('Title', row.Title);
    formData.append('Text', row.Text);
    formData.append('Categorie', row.Categorie);
    formData.append('Active', row.Active);
    formData.append('Showcase', row.Showcase);
    
    // Agrega el archivo al FormData
    console.log("photo antes de ingresar: ",file);
    if(file){
        formData.append('Photo', file);
    }
    toggleModifyItem(formData,token,item._id)
    setFile(null)
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
        pagination={{ pageSize: 4 }}
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
