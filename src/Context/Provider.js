import React from 'react';
import { Provider as WindowWidthContext } from './useWindowWidthContext';
const Provider = ({ children }) => {
  return <WindowWidthContext>{children}</WindowWidthContext>;
};

export default Provider;
