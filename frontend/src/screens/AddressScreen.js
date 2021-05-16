import React, { useEffect } from 'react'
import { Row, Col, Container, Accordion, Alert } from 'react-bootstrap'

import UserAddressInfo from '../components/Profile/Address/UserAddressInfo'
import Addresses from '../components/Profile/Address/Addresses'
import AddressForm from '../components/Profile/Address/AddressForm'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAddresses } from '../slices/userSlice'

const AddressScreen = () => {
  const {
    userAddresses: { addresses },
    error,
  } = useSelector((state) => state.userList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAddresses())
  }, [dispatch])
  return (
    <Container>
      <Row>
        <Col>
          <h2>Your Addresses</h2>
          <p>
            <i>
              View and update your Addresses right here. Manage your delivery
              and billing addresses.
            </i>
          </p>
          <>
            {error ? (
              <Alert>{error}</Alert>
            ) : (
              <Accordion>
                <UserAddressInfo addresses={addresses} />
                <Accordion.Collapse eventKey="0" className="mb-3">
                  <AddressForm />
                </Accordion.Collapse>
                <Accordion.Collapse eventKey="1" className="mb-3">
                  <Addresses addresses={addresses ? addresses : []} />
                </Accordion.Collapse>
              </Accordion>
            )}
          </>
        </Col>
      </Row>
    </Container>
  )
}

export default AddressScreen
