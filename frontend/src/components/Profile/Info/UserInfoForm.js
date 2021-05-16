import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  ListGroupItem,
  Row,
  Col,
  Spinner,
  Alert,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearError,
  resetStatus,
  updateUserProfile,
} from '../../../slices/userSlice'

const UserInfoForm = ({ profile }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState(true)
  const [message, setMessage] = useState(null)
  const [result, setResult] = useState(false)
  const [errorResult, setErrorResult] = useState(false)
  const dispatch = useDispatch()
  const { loading, status, error } = useSelector((state) => state.userList)

  useEffect(() => {
    statusCheck()
  })

  const statusCheck = () => {
    if (status === 'success') {
      dispatch(resetStatus())
      setResult(true)
      setMessage('Successfully Updated!')
      setTimeout(() => {
        setResult(false)
        setMessage(null)
      }, 2000)
    } else if (error) {
      dispatch(clearError())
      setErrorResult(true)
      setMessage(error)
      setTimeout(() => {
        setErrorResult(false)
        setMessage(null)
      }, 2000)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUserProfile({
        name,
        email,
        currentPassword,
        password,
        opr: profile ? 'INF' : 'PSW',
      })
    )
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
    <Form onSubmit={submitHandler}>
      {profile ? (
        <ListGroupItem>
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Col className="text-right">
            <Button
              type="submit"
              variant={
                name.length === 0 || email.length === 0
                  ? 'danger'
                  : 'outline-success'
              }
              disabled={name.length === 0 || email.length === 0}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Update'
              )}
            </Button>
          </Col>
        </ListGroupItem>
      ) : (
        <ListGroupItem>
          <Row>
            <Col>
              <Form.Group controlId="currentPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={currentPassword}
                  required
                  onChange={(e) => setCurrentPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="password">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  minLength="6"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  minLength="6"
                  value={confirmPassword}
                  onChange={(e) => passwordCheckHandler(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Col className="text-right">
            <Button
              type="submit"
              variant={passwordCheck ? 'danger' : 'outline-success'}
              disabled={passwordCheck}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Update'
              )}
            </Button>
          </Col>
        </ListGroupItem>
      )}
      {(result || errorResult) && (
        <Alert variant={errorResult ? 'danger' : 'success'} transition>
          {message}
        </Alert>
      )}
    </Form>
  )
}

export default UserInfoForm
