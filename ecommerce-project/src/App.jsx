import axios  from 'axios';
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { HomePage } from "./pages/home/HomePage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { ErrorPage } from "./pages/ErrorPage";
import { Route, Routes } from "react-router";
import { useState, useEffect } from 'react';

import "./App.css";

function App() {
  const [cart, setCart]=useState([]);

  useEffect(()=>{
     const fetchAppData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
     }

    fetchAppData();
  }, [])
  
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />}></Route>
      <Route path="orders" element={<OrdersPage cart={cart} />}></Route>
      <Route path="tracking" element={<TrackingPage />}></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
