import React, { CSSProperties } from 'react';
import './Skeleton.scss';
import { px } from 'src/utils/styles';

interface Props {
  className?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
}

const Skeleton = ({ className, width, height, style = {} }: Props) => {
  const getStyle = () => {
    const newStyle: CSSProperties = style;
    if (width) newStyle.width = px(width);
    if (height) newStyle.height = px(height);
    return newStyle;
  };

  return <div className={`skeleton ${className}` || ''} style={getStyle()} />;
};

export default Skeleton;
