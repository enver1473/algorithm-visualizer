import React, { createContext, useContext, useState, useEffect } from 'react';

export const Context = createContext({});

export const Provider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      if (width !== window.innerWidth) {
        setWidth(window.innerWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  const context = {
    width,
    setWidth,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

export const useWindowWidthContext = () => useContext(Context);
