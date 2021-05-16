import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../slices/userSlice'

const Header = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cartList.cart)
  const { name } = useSelector((state) => state.userList.userData)
  let history = useHistory()

  const logoutHandler = () => {
    dispatch(logOut())
    history.push('/')
  }
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>OgShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to={`/cart`}>
                <Nav.Link>
                  {cart.length > 0 && (
                    <span className="badge badge-pill badge-warning">
                      {cart.reduce((acc, crnt) => acc + crnt.quantity, 0)}
                    </span>
                  )}{' '}
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Cart
                </Nav.Link>
              </LinkContainer>
              {name ? (
                <NavDropdown title={name} id="username">
                  <LinkContainer to="/profile/info">
                    <NavDropdown.Item>
                      <i className="fas fa-user mr-2" /> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profile/addresses">
                    <NavDropdown.Item>
                      <i className="fas fa-map-marker mr-2" /> Addresses
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profile/orders">
                    <NavDropdown.Item>
                      <i className="fas fa-box mr-2" /> Orders
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt mr-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user mx-2" /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
