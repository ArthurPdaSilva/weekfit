import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/home"), 3000);
  }, []);

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
      <Box
        sx={{
          padding: 2,
          borderRadius: 1,
          backgroundColor: "#F8F8F9",
          gap: 2,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 0 0 1px rgba(34,36,38,.22) inset,0 0 0 0 transparent",
        }}
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",
            borderRadius: 1,
            width: "50dvw",
            boxShadow: "0 0 0 1px rgba(34,36,38,.22) inset,0 0 0 0 transparent",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <CircularProgress color="inherit" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography fontWeight="bold">Página não encontrada</Typography>
            <Typography>Redirecionando para a home...</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
