import { Grid, GridColumn, Header } from "semantic-ui-react";
import HeaderContainer from "../../components/Header";
import TableContainer from "../../components/Table";

export default function Home() {
  return (
    <>
      <HeaderContainer />
      <Grid style={{ height: "100vh", width: "100%" }} verticalAlign="middle">
        <GridColumn
          style={{ width: "100%", overflowX: "auto", boxSizing: "border-box" }}
        >
          <Header size="huge" textAlign="center">
            Rotina do Campeão
          </Header>
          <TableContainer />
        </GridColumn>
      </Grid>
    </>
  );
}
