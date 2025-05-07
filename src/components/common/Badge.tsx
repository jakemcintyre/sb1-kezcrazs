import React from 'react';

interface BadgeProps {
  text: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, className = '' }) => {
  return (
    <span 
      className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge;