import React from 'react'
import { Row, Col, Container, Accordion } from 'react-bootstrap'

import UserInfoForm from '../components/Profile/Info/UserInfoForm'
import UserInfo from '../components/Profile/Info/UserInfo'

const ProfileScreen = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Your Details</h2>
          <p>
            <i>
              View and update your details right here. Manage your login options
              and passwords here.
            </i>
          </p>

          <Accordion>
            <UserInfo />
            <Accordion.Collapse eventKey="0" className="mb-3">
              <UserInfoForm profile />
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="1" className="mb-3">
              <UserInfoForm />
            </Accordion.Collapse>
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
