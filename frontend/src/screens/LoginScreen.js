import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Container, Form, Button, Alert } from 'react-bootstrap'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { admission, clearError } from '../slices/userSlice'
import { updateUserCart } from '../slices/cartSlice'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const { error, loading, userData } = useSelector((state) => state.userList)
  const { cart } = useSelector((state) => state.cartList)

  useEffect(() => {
    if (userData.token) {
      dispatch(updateUserCart(cart))
      history.push('/')
    }
    dispatch(clearError())
  }, [history, userData, dispatch, cart])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(admission({ email, password }))
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <Loader />
          ) : (
            <>
              <p>
                <i>
                  Please enter your account details to log in to your user
                  account.
                </i>
              </p>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    minLength="6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
              <br />
              <i>
                New Customer ? <Link to={'/register'}>Register</Link>
              </i>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen
