import React, { useEffect, useState } from 'react'
import {
  Button,
  Row,
  Col,
  Accordion,
  ListGroupItem,
  Alert,
} from 'react-bootstrap'
import SelectedAddress from './SelectedAddress'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../Loader'
import { clearError, resetStatus } from '../../../slices/userSlice'

const UserAddressInfo = ({ addresses, shipping }) => {
  const [message, setMessage] = useState(null)
  const [result, setResult] = useState(false)
  const [errorResult, setErrorResult] = useState(false)

  let filteredAddress = []
  if (addresses) {
    filteredAddress = addresses.filter(
      (item) => item.defaultDelivery || item.defaultBilling
    )
  }
  const { loading, status, error } = useSelector((state) => state.userList)
  const dispatch = useDispatch()

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
  return (
    <>
      {(result || errorResult) && (
        <Alert variant={errorResult ? 'danger' : 'success'} transition>
          {message}
        </Alert>
      )}
      <ListGroupItem className="mb-3">
        <Row className="d-flex justify-content-between">
          <Col className="my-auto text-center">
            <i className="fas fa-truck fa-9x" />
          </Col>
          {loading ? (
            <Col md={6}>
              <Loader />
            </Col>
          ) : (
            <>
              {addresses && filteredAddress.length > 0 ? (
                filteredAddress.map((address, index) => (
                  <SelectedAddress
                    address={address}
                    num={filteredAddress.length}
                    scr={shipping}
                    key={index}
                  />
                ))
              ) : (
                <Col
                  md={6}
                  className="my-auto text-center rounded border border-danger"
                >
                  <br />
                  <i>
                    <p>You don’t have any saved or selected addresses yet.</p>
                    <p>
                      Save an address now to make checkout even faster.
                    </p>{' '}
                  </i>
                </Col>
              )}
            </>
          )}

          <Col className="my-auto text-right">
            <Accordion.Toggle as={Button} variant="light" eventKey="0">
              <i className="fas fa-globe-americas mr-2" />
              Add Address
            </Accordion.Toggle>
            <Accordion.Toggle
              as={Button}
              variant="light"
              eventKey="1"
              className="mt-3"
            >
              <i className="fas fa-check mr-2" />
              Change Address
            </Accordion.Toggle>
          </Col>
        </Row>
      </ListGroupItem>
    </>
  )
}

export default UserAddressInfo
