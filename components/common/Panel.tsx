import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'outset' | 'inset';
  borderClassName?: string;
}

const Panel: React.FC<PanelProps> = ({ children, className = '', variant = 'outset', borderClassName }) => {
  const defaultOutset = 'border-t-retro-gray-light border-l-retro-gray-light border-b-retro-gray-dark border-r-retro-gray-dark';
  const defaultInset = 'border-b-retro-gray-light border-r-retro-gray-light border-t-retro-gray-dark border-l-retro-gray-dark';

  const borders = borderClassName
    ? borderClassName
    : (variant === 'outset' ? defaultOutset : defaultInset);

  const style = `border-2 bg-retro-gray ${borders} ${variant === 'inset' ? 'p-1' : ''}`;

  return (
    <div className={`${style} ${className}`}>
      {children}
    </div>
  );
};

export default Panel;
