import React, { useState } from 'react';
import ProductList from '../components/ProductList'; // For admin use
import '../styles/AdminPage.css'; // Ensure this path is correct
import api from '../api/axios';

const AdminPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false); // To trigger re-render of ProductList

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, description, price: parseFloat(price), image };
      await api.post('/products', newProduct);
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
      setError('');
      setRefresh(prev => !prev); // Trigger ProductList to fetch new data
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product. Please try again.');
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleAddProduct}>
        <h3>Add New Product</h3>
        {error && <p className="error">{error}</p>}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
      <ProductList refresh={refresh} />
    </div>
  );
};

export default AdminPage;
