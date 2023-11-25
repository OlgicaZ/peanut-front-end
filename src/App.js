import './App.scss'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Restaurants from './pages/Restaurants/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails/RestaurantDetails';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path='/restaurant-details/:id' element={<RestaurantDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
