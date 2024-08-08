import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import './ProductFormPage.css';

const ProductFormPage = () => {
  const { id } = useParams();

  const handleCancel = () => {
    window.location.href = '/';
  };

  return (
    //sólo me preocupé d esto aquí para quitarle una pega a ProductForm
    <div>
      <ProductForm productId={id} onCancel={handleCancel} />
    </div>
  );
};

export default ProductFormPage;