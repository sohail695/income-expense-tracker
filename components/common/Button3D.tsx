import React from 'react';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  borderClassName?: string;
}

const Button3D: React.FC<Button3DProps> = ({ children, className, borderClassName, ...props }) => {
  const defaultBorders = 'border-t-retro-gray-light border-l-retro-gray-light border-b-retro-gray-dark border-r-retro-gray-dark active:border-b-retro-gray-light active:border-r-retro-gray-light active:border-t-retro-gray-dark active:border-l-retro-gray-dark';
  const borders = borderClassName || defaultBorders;

  return (
    <button
      className={`font-bold border-2 ${borders} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-retro-gray transition-all duration-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button3D;
