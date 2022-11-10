import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Incial',
        path: '/pagina-inicial',
        icon: 'home',
      },
      {
        label: 'Pessoas Cadastradas',
        path: '/pessoas',
        icon: 'people',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="pagina-inicial" element={<Dashboard />} />
      <Route path="/pessoas" element={'pessoas page'} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
