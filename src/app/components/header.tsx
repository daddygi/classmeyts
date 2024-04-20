import React from 'react';

const Header = ({ title }: { title: string }) => {
  return (
    <header className="py-4 px-8"> 
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
