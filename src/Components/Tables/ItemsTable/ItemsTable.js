import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import { User, GetSellers } from '../../../api';

const { Column, ColumnGroup } = Table;
const myUser = new User();

const UserTable = ({ token }) => {
  const [tableData, setTableData] = useState([]);
  const { data, fetchData } = GetSellers(token);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const updateTableData = (_id, active) => {
    const updatedData = tableData.map((user) => (user._id === _id ? { ...user, active } : user));
    setTableData(updatedData);
  };

  const toggleUserStatus = async (_id, currentActiveState) => {
    try {
      if (currentActiveState) {
        await myUser.deactivateUser(token, _id);
        updateTableData(_id, false);
      } else {
        await myUser.activateUser(token, _id);
        updateTableData(_id, true);
      }
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
    }
  };

  return (
    <Table dataSource={tableData} pagination={{ pageSize: 5 }}>
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
            {record.active ? (
              <a onClick={() => toggleUserStatus(record._id, true)}>deactivate</a>
            ) : (
              <a onClick={() => toggleUserStatus(record._id, false)}>activate</a>
            )}
          </Space>
        )}
      />
    </Table>
  );
};

export default UserTable;
