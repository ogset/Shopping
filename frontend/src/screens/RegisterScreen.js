import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { admission, clearError } from '../slices/userSlice'

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState(true)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const { error, loading, userData } = useSelector((state) => state.userList)

  useEffect(() => {
    if (userData.token) {
      history.push('/')
    } else {
      dispatch(clearError())
    }
  }, [dispatch, history, userData.token])

  const submitHandler = (e) => {
    e.prevent.default()
    dispatch(admission({ name, email, password }))
  }

  const passwordCheckHandler = (psw) => {
    setConfirmPassword(psw)
    if (psw.length === password.length) {
      if (psw !== password) {
        setMessage('Passwords do not match.')
        setPasswordCheck(true)
      } else {
        setMessage(null)
        setPasswordCheck(false)
      }
    } else {
      setPasswordCheck(true)
    }
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Sign Up</h1>
          {message && <Alert variant="danger">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <Loader />
          ) : (
            <>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    minLength="6"
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    minLength="6"
                    onChange={(e) => passwordCheckHandler(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button
                  type="submit"
                  variant={passwordCheck ? 'danger' : 'success'}
                  disabled={passwordCheck}
                >
                  Register
                </Button>
              </Form>

              <Row className="py-3">
                <Col>
                  Have an Account ? <Link to={'/login'}>Login</Link>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterScreen
