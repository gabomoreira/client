import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
  title: string;
  children: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  title,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(12)}
      >
        {mobile ? (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        ) : null}

        <Typography variant="h5">{title}</Typography>
      </Box>

      <Box>{children}</Box>

      <Box>Footer</Box>
    </Box>
  );
};
