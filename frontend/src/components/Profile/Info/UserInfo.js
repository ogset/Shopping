import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Accordion } from 'react-bootstrap'
import { getProfile } from '../../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader'

const UserInfo = () => {
  const dispatch = useDispatch()
  const { userProfile, loading } = useSelector((state) => state.userList)
  const { name, email } = userProfile

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ListGroup.Item>
          <Row className="d-flex justify-content-between">
            <Col className="text-center">
              <i className="far fa-id-card fa-9x" />
            </Col>
            <Col className="my-auto">
              <Row className="pl-3">
                <b>Name</b>
              </Row>
              <Row className="mt-3 pl-3">
                <i>{name}</i>
              </Row>
            </Col>
            <Col className="my-auto">
              <Row className="pl-3">
                <b>Email</b>
              </Row>
              <Row className="mt-3 pl-3">
                <i>{email}</i>
              </Row>
            </Col>
            <Col className="my-auto text-right">
              <Accordion.Toggle as={Button} variant="light" eventKey="0">
                <i className="fas fa-pen mr-2" />
                Update Details{' '}
              </Accordion.Toggle>
              <Accordion.Toggle
                as={Button}
                variant="light"
                eventKey="1"
                className="mt-3"
              >
                <i className="fas fa-key mr-2" />
                Change Password
              </Accordion.Toggle>
            </Col>
          </Row>
        </ListGroup.Item>
      )}
    </>
  )
}

export default UserInfo
