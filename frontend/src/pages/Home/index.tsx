import { Alert, Box, Typography } from "@mui/material";
import HeaderContainer from "../../components/Header";
import TableContainer from "../../components/Table";

export default function Home() {
  return (
    <>
      <HeaderContainer />
      <Box
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" align="center" mb={2}>
          Week Fit
        </Typography>
        <TableContainer />
        <Alert sx={{ mt: 2 }} severity="info">
          <Typography variant="body1">
            Clique duas vezes em uma célula para editar
          </Typography>
        </Alert>
      </Box>
    </>
  );
}
