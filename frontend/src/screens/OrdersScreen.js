import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders, reset } from '../slices/orderSlice'
import { Row, Col, Alert, ListGroup, Image, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const OrdersScreen = () => {
  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector((state) => state.orderList)
  useEffect(() => {
    dispatch(reset())
    dispatch(getUserOrders())
  }, [dispatch])
  return (
    <Row>
      <Col md={12}>
        <h2>Your Orders</h2>
        <br />
      </Col>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Col md={12}>
          {orders.length === 0 ? (
            <Alert variant="info">
              You don't have any orders yet.{' '}
              <Link to={`/`}>Start Shopping</Link>{' '}
            </Alert>
          ) : (
            orders.map((order) => (
              <Card className="mb-3" key={order._id}>
                <Card.Header className="d-flex justify-content-center text-center">
                  <Col>
                    <b>Time</b>
                    <br />
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Col>
                  <Col>
                    <b>Order Summary</b>
                    <br />
                    {order.orderItems.length} Product
                  </Col>
                  <Col>
                    <b>Person</b>
                    <br />
                    {order.deliveryAddress.firstName}{' '}
                    {order.deliveryAddress.lastName}
                  </Col>
                  <Col>
                    <b>Total Price</b>
                    <br />
                    {order.totalPrice} $
                  </Col>
                </Card.Header>
                <Card.Body>
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="d-flex justify-content-center text-center">
                        <Col className="my-auto">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            style={{ maxHeight: '50px' }}
                          />
                        </Col>
                        <Col className="my-auto">
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col className="my-auto">
                          {item.price}$ x {item.quantity}
                        </Col>
                        <Col className="my-auto">
                          {item.price * item.quantity}$
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </Card.Body>
                <Card.Footer className="d-flex justify-content-around text-center">
                  {order.billingAddress.street ===
                  order.deliveryAddress.street ? (
                    <small>
                      <i>
                        <span className="text-info mr-1">
                          Delivery {`&`} Billing Address :
                        </span>
                        {order.deliveryAddress.street} -{' '}
                        {order.deliveryAddress.postalCode} ,{' '}
                        {order.deliveryAddress.city} /{' '}
                        {order.deliveryAddress.country}
                      </i>
                    </small>
                  ) : (
                    <>
                      <small>
                        <i>
                          <span className="text-info mr-1">
                            Delivery Address :
                          </span>
                          {order.deliveryAddress.street} -{' '}
                          {order.deliveryAddress.postalCode} ,{' '}
                          {order.deliveryAddress.city} /{' '}
                          {order.deliveryAddress.country}
                        </i>
                      </small>
                      <small>
                        <i>
                          <span className="text-info mr-1">
                            Billing Address :
                          </span>
                          {order.billingAddress.street} -{' '}
                          {order.billingAddress.postalCode} ,{' '}
                          {order.billingAddress.city} /{' '}
                          {order.billingAddress.country}
                        </i>
                      </small>
                    </>
                  )}
                </Card.Footer>
              </Card>
            ))
          )}
        </Col>
      )}
    </Row>
  )
}

export default OrdersScreen
