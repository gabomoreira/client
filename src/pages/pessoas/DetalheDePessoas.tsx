import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LayoutBaseDePagina } from '../../shared/layouts';
import { VTextField } from '../../shared/forms/VTextField';
import { FerramentasDeDetalhes } from '../../shared/components';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

export const DetalheDePessoas = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setIsLoading(false);
          setNome(result.nomeCompleto);
          formRef.current?.setData(result);
        }
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);

    if (id === 'nova') {
      PessoasService.create(dados).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      PessoasService.updateById(Number(id), { id: Number(id), ...dados }).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        }
      });
    }
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
      <Form ref={formRef} onSubmit={(dados) => handleSave(dados)}>
        <Box component={Paper} margin={1} display="flex" flexDirection="column" variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Nome Completo"
                  name="nomeCompleto"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField fullWidth label="Email" name="email" disabled={isLoading} />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField fullWidth label="Cidade" name="cidadeId" disabled={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBaseDePagina>
  );
};
