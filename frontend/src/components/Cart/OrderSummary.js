import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button } from 'react-bootstrap'
import Loader from '../Loader'

const OrderSummary = ({ cart, totalPrice, shipping }) => {
  const { loading } = useSelector((state) => state.cartList)
  return (
    <ListGroup>
      <ListGroup.Item>
        <Button
          href={shipping ? (cart.length === 0 ? '/' : '/cart') : '/'}
          type="button"
          className="btn-block"
          variant={cart.length === 0 ? 'success' : 'outline-success'}
        >
          {`BACK TO ${
            shipping ? (cart.length === 0 ? 'SHOPPING' : 'CART') : 'SHOPPING'
          }`}
        </Button>
      </ListGroup.Item>
      {loading ? (
        <Loader />
      ) : (
        <>
          {cart.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={6} className="text-center my-auto">
                  {item.name}
                </Col>
                <Col md={2} className="text-center my-auto">
                  x {item.quantity}
                </Col>
                <Col
                  md={4}
                  className="text-center bg-light border rounded text-center my-auto"
                >
                  {(item.price * item.quantity).toFixed(2)}$
                </Col>
              </Row>
            </ListGroup.Item>
          ))}

          <ListGroup.Item className="text-center">
            {totalPrice === 0 ? (
              <i className="fas fa-shopping-bag fa-9x"></i>
            ) : (
              <h2>Total : {totalPrice}$ </h2>
            )}
          </ListGroup.Item>
        </>
      )}
      {cart.length > 0 && !shipping ? (
        <ListGroup.Item>
          <Button
            href={'/placeorder'}
            type="button"
            className="btn-block"
            variant={cart.length === 0 ? 'warning' : 'outline-info'}
          >
            {`${shipping ? 'ORDER SUMMARY' : 'CHECKOUT'}`}
          </Button>
        </ListGroup.Item>
      ) : (
        ''
      )}
    </ListGroup>
  )
}

export default OrderSummary
