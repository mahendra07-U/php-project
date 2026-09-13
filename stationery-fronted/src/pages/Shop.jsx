import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import './Shop.css';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 
  const incomingCategory = location.state?.selectedCategory || 'All';
  const [activeCategory, setActiveCategory] = useState(incomingCategory);

  useEffect(() => {
    fetch('http://localhost/stationery-api/get_products.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);
  const handleAddToCart = (productId) => {
    const userData = JSON.parse(localStorage.getItem('userProfileData'));

    if (!userData) {
      alert("Please login first to add items to cart!");
      return;
    }

    fetch('http://localhost/stationery-api/add_to_cart.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userData.user_id,
        product_id: productId
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        alert(" Product successfully added to cart!");
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch(error => console.error("Error:", error));
  };
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category_name === activeCategory);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Products...</div>;
  }

  return (
    <div className="shop-wrapper">
      <div className="shop-header">
  
        <h2 className="shop-title">
          {activeCategory === 'All' ? 'All Products' : `${activeCategory} Collection`}
        </h2>
        
        {activeCategory !== 'All' && (
          <button 
            onClick={() => setActiveCategory('All')} 
            style={{ marginTop: '15px', padding: '8px 20px', borderRadius: '20px', border: 'none', backgroundColor: '#3498db', color: 'white', cursor: 'pointer' }}
          >
            ← View All Products
          </button>
        )}
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.product_id} className="product-card">
              <div className="product-image-box">
                <img 
                  src={`http://localhost/stationery-api/${product.product_image_url}`} 
                  alt={product.product_name} 
                />
              </div>
              <div className="product-details">
                <p className="product-category">{product.category_name}</p>
                <h3 className="product-name">{product.product_name}</h3>
                <p className="product-price">₹ {product.price}</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product.product_id)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
            <h3>Sorry, no products found in this category! </h3>
            <button onClick={() => setActiveCategory('All')} style={{ padding: '8px 20px', cursor: 'pointer' }}>Show All</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;