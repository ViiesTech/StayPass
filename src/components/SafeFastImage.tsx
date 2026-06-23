import React from 'react';
import {Image, ImageStyle, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

interface SafeFastImageProps {
  source?: any;
  style?: ImageStyle | ViewStyle;
  resizeMode?: string;
  priority?: string;
  cache?: string;
  fallback?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  [key: string]: any;
}

const SafeFastImage: React.FC<SafeFastImageProps> = ({
  fallback = false,
  resizeMode,
  priority,
  cache,
  ...props
}) => {
  const [hasError, setHasError] = React.useState(false);

  // Convert FastImage resizeMode to Image resizeMode
  const convertResizeMode = (mode: string) => {
    switch (mode) {
      case 'cover':
        return 'cover' as const;
      case 'contain':
        return 'contain' as const;
      case 'stretch':
        return 'stretch' as const;
      case 'center':
        return 'center' as const;
      default:
        return 'cover' as const;
    }
  };

  const handleError = () => {
    setHasError(true);
    props.onError?.();
  };

  if (fallback || hasError) {
    // Use regular Image component as fallback
    return (
      <Image
        {...props}
        style={props.style}
        resizeMode={convertResizeMode(resizeMode || 'cover')}
        onError={handleError}
      />
    );
  }

  try {
    // Try to dynamically import FastImage

    return (
      <FastImage
        {...props}
        resizeMode={resizeMode || FastImage.resizeMode.cover}
        priority={priority || FastImage.priority.normal}
        cache={cache}
        onError={handleError}
      />
    );
  } catch (error) {
    console.log('FastImage not available, falling back to Image:', error);
    // Fallback to regular Image component
    return (
      <Image
        {...props}
        style={props.style}
        resizeMode={convertResizeMode(resizeMode || 'cover')}
        onError={handleError}
      />
    );
  }
};

export default SafeFastImage;
