import React from 'react';
import { getInitials } from '../../utils/formatters';

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUrl, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  if (imageUrl) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0`}>
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
        flex items-center justify-center text-white font-medium flex-shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;