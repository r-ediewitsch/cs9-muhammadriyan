import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/panduan-emas.png';
import { getItem } from '../actions/Item.action';

export default function CounterSection() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    setIsLoggedIn(!!userData);

    if (userData) {
      fetchItems();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Changed from 3000 to 5000 ms

    return () => clearInterval(interval);
  }, [currentSlide, items.length]);

  const fetchItems = async () => {
    try {
      const data = await getItem();
      // Take only first 4 items
      setItems((data.payload || []).slice(0, 4));
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const nextSlide = () => {
    // On mobile, slide through all items one by one
    const maxSlides = window.innerWidth >= 768 ? Math.ceil(items.length / 2) - 1 : items.length - 1;
    setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxSlides = window.innerWidth >= 768 ? Math.ceil(items.length / 2) - 1 : items.length - 1;
    setCurrentSlide((prev) => (prev === 0 ? maxSlides : prev - 1));
  };

  if (!isLoggedIn) {
    return (
      <section className="relative h-[95vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl h-[75vh] mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-3 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
            <div className="p-12 text-center h-full flex flex-col justify-between">
              <div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
                  Welcome to Atmosphères Music Store
                </h2>
                <p className="text-gray-600 text-xl mb-10">
                  Experience the celestial voice of our shooting star
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <svg 
                    className="w-32 h-32 mx-auto mb-8 text-blue-500 opacity-80" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="1.5" 
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg max-w-lg mx-auto">
                    Explore exclusive albums and singles from our beloved idol, Hoshimachi Suisei
                  </p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/login')}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Login Now
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[95vh] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="container mx-auto px-4">
        <div className="bg-transparent rounded-xl shadow-xl">
          <div className="relative max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center bg-white bg-clip-text text-transparent mb-4">
              Latest Release
            </h2>
            <div className="overflow-hidden relative rounded-lg shadow-lg">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {window.innerWidth >= 768 ? (
                  // Desktop view - 2 items per slide
                  Array.from({ length: Math.ceil(items.length / 2) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="hidden md:grid grid-cols-2 gap-2 p-2">
                        {items.slice(slideIndex * 2, slideIndex * 2 + 2).map((item, index) => (
                          <div key={index} className="relative aspect-square overflow-hidden rounded-lg group">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400" />
                            <img
                              src={item.image_url}
                              alt="Product"
                              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  // Mobile view - 1 item per slide
                  items.map((item, index) => (
                    <div key={index} className="w-full flex-shrink-0 p-2">
                      <div className="relative aspect-square overflow-hidden rounded-lg group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400" />
                        <img
                          src={item.image_url}
                          alt="Product"
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute top-1/2 -left-24 transform -translate-y-1/2 bg-transparent text-white text-5xl hover:text-blue-300 transition-all duration-300 z-10"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -right-24 transform -translate-y-1/2 bg-transparent text-white text-5xl hover:text-blue-300 transition-all duration-300 z-10"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
