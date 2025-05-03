import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export const Header = () => {
  const appContext = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1B1C1D" }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="Week Fit"
            style={{ marginRight: "0.5em" }}
          />
          <Typography variant="h6" component="div">
            Week Fit
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {appContext?.user && (
          <>
            <Typography variant="body1" sx={{ marginRight: 2, color: "white" }}>
              {appContext.user.name}
            </Typography>
            <Button color="inherit" onClick={() => appContext?.logout()}>
              Sair
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
