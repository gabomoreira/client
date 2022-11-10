import {
  FerramentasDaListagem,
  FerramentasDeDetalhes,
} from '../shared/components';
import { LayoutBaseDePagina } from '../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      title={'DashBoard'}
      barraDeFerramentas={<FerramentasDeDetalhes mostrarBotaoSalvarEVoltar />}
    >
      Dashboard Page
    </LayoutBaseDePagina>
  );
};
