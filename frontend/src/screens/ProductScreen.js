import React, { useEffect } from 'react'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Product/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../slices/productSlice'
import { adjustCartCheck } from '../slices/cartSlice'
import Loader from '../components/Loader'

const ProductScreen = ({ match }) => {
  const _id = match.params.id
  const dispatch = useDispatch()
  const { productData, loading, error } = useSelector(
    (state) => state.productsList.product
  )
  const cartLoading = useSelector((state) => state.cartList.loading)

  const { image, name, numReviews, rating, price, description, countInStock } =
    productData

  useEffect(() => {
    dispatch(getProduct(_id))
  }, [dispatch, _id])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={image} alt={name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={rating} review={numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>{description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup className="text-center">
              <ListGroup.Item>
                Price : <strong> ${price}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                {countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant={countInStock === 0 ? 'danger' : 'outline-success'}
                  type="button"
                  disabled={countInStock === 0}
                  block
                  onClick={() => {
                    dispatch(adjustCartCheck(_id, image, price, name, 'ADD'))
                  }}
                >
                  {cartLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    'ADD TO CART'
                  )}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
