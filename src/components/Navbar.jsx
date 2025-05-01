import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ activeTab, setActiveTab, user, isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (category) => {
    setActiveTab(category);
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const getMenuItems = () => {
    if (isLoggedIn) {
      return ['Latest Release', 'Product', 'About Us'];
    }
    return ['New Releases', 'Bestsellers', 'Genres', 'About Store'];
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-white">Atmosphères</span>
        </div>

        <nav className="hidden md:block ml-auto mr-8">
          <ul className="flex space-x-12">
            {getMenuItems().map((category) => (
              <li key={category}>
                <a
                  href={`#${category.toLowerCase().replace(' ', '-')}`}
                  className={`font-medium hover:text-white transition-colors ${
                    activeTab === category ? 'text-white' : 'text-blue-100'
                  }`}
                  onClick={() => handleNavClick(category)}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {isLoggedIn ? (
          <div className="hidden md:block relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-white font-medium hover:opacity-80 transition-colors bg-transparent w-32 text-center rounded-full border border-white/80 px-4 py-1"
            >
              <span className="truncate block">{user?.name}</span>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-1 border-none">
                <button
                  className="w-full text-left px-3 py-1.5 text-gray-600 bg-transparent hover:bg-gray-50 transition-colors text-sm"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Account
                </button>
                <button
                  className="w-full text-left px-3 py-1.5 text-gray-600 bg-transparent hover:bg-gray-50 transition-colors text-sm"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="hidden md:block px-3 py-1 bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors"
          >
            Login
          </button>
        )}

        <button 
          className="md:hidden flex items-center p-1 bg-blue-700 rounded-lg" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg rounded-b-lg overflow-hidden">
          <nav className="container mx-auto px-4 py-2">
            <ul className="space-y-3">
              {getMenuItems().map((category) => (
                <li key={category} className="border-b border-gray-100 pb-2">
                  <a
                    href={`#${category.toLowerCase().replace(' ', '-')}`}
                    className={`block py-2 font-medium hover:text-black ${
                      activeTab === category ? 'text-black' : 'text-gray-700'
                    }`}
                    onClick={() => handleNavClick(category)}
                  >
                    {category}
                  </a>
                </li>
              ))}
              {isLoggedIn ? (
                <>
                  <li className="border-b border-gray-100 pb-2">
                    <button className="w-full text-left block py-2 font-medium text-gray-700 hover:text-black">
                      Account
                    </button>
                  </li>
                  <li className="border-b border-gray-100 pb-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block py-2 font-medium text-gray-700 hover:text-black"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <li className="border-b border-gray-100 pb-2">
                  <button
                    onClick={handleLogin}
                    className="w-full text-center block py-1 font-medium text-blue-600 hover:bg-blue-50 transition-colors bg-white text-sm"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}