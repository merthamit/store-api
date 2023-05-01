import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from './features/fakeStoreSlice';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import SingleProduct from './pages/single-product/SingleProduct';
import Navbar from './components/Navbar';
import Cart from './pages/cart/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/cart" component={() => <Cart />} />
          <Route
            exact
            path="/product/:productId"
            component={() => <SingleProduct />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
