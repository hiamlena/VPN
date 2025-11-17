
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          <span className="text-cyan-400">VPN</span> Deployment Assistant
        </h1>
        <p className="text-sm text-gray-400 mt-1">Генератор плана развертывания корпоративной сети</p>
      </div>
    </header>
  );
};

export default Header;
