import React, { useEffect } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import Product from '../components/Product/Product'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../slices/productSlice'
import Loader from '../components/Loader'
import { reset } from '../slices/orderSlice'

const HomeScreen = () => {
  const { productsData, error, loading } = useSelector(
    (state) => state.productsList.products
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(reset())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        <Row>
          {productsData.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
