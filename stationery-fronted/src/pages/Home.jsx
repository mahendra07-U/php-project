import { useNavigate } from 'react-router-dom';
import './Home.css';
import premiumImg from 'D:/React JS/php project/stationery-fronted/src/assets/43.jpg';
import penImg from 'D:/React JS/php project/stationery-fronted/src/assets/15.jpg';
import chocking from 'D:/React JS/php project/stationery-fronted/src/assets/16.jpg';
function Home() {
  const navigate = useNavigate();
  const handleShopNowClick = () => {
    const isLoggedIn = localStorage.getItem('userProfileData');
       if(isLoggedIn){
        navigate('/shop');
      }else {
        navigate('/login');
    }
  }
  const handleCategoryClick = (categoryName) => {
    const isLoggedIn = localStorage.getItem('userProfileData');
   
    if(!isLoggedIn){
      navigate('/login');
    }else {
      navigate('/shop',{state: { selectedCategory: categoryName}});
    }
  };
  const showcaseItems = [
    { 
      id: 1, 
      title: "ALL Type Of Pencils", 
      price: "Start from ₹45", 
      image: premiumImg
    },
    { 
      id: 2, 
      title: "Premium Notebooks", 
      price: "Start from ₹150", 
      image: penImg
    },
    { 
      id: 3, 
      title: "Classic Chocks", 
      price: "Start from ₹120", 
      image: chocking
    }
  ];

  return (
    <div className="home-page-container">
      <div className="hero-section">
        <div className="hero-left">
          <h1>Your Ultimate <br />Stationery Sanctuary</h1>
        </div>
        <div className="hero-right">
          <p>
            Step into SDJ, your haven for all the stationery enthusiasts, 
            where inspiration flows, and writing becomes an art.
          </p>
          <button className="shop-now-btn" onClick={handleShopNowClick}>Shop Now</button>
        </div>
      </div>
      <div className="showcase-grid">
        {showcaseItems.map((item) => (
          <div className="showcase-card" key={item.id}>
            <div className="card-image-box" onClick={() => handleCategoryClick()} style={{ backgroundColor: item.bgColor }}>
              <img src={item.image} alt={item.title} /> 
            </div>
            <div className="card-info-row">
              <div>
                <h3>{item.title}</h3>
                <p className="start-price">{item.price}</p>
              </div>
              <button className="cart-icon-btn">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;