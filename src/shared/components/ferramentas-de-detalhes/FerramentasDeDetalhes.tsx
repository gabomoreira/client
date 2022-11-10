import { Box, Button, Icon, Paper, useTheme } from '@mui/material';

interface IFerramentasDeDetalhesProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;
  mostrarBotaoApagar?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEVoltar?: () => void;
  aoClicarEmApagar?: () => void;
}

export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhesProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEVoltar = false,
  mostrarBotaoApagar = true,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEVoltar,
  aoClicarEmApagar,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {mostrarBotaoSalvar && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          Salvar
        </Button>
      )}
      {mostrarBotaoSalvarEVoltar && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvarEVoltar}
        >
          Salvar e voltar
        </Button>
      )}
      {mostrarBotaoApagar && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          Apagar
        </Button>
      )}
      {mostrarBotaoNovo && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmSalvar}
        >
          {textoBotaoNovo}
        </Button>
      )}

      {mostrarBotaoVoltar && (
        <Box flex={1} display="flex" justifyContent="end">
          <Button
            color="primary"
            disableElevation
            variant="outlined"
            startIcon={<Icon>arrow_back</Icon>}
            onClick={aoClicarEmVoltar}
          >
            Voltar
          </Button>
        </Box>
      )}
    </Box>
  );
};
