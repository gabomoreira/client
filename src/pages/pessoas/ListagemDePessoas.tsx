import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSerachParams] = useSearchParams();
  const { debounce } = useDebounce();
  const [pessoas, setPessoas] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setPessoas(result.data);
          setTotalCount(result.totalCount);
        }
      });
    });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      title="Listagem de Pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) => setSerachParams({ busca: texto }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        {isLoading ? (
          'Carregando...'
        ) : (
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
                  <TableCell>Ações</TableCell>
                  <TableCell>{pessoa.nomeCompleto}</TableCell>
                  <TableCell>{pessoa.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
