import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductsPage.css";
import ProductCard from "../../components/Products/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // parecido de la ayudantía 
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("error al obtener los productos:", error);
      });

  }, []);



  return (
    <div className="content">
      <h1 className="page-title">productos :p</h1>
      <div className="button-container">
        <button onClick={() => window.location.href = "/product-form"}>publicar producto</button>
      </div>
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onDelete={(productId) => setProducts(products.filter(p => p.id !== productId))} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
