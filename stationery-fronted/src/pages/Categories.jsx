import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost/stationery-api/get_categories.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setCategories(data.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);
  const handleCategoryClick = (categoryName) => {
    navigate('/shop', {state: {selectedCategory: categoryName}});
  };
  if (loading) {
     return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading Categories...</div>;
  }

  return (
    <div className="categories-wrapper">
      
      <h2 className="categories-title">Tools That Bring Ideas to Life</h2>
      
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.category_id} className="category-card" onClick={() => handleCategoryClick(category.category_name)}>
 
            <div className="category-image-wrapper">
              <img 
                src={`http://localhost/stationery-api/${category.category_image_url}`} 
                alt={category.category_name} 
              />
            </div>
            
            <h3>{category.category_name}</h3>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Categories;