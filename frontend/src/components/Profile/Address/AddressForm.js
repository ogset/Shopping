import React, { useState } from 'react'
import { Form, Button, ListGroupItem, Row, Col, Spinner } from 'react-bootstrap'
import { updateUserAddresses } from '../../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const ProfileAddressForm = () => {
  const [title, setTitle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const { loading } = useSelector((state) => state.userList)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUserAddresses({
        opr: 'ADR',
        title,
        firstName,
        lastName,
        street,
        city,
        postalCode,
        country,
      })
    )
  }

  return (
    <Form onSubmit={submitHandler}>
      <ListGroupItem>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Add a Address Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Address Title"
                maxLength="10"
                onChange={(e) => setTitle(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="First Name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="street"
                placeholder="1234 Main St"
                required
                onChange={(e) => setStreet(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="city"
                required
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="zip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="zip"
                required
                placeholder="Zip Code"
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="country"
                required
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Col className="text-right">
          <Button type="submit" variant="outline-success">
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Add Address'
            )}
          </Button>
        </Col>
      </ListGroupItem>
    </Form>
  )
}

export default ProfileAddressForm
