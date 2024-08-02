// src/components/ProductList.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { products } from '../data/products';
import '../styles/ProductList.css'; 

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-list">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
