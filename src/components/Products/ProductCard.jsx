import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, onDelete }) => {
  const { id, title, images, description, price, category } = product;
  //const [images, setImages] = useState(JSON.parse(imagesString))
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // https://es.stackoverflow.com/questions/606701/crear-un-carrousel-manual-y-a-la-vez-autom%c3%a1tico
  const handlePrevImage = () => setCurrentImageIndex(prevIndex => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  const handleNextImage = () => setCurrentImageIndex(prevIndex => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));

  // https://www.w3schools.com/js/js_window_location.asp
  const handleEditProduct = () => {window.location.href = `/product-form/${id}`;};


  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
      onDelete(id);
      alert('producto eliminado correctamente');
    } catch (error) {
      console.error("error eliminado producto:", error);
    }
  };

  return (
      <div className="product-card">
        <div className="product-image-container">
          <img src={images[currentImageIndex]} alt={title} className="product-image" />
          {images.length > 1 && (
            <div className="image-navigation">
              <button onClick={handlePrevImage}>&lt;</button>
              <button onClick={handleNextImage}>&gt;</button>
            </div>
          )}
        </div>
        <Link to={`/product/${id}`} className="product-link">
        <div className="product-details">
          <h2 className="product-title">{title}</h2>
          <p className="product-description">{description}</p>
          <p className="product-price">${price}</p>
        </div>
        </Link>
        <div className="button-container">
          <button onClick={() => { if (window.confirm('¿de verdad quieres eliminar este producto :-(?')) handleDelete() }}>Eliminar</button>
          <button onClick={handleEditProduct}>Editar</button>
        </div>
      </div>

  );
};

export default ProductCard;
// hice el Link to separado del carrusel de imágenes porque cuando intenté usarlo en todo el ProductCard, 
// no funcionaba el carrusel de imágenes XD