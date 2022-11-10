import React, { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption {
  icon: string;
  label: string;
  path: string;
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

interface IDrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldIsDrawerOpen) => !oldIsDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: IDrawerOption[]) => {
      setDrawerOptions(newDrawerOptions);
    },
    []
  );

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        setDrawerOptions: handleSetDrawerOptions,
        toggleDrawerOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
