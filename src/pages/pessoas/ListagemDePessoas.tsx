import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { Environment } from '../../shared/environment';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSerachParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [pessoas, setPessoas] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result.data);
          setPessoas(result.data);
          setTotalCount(result.totalCount);
        }
      });
    });
  }, [busca, pagina]);

  const handleDelete = (idPessoa: number) => {
    if (confirm('Deseja realmente apagar essa pessoa?')) {
      PessoasService.deleteById(idPessoa).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setPessoas((oldPessoas) => [...oldPessoas.filter((pessoa) => pessoa.id !== idPessoa)]);
          alert('Pessoa pagada com sucesso');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      title="Listagem de Pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) => setSerachParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pessoas?.map((pessoa) => (
              <TableRow key={pessoa.id}>
                <TableCell>
                  <IconButton onClick={() => handleDelete(pessoa.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton onClick={() => navigate(`/pessoas/detalhe/${pessoa.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{pessoa.nomeCompleto}</TableCell>
                <TableCell>{pessoa.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && <caption>{Environment.LISTAGEM_VAZIA}</caption>}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}

            {totalCount != 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    onChange={(_, newPage) => setSerachParams({ busca, pagina: newPage.toString() }, { replace: true })}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
