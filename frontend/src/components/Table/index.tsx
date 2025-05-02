import { useContext, useEffect, useState } from "react";
import { Button, Table, TableRow } from "semantic-ui-react";
import CellType from "../../@types/CellType";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";
import Cell from "../Cell";

export default function TableContainer() {
  const appContext = useContext(AuthContext);
  const [rowOne, setRowOne] = useState<CellType[] | []>([]);
  const [rowTwo, setRowTwo] = useState<CellType[] | []>([]);
  const [rowThree, setRowThree] = useState<CellType[] | []>([]);
  const [rowFour, setRowFour] = useState<CellType[] | []>([]);

  useEffect(() => {
    async function loadingCells() {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${appContext?.token}`;
      await api.get(`/cells/${appContext?.user?.tableId}`).then((value) => {
        const cells = value.data as CellType[];
        cells.sort((a, b) => (a.id as number) - (b.id as number));
        setRowOne([
          cells[0],
          cells[1],
          cells[2],
          cells[3],
          cells[4],
          cells[5],
          cells[6],
        ]);
        setRowTwo([
          cells[7],
          cells[8],
          cells[9],
          cells[10],
          cells[11],
          cells[12],
          cells[13],
        ]);
        setRowThree([
          cells[14],
          cells[15],
          cells[16],
          cells[17],
          cells[18],
          cells[19],
          cells[20],
        ]);
        setRowFour([
          cells[21],
          cells[22],
          cells[23],
          cells[24],
          cells[25],
          cells[26],
          cells[27],
        ]);
      });
    }
    loadingCells();
  }, []);

  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Domingo</Table.HeaderCell>
          <Table.HeaderCell>Segunda</Table.HeaderCell>
          <Table.HeaderCell>Terca</Table.HeaderCell>
          <Table.HeaderCell>Quarta</Table.HeaderCell>
          <Table.HeaderCell>Quinta</Table.HeaderCell>
          <Table.HeaderCell>Sexta</Table.HeaderCell>
          <Table.HeaderCell>Sábado</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <TableRow>
          {rowOne.map((e) => (
            <Cell id={e.id as number} value={e.name as string} key={e.id} />
          ))}
        </TableRow>
        <TableRow>
          {rowTwo.map((e) => (
            <Cell id={e.id as number} value={e.name as string} key={e.id} />
          ))}
        </TableRow>
        <TableRow>
          {rowThree.map((e) => (
            <Cell id={e.id as number} value={e.name as string} key={e.id} />
          ))}
        </TableRow>
        <TableRow>
          {rowFour.map((e) => (
            <Cell id={e.id as number} value={e.name as string} key={e.id} />
          ))}
        </TableRow>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan="7">
            <Button floated="right" color="red">
              <a
                href="https://www.instagram.com/arthurp_sillva/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                Instagram do criador :)
              </a>
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}
