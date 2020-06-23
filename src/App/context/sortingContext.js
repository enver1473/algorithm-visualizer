import React, { createContext, useContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;

  const [looping, setLooping] = useState(false);

  const context = {
    looping,
    setLooping,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

export const useSortContext = () => useContext(Context);
