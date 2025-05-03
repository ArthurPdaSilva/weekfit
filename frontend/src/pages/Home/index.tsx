import { Alert, Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";

export default function Home() {
  return (
    <>
      <Header />
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
        <Table />
        <Alert sx={{ mt: 2 }} severity="info">
          <Typography variant="body1">
            Clique duas vezes em uma célula para editar
          </Typography>
        </Alert>
      </Box>
    </>
  );
}
