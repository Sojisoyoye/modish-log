import React, { ReactNode, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/user.context';

import {
  HomeIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  PlusIcon,
  UserPlusIcon,
  PlusCircleIcon,
  ListBulletIcon,
  ScaleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const userContext = useUser();

  const isAdmin = userContext?.user?.role === 'admin';

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    if (userContext?.setUser) {
      userContext.setUser(null);
      localStorage.removeItem('access_token');
      navigate('/signin');
    }
  };

  // Navigation items
  const navItems = [
    { text: 'Home', icon: <HomeIcon className="h-6 w-6" />, path: '/' },
    {
      text: 'Sales',
      icon: <ShoppingCartIcon className="h-6 w-6" />,
      path: '/sales',
    },
    {
      text: 'Products',
      icon: <ArchiveBoxIcon className="h-6 w-6" />,
      path: '/products',
    },
    {
      text: 'Add Sale',
      icon: <PlusIcon className="h-6 w-6" />,
      path: '/add-sale',
    },
    {
      text: 'Add Product',
      icon: <PlusCircleIcon className="h-6 w-6" />,
      path: '/add-product',
    },
    {
      text: 'Stock Count',
      icon: <ListBulletIcon className="h-6 w-6" />,
      path: '/stock-count',
    },
    {
      text: 'Stock Balance',
      icon: <ScaleIcon className="h-6 w-6" />,
      path: '/stock-balance',
    },
  ];

  const adminItems = [
    {
      text: 'Create User',
      icon: <UserPlusIcon className="h-6 w-6" />,
      path: '/create-user',
    },
    {
      text: 'Users',
      icon: <UserPlusIcon className="h-6 w-6" />,
      path: '/users',
    },
  ];

  const drawerContent = (
    <div className="w-64 h-full bg-white shadow-lg">
      <div className="p-4 bg-blue-600 flex justify-center items-center h-16">
        <h1 className="text-white text-xl font-bold">Modish Log</h1>
      </div>
      <div className="overflow-y-auto h-[calc(100%-4rem)] custom-scrollbar">
        <div className="p-2">
          <nav>
            {navItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-50 mb-1"
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <div className="mr-3 text-blue-500">{item.icon}</div>
                <span>{item.text}</span>
              </Link>
            ))}

            {isAdmin && (
              <>
                <div className="my-2 border-t border-gray-200"></div>
                {adminItems.map((item) => (
                  <Link
                    key={item.text}
                    to={item.path}
                    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-50 mb-1"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <div className="mr-3 text-blue-500">{item.icon}</div>
                    <span>{item.text}</span>
                  </Link>
                ))}
              </>
            )}

            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-red-50 mb-1 mt-4"
            >
              <div className="mr-3 text-red-500">
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
              </div>
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Sidebar for larger screens, drawer for mobile */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-200 ease-in-out z-30 lg:static lg:h-screen`}
      >
        {drawerContent}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={handleDrawerToggle}
              className="text-gray-500 focus:outline-none focus:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="text-lg font-bold text-blue-600">Modish Log</div>
            <div className="w-6"></div> {/* Empty div for flex spacing */}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Navbar;
