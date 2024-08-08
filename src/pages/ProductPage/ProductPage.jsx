import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const obtenerData = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        // esto le pregunté a chatgpt porque no sabía cómo implementar json.parse a esta parte
        // (lo que hice primero no funcionó XD)
        setProduct(response.data)
        const { images } = response.data;
        setProduct({ ...response.data, images: JSON.parse(images) });
      } catch (error) {
        console.error('error buscando detalles del producto', error);
      }
    };

    obtenerData();
  }, [id]);

  // https://es.stackoverflow.com/questions/606701/crear-un-carrousel-manual-y-a-la-vez-autom%c3%a1tico
  const handlePrevImage = () => setCurrentImageIndex(prevIndex => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  const handleNextImage = () => setCurrentImageIndex(prevIndex => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  const handleGoBack = () => window.location.href = '/';

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-image-container">
        <img src={product.images[currentImageIndex]} alt={`Product ${currentImageIndex}`} />
        <div className="image-navigation">
          <button onClick={handlePrevImage}>&lt;</button>
          <button onClick={handleNextImage}>&gt;</button>
        </div>
      </div>
      <div className="product-details-container">
        <h2>{product.title}</h2>
        <p>Categoría: {product.category.name}</p>
        <p>Descripción: {product.description}</p>
        <p>Precio: ${product.price}</p>
      </div>
      <button onClick={handleGoBack}>volver</button>
    </div>
  );
}

export default ProductPage;
