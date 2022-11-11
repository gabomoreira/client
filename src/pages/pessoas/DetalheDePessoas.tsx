import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhes } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const DetalheDePessoas = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('Save');
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  return (
    <LayoutBaseDePagina
      title="Detalhe de Pessoa"
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo="Nova"
          mostrarBotaoSalvar
          mostrarBotaoSalvarEVoltar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEVoltar={handleSave}
          aoClicarEmApagar={handleDelete}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >
      Detalhe pesoa
    </LayoutBaseDePagina>
  );
};
