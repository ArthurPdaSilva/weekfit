import { Grid } from "@mui/material";
import HeaderContainer from "../../components/Header";

export default function Home() {
  return (
    <>
      <HeaderContainer />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh", width: "100%" }}
      >
        {/* <Grid
          item
          xs={12}
          sx={{ width: "100%", overflowX: "auto", boxSizing: "border-box" }}
        >
          <Typography variant="h2" align="center" gutterBottom>
            Rotina do Campeão
          </Typography>
          <TableContainer />
        </Grid> */}
      </Grid>
    </>
  );
}
