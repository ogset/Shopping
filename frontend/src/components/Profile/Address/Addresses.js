import React from 'react'
import { ListGroupItem, Row, Col, Button, Card } from 'react-bootstrap'
import { updateUserAddresses } from '../../../slices/userSlice'
import { useDispatch } from 'react-redux'

const Addresses = ({ addresses, shipping }) => {
  const dispatch = useDispatch()

  const onChangeHandler = (id, opr, checked, opt) => {
    dispatch(updateUserAddresses({ id, checked, opt, opr }))
  }

  return (
    <>
      {addresses.map((add) => (
        <ListGroupItem key={add._id}>
          <Row key={add._id} className="d-flex justify-content-between row">
            <Col className="text-center my-auto">
              <span
                label="Default Delivery Address"
                onClick={(e) => console.log(e.target.id)}
              >
                <i
                  className={`fas fa-map-marker-alt fa-3x ${
                    add.defaultDelivery ? 'text-success' : ''
                  }`}
                />
              </span>

              <i
                className={`fas fa-scroll fa-3x ml-4 ${
                  add.defaultBilling ? 'text-success' : ''
                }`}
              />
            </Col>
            <Col className="text-center my-auto">
              <Card>
                <Card.Header>
                  <b> {add.title}</b>
                </Card.Header>
                <Card.Body>
                  <i>
                    {add.firstName} {add.lastName}
                    <br />
                    {shipping
                      ? add.street.length > 20
                        ? add.street.slice(0, 15) + '...'
                        : add.street
                      : add.street}
                    <br />
                    {add.postalCode} , {add.city} / {add.country}
                  </i>
                </Card.Body>
              </Card>
            </Col>
            <Col className="text-center my-auto">
              {!add.defaultDelivery && (
                <Button
                  variant="outline-info"
                  className="btn btn-block my-2"
                  id={add._id}
                  onClick={(e) =>
                    onChangeHandler(
                      e.target.id,
                      'ADRC',
                      true,
                      'defaultDelivery'
                    )
                  }
                >
                  Set as Delivery Address
                </Button>
              )}
              {!add.defaultBilling && (
                <Button
                  variant="outline-warning"
                  className="btn btn-block"
                  id={add._id}
                  onClick={(e) =>
                    onChangeHandler(e.target.id, 'ADRC', true, 'defaultBilling')
                  }
                >
                  Set as Billing Address
                </Button>
              )}
              <Button
                variant="outline-danger"
                className="btn btn-block"
                id={add._id}
                onClick={(e) => onChangeHandler(e.target.id, 'DEL')}
              >
                Delete Address
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </>
  )
}

export default Addresses
