import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Alert } from 'react-bootstrap'
import { getProductsFromUserCart } from '../slices/cartSlice'
import Items from '../components/Cart/Items'
import OrderSummary from '../components/Cart/OrderSummary'

const CartScreen = () => {
  const dispatch = useDispatch()
  const { cart, totalPrice } = useSelector((state) => state.cartList)
  const { userData } = useSelector((state) => state.userList)

  useEffect(() => {
    if (userData.token) {
      dispatch(getProductsFromUserCart())
    }
  }, [dispatch, userData])
  return (
    <>
      <Row>
        <Col md={12}>
          <h2>Your Cart</h2>
          <br />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          {cart.length === 0 ? (
            <Alert variant="info">Your cart is empty.</Alert>
          ) : (
            <Items cart={cart} />
          )}
        </Col>
        <Col md={4} className="my-auto">
          <OrderSummary cart={cart} totalPrice={totalPrice} />
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
