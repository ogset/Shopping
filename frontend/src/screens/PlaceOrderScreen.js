import React, { useEffect } from 'react'
import { Row, Col, Accordion, Alert, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserAddressInfo from '../components/Profile/Address/UserAddressInfo'
import Addresses from '../components/Profile/Address/Addresses'
import AddressForm from '../components/Profile/Address/AddressForm'
import { getUserAddresses } from '../slices/userSlice'
import { placeOrder } from '../slices/orderSlice'
import OrderSummary from '../components/Cart/OrderSummary'
import Loader from '../components/Loader'
import { clearCart } from '../slices/cartSlice'
const PlaceOrderScreen = () => {
  const { cart, totalPrice } = useSelector((state) => state.cartList)
  const { loading, status, error } = useSelector((state) => state.orderList)
  const {
    userAddresses: { addresses },
  } = useSelector((state) => state.userList)
  console.log(addresses)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'success') {
      dispatch(clearCart())
    } else {
      dispatch(getUserAddresses())
    }
  }, [dispatch, status])

  return (
    <>
      {loading ? (
        <Loader />
      ) : status === 'success' ? (
        <>
          <Col className="d-flex justify-content-between">
            <Link className="btn btn-light my-3" to="/">
              Go Back
            </Link>
            <Link className="btn btn-light my-3" to="/profile/orders">
              Orders
            </Link>
          </Col>
          <Col
            md={12}
            className="d-flex justify-content-center"
            style={{ height: '40vh' }}
          >
            <i className="fas fa-check-square fa-9x text-success my-auto" />
          </Col>
          <Alert variant="info" className="my-auto text-center">
            Your order created successfully.{' '}
            <Link to="profile/orders">Check Your Orders </Link>
          </Alert>
        </>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Row>
            <Col md={12}>
              <h2>Order Details</h2>
              <p>
                <i>Select your address or add a new one.</i>
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <>
                {error ? (
                  <Alert>{error}</Alert>
                ) : (
                  <Accordion>
                    <UserAddressInfo addresses={addresses} shipping />
                    <Accordion.Collapse eventKey="0" className="mb-3">
                      <AddressForm />
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="1" className="mb-3">
                      <Addresses
                        addresses={addresses ? addresses : []}
                        shipping
                      />
                    </Accordion.Collapse>
                  </Accordion>
                )}
              </>
            </Col>
            <Col md={4} className="my-auto">
              <OrderSummary cart={cart} totalPrice={totalPrice} shipping />
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  variant="warning"
                  disabled={
                    cart.length === 0 || (addresses && addresses.length === 0)
                      ? true
                      : false
                  }
                  onClick={() => dispatch(placeOrder())}
                >
                  PLACE ORDER
                </Button>
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default PlaceOrderScreen
