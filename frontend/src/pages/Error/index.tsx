import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/home"), 5000);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Página não encontrada :(
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Redirecionando para a home...
        </Typography>
      </Paper>
    </Box>
  );
}
