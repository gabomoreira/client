import { LinearProgress } from '@mui/material';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhes } from '../../shared/components';
import { VTextField } from '../../shared/forms/VTextField';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { IDetalhePessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: string;
}

export const DetalheDePessoas = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    setIsLoading(true);

    PessoasService.getById(Number(id)).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
        navigate('/pessoas');
      } else {
        setIsLoading(false);
        setNome(result.nomeCompleto);
        console.log(result);
      }
    });
  }, [id]);

  const handleSave = (dados: IFormData) => {
    console.log(dados);
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente apagar?')) {
      PessoasService.deleteById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Pessoa apagada com sucesso.');
          navigate('/pessoas');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      title={id === 'nova' ? 'Nova Pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo="Nova"
          mostrarBotaoSalvar
          mostrarBotaoSalvarEVoltar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEVoltar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <Form ref={formRef} onSubmit={(dados) => handleSave(dados)}>
        <VTextField name="nomeCompleto" />
        <VTextField name="email" />
        <VTextField name="cidadeId" />
      </Form>
    </LayoutBaseDePagina>
  );
};
