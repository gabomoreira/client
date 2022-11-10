import { BarraDeFerramentas } from '../shared/components';
import { LayoutBaseDePagina } from '../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      title={'DashBoard'}
      barraDeFerramentas={<BarraDeFerramentas mostrarInputBusca />}
    >
      Dashboard Page
    </LayoutBaseDePagina>
  );
};
