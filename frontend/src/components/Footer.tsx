import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-white py-2 shadow-[0_-2px_4px_rgba(0,0,0,0.1)] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 text-center">
          © 2025 Modish Log. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
