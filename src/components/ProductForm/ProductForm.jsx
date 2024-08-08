import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 
const ProductForm = ({ productId, onCancel }) => {
  // https://stackoverflow.com/questions/67120800/react-update-price-with-usestate
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [errorMessage] = useState('');

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categorias:', error);
      });

    if (productId) {
      axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then(response => {
          const { title, price, description, category, images } = response.data;
          setTitle(title);
          setPrice(price.toString());
          setDescription(description);
          //aquí usé chatgpt porque no entendía por qué no me mostraba la categoría al editar unu y me dio esta opción que funcionó
          setCategoryId(category.id.toString()); 
          setSelectedCategory(category);
          //todo lo que aprendí de parse lo aprendí hoy porque una amiga me mencionó que lo había usado en otro ramo
          setImages(images);
        })
        .catch(error => {
          console.error('Error fetching detalles de producto:', error);
        });
    }
  }, [productId]);

  // debe haber una forma más óptima de hacerlo, pero preferí hacer los handle uno x uno por si alguno fallaba
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleImageChange = (e) => {
    const newImages = e.target.value.split('\n');
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!title || !price || !description || !categoryId || images.length === 0) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('El precio debe ser un número positivo mayor a 0.');
      return;
    }

    //esto también le pregunté a chatgpt porque en internet encontré otra forma que me generaba errores
    const isValidURL = (url) => {
      const pattern = /^(http|https):\/\/[^ "]+$/;
      return pattern.test(url);
    };

    if (!images.every(isValidURL)) {
      alert('Por favor, proporciona URLs de imagen válidas');
      return;
    }
    try {
      const productData = {
        title,
        price: parsedPrice,
        description,
        categoryId: parseInt(categoryId),
        images //imagesFormatter(images)
        //por alguna razón con el imagesFormatter me sale error, pero me rindo la verdad
      };
  
      let response;
      if (productId) {
        //actualiza
        response = await axios.put(`https://api.escuelajs.co/api/v1/products/${productId}`, productData);
      } else {
        //publica
        response = await axios.post('https://api.escuelajs.co/api/v1/products', productData);
      }
  
      if (response.status === 200 || response.status === 201) {
        alert('Producto guardado exitosamente.');
        window.location.href = '/';
      } else {
        alert('Error al guardar el producto. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Error al guardar el producto. Por favor, inténtalo de nuevo.');
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{productId ? 'Editar Producto' : 'Publicar Producto'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} required />

        <label htmlFor="price">Precio:</label>
        <input type="number" id="price" value={price} onChange={handlePriceChange} required />

        <label htmlFor="description">Descripción:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} required />

        <label htmlFor="categoryId">Categoría:</label>
        <select id="categoryId" value={categoryId} onChange={handleCategoryChange} required>
          <option value="">Seleccionar Categoría</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <label htmlFor="images">Imágenes (una por línea):</label>
        <textarea id="images" value={images.join('\n')} onChange={handleImageChange} required />

        <button type="submit">{productId ? 'Guardar Cambios' : 'Publicar'}</button>
        <button type="button" onClick={onCancel}>Volver</button>
      </form>
    </div>
  );
};

export default ProductForm;