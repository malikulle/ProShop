import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MySpinner from "../components/Spinner";
import { LinkContainer } from "react-router-bootstrap";
import { getAllOrders } from "../actions/orderActions";
import Moment from "react-moment";
// import axios from "axios";
// import alertify from "alertifyjs";

const OrderListScreen = () => {
  const dispatch = useDispatch();

  const { orderList } = useSelector((state) => ({
    orderList: state.orderList,
  }));

  const { orders, loading } = orderList;

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (loading) {
    return <MySpinner />;
  }

  return (
    <div>
      <Table striped bordered hover responsive className="btn-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Date</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user.name}</td>
              <td>
                <Moment format="YYYY-MM-DD">{order.createdAt}</Moment>
              </td>
              <td>
                <Moment format="YYYY-MM-DD">{order.paidAt}</Moment>
              </td>
              <td>
                {order.isDelivered ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className="fas fa-times"></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant="light" className="btn-sm">
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderListScreen;
