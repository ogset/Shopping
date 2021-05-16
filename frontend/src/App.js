import Header from './components/Header'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import OrdersScreen from './screens/OrdersScreen'
import AddressScreen from './screens/AddressScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

function App() {
  const { token } = useSelector((state) => state.userList.userData)
  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/product/:id" component={ProductScreen} exact />
        <Route path="/cart" component={CartScreen} />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/profile/info" component={ProfileScreen} exact />
        <Route path="/profile/addresses" component={AddressScreen} exact />
        <Route path="/profile/orders" component={OrdersScreen} exact />
        <Route path="/placeorder" component={PlaceOrderScreen} exact />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/product/:id" component={ProductScreen} exact />
        <Route path="/cart" component={CartScreen} />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Redirect to="/login" />
      </Switch>
    )
  }
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>{routes}</Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
