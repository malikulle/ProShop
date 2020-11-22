import React, { useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUser } from "../actions/userActions";
import MySpinner from "../components/Spinner";
import { LinkContainer } from "react-router-bootstrap";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const { userList, userDelete } = useSelector((state) => ({
    userList: state.userList,
    userDelete: state.userDelete,
  }));

  const { loading, error, users } = userList;
  const { success } = userDelete;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure ? ")) {
      dispatch(deleteUser(id));
    }
  };

  if (loading) {
    return <MySpinner />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <Table striped bordered hover responsive className="btn-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className="fas fa-times"></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(user._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserListScreen;
