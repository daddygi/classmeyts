import React from 'react';

const Header = ({ title }: { title: string }) => {
  return (
    <header className="p-1000 p-8 bg-red"> 
      <h1 className="text-4xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
