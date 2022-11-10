import { FerramentasDaListagem } from '../shared/components';
import { LayoutBaseDePagina } from '../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      title={'DashBoard'}
      barraDeFerramentas={<FerramentasDaListagem mostrarInputBusca />}
    >
      Dashboard Page
    </LayoutBaseDePagina>
  );
};
