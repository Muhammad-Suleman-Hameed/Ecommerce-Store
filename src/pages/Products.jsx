import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './productlist.css';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [categoryOption, setCategoryOption] = useState("all");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8888/products/categories');
        const data = await res.json();
        console.log("Fetched categories:", data);
        setCategories(['all', ...data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:8888/products';
        if (categoryOption !== "all") {
          url = `http://localhost:8888/products/category/${encodeURIComponent(categoryOption)}`;
        }
        console.log("Fetching products from URL:", url);
        const response = await fetch(url);
        const data = await response.json();
        console.log("Raw products fetched:", data);

        let sortedProducts = [...data];
        if (sortOption === "price-asc") {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
          sortedProducts.sort((a, b) => b.price - a.price);
        }
        console.log("Sorted products:", sortedProducts);
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [sortOption, categoryOption]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart!", { duration: 700 });
  };

  return (
    <div className="products-page">
      <Toaster position="top-right" containerStyle={{ top: '80px' }} />

      <div className="products-header">
        <h2 className='invisible'>Featured Products</h2>
        <div className="filters-container">
          <div className="filter">
            <label htmlFor="category" className="filter-label">Category:</label>
            <select
              id="category"
              value={categoryOption}
              onChange={(e) => {
                console.log("Category changed to:", e.target.value);
                setCategoryOption(e.target.value);
              }}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="sortBy" className="filter-label">Sort by:</label>
            <select
              id="sortBy"
              value={sortOption}
              onChange={(e) => {
                console.log("Sort changed to:", e.target.value);
                setSortOption(e.target.value);
              }}
              className="filter-select"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="product-container">
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            data-category={product.category}
            data-price={product.price}
          >
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h6 className="product-category">{product.category}</h6>
              <h5 className="product-title">{product.title}</h5>
              <p className="product-price">${product.price}</p>
              <div className="button-container">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;


