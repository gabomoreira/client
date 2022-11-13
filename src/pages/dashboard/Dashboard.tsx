import { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, CircularProgress, Grid, LinearProgress, Typography } from '@mui/material';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';

export const Dashboard = () => {
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);
  const [totalCountCidades, setTotalCountCidades] = useState(0);

  useEffect(() => {
    setIsLoadingPessoas(true);
    setIsLoadingCidades(true);

    PessoasService.getAll(1).then((result) => {
      setIsLoadingPessoas(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountPessoas(result.totalCount);
      }
    });

    CidadesService.getAll(1).then((result) => {
      setIsLoadingCidades(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountCidades(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBaseDePagina title={'DashBoard'} barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}>
      <Box width="100%" display="flex">
        <Grid container margin={1}>
          <Grid container item spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Pessoas
                  </Typography>

                  <Box padding={6} display="flex" alignItems="center" justifyContent="center">
                    {!isLoadingPessoas ? <Typography variant="h1">7</Typography> : <CircularProgress />}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Cidades
                  </Typography>

                  <Box padding={6} display="flex" alignItems="center" justifyContent="center">
                    {!isLoadingPessoas ? <Typography variant="h1">9</Typography> : <CircularProgress />}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
