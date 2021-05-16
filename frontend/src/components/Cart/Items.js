import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import { adjustCartCheck } from '../../slices/cartSlice'
const CartItem = ({ cart }) => {
  const dispatch = useDispatch()
  return (
    <ListGroup>
      {cart.map((item) => (
        <ListGroup.Item key={item._id}>
          <Row>
            <Col md={3}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={3} className="my-auto">
              <Link to={`/product/${item._id}`}>{item.name}</Link>
            </Col>
            <Col md={2} className="my-auto">
              {item.price} $
            </Col>

            <Col md={3} className="my-auto">
              <Button
                type="button"
                variant="light"
                className="mr-3"
                value="DEC"
                onClick={() =>
                  dispatch(
                    adjustCartCheck(
                      item._id,
                      item.image,
                      item.price,
                      item.name,
                      'DEC'
                    )
                  )
                }
              >
                <i className="fas fa-minus"></i>
              </Button>
              <span className="font-weight-bold">{item.quantity}</span>
              <Button
                type="button"
                variant="light"
                className="ml-3"
                onClick={() =>
                  dispatch(
                    adjustCartCheck(
                      item._id,
                      item.image,
                      item.price,
                      item.name,
                      'INC'
                    )
                  )
                }
              >
                <i className="fas fa-plus"></i>
              </Button>
            </Col>
            <Col md={1} className="my-auto">
              <Button
                type="button"
                variant="light"
                onClick={() =>
                  dispatch(
                    adjustCartCheck(
                      item._id,
                      item.image,
                      item.name,
                      item.price,
                      'DEL'
                    )
                  )
                }
              >
                <i className="fas fa-trash "></i>
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default CartItem
