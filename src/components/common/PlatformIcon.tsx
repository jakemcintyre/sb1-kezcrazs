import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { getPlatformColor } from '../../utils/formatters';
import { Platform } from '../../types';

interface PlatformIconProps {
  platform: Platform;
  size?: number;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, size = 16 }) => {
  const colorClass = getPlatformColor(platform);
  
  const renderIcon = () => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={size} className={colorClass} />;
      case 'instagram':
        return <Instagram size={size} className={colorClass} />;
      case 'linkedin':
        return <Linkedin size={size} className={colorClass} />;
      case 'google':
        return <Mail size={size} className={colorClass} />;
      default:
        return <MessageSquare size={size} className={colorClass} />;
    }
  };

  return (
    <span className="flex items-center justify-center">
      {renderIcon()}
    </span>
  );
};

export default PlatformIcon;