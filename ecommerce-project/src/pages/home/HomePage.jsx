import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import ProductsGrid from './ProductsGrid.jsx';
import "./HomePage.css";
import "../header.css";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });

   
  }, []);

  return (
    <div className="home-page">
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <ProductsGrid products={products} />
    </div>
  );
}
