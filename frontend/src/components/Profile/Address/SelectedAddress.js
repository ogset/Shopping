import React from 'react'
import { Card, Col } from 'react-bootstrap'

const SelectedAddress = ({ address, num, scr }) => {
  return (
    <Col
      md={num !== 2 ? (scr ? ' ' : 6) : 3}
      className={num !== 2 ? 'text-center' : ''}
    >
      <Card>
        <Card.Header>
          <b>{address.title}</b>
        </Card.Header>
        <Card.Body style={num === 2 && scr ? { fontSize: 'small' } : {}}>
          <i>
            {address.firstName} {address.lastName}
            <br />
            {address.street.length > (scr ? 20 : 30)
              ? address.street.slice(0, scr ? 15 : 29) + '...'
              : address.street}
            <br />
            {address.postalCode} , {address.city} / {address.country}
          </i>
        </Card.Body>
        <Card.Footer style={scr ? { padding: '0.75rem 0.75rem' } : {}}>
          {(address.defaultDelivery || address.defaultBilling) && num > 1 && (
            <small className="text-muted">
              <i className="fas fa-check-circle mr-1 text-success" />
              {`${scr ? '' : 'Default'} ${
                address.defaultDelivery ? 'Delivery' : 'Billing'
              } Address`}
            </small>
          )}

          {num === 1 && (
            <>
              <small className="text-muted mr-5 ">
                <i className="fas fa-check-circle mr-1 text-success" />
                {`${scr ? '' : 'Default'} Billing Address`}
              </small>
              <small className="text-muted ">
                <i className="fas fa-check-circle mr-1 text-success" />
                {`${scr ? '' : 'Default'} Delivery Address`}
              </small>
            </>
          )}
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default SelectedAddress
