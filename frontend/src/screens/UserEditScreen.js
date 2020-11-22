import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MySpinner from "../components/Spinner";
import { getSingleUser, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import {
  USER_SINGLE_RESET,
  USER_UPDATE_RESET,
} from "../constants/userConstants";
import alertify from "alertifyjs"

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const { userSingle, userUpdate } = useSelector((state) => ({
    userSingle: state.userSingle,
    userUpdate: state.userUpdate,
  }));

  const { error, loading, user } = userSingle;
  const { loading: loadingUpdate, success, error: errorUpdate } = userUpdate;
  useEffect(() => {
    if (user.name) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user.name, user.email, user.isAdmin]);

  useEffect(() => {
    dispatch({ type: USER_SINGLE_RESET });
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
    }
  }, [success, dispatch]);

  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");

  const submitHanlder = (e) => {
    e.preventDefault();
    dispatch(updateUser({ email, name, isAdmin, _id: userId }));
    alertify.success("User Updated Successfully")
  };
  if (loading) {
    return <MySpinner />;
  }
  return (
    <div>
      <Link to="/admin/userlist" className="btn btn-ligth my-3">
        Go Back
      </Link>
      <FormContainer>
        {error && (
          <Alert variant="danger">
            <p>{error}</p>
          </Alert>
        )}
        {errorUpdate && (
          <Alert variant="danger">
            <p>{errorUpdate}</p>
          </Alert>
        )}
        <h1>Edit User</h1>
        <Form onSubmit={submitHanlder}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              value={isAdmin}
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button type="submit" variant="primary" disabled={loadingUpdate}>
            {loadingUpdate ? <MySpinner /> : "Update"}
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
