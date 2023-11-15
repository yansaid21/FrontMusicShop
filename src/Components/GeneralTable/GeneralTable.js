import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { User } from '../../api';
const { Column, ColumnGroup } = Table;
const myUser= new User()

const GeneralTable = ({data, token}) => {
  const [tableData, setTableData] = useState(data);
  useEffect(() => {
    // Actualizar el estado local cuando cambie el prop "data"
    setTableData(data);
  }, [data]);
  const updateTableData = (_id, active) => {
    // Actualizar el estado local según la lógica de tu aplicación
    const updatedData = tableData.map(user => (user._id === _id ? { ...user, active } : user));
    setTableData(updatedData);
  };
  const deactivateTheUser = async (token,_id) => {
    try {
      await myUser.deactivateUser(token,_id);
      updateTableData(_id, false);
      // Aquí podrías realizar alguna lógica adicional después de desactivar al usuario
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
    }
  };
  const activateTheUser = async (token,_id) => {
    try {
      await myUser.activateUser(token,_id);
      updateTableData(_id, true);
      // Aquí podrías realizar alguna lógica adicional después de desactivar al usuario
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
    }
  };
    return(

    <Table dataSource={data}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstname" key="firstname" />
      <Column title="Last Name" dataIndex="lastname" key="lastname" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="document" dataIndex="document" key="document" />
    </ColumnGroup>
    <ColumnGroup title="Location">
    <Column title="Age" dataIndex="municipio" key="municipio" />
    <Column title="Address" dataIndex="departamento" key="departamento" />
    </ColumnGroup>
    <Column title="role" dataIndex="role" key="role" />

    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          {record.active?(
            <a onClick={() => deactivateTheUser(token,record._id)}>deactivate</a>
          ):<a onClick={() => activateTheUser(token,record._id)}>activate</a>}
        </Space>
      )}
      />
  </Table>
      )
};
export default GeneralTable;