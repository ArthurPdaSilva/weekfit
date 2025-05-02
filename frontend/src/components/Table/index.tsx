import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CellType from "../../@types/CellType";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";
import Cell from "../Cell";

export default function TableContainerComponent() {
  const appContext = useContext(AuthContext);
  const [rowOne, setRowOne] = useState<CellType[]>([]);
  const [rowTwo, setRowTwo] = useState<CellType[]>([]);
  const [rowThree, setRowThree] = useState<CellType[]>([]);
  const [rowFour, setRowFour] = useState<CellType[]>([]);

  if (appContext == null) return <></>;

  useEffect(() => {
    async function loadingCells() {
      if (!appContext) return;

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${appContext.token}`;
      const response = await api.get(`/cells/${appContext.user?.id}`);
      const cells = response.data as CellType[];
      cells.sort((a, b) => (a.id as number) - (b.id as number));
      setRowOne(cells.slice(0, 7));
      setRowTwo(cells.slice(7, 14));
      setRowThree(cells.slice(14, 21));
      setRowFour(cells.slice(21, 28));
    }
    loadingCells();
  }, [appContext]);

  const days = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {days.map((day) => (
                <TableCell key={day} align="center">
                  <Typography fontWeight="bold">{day}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[rowOne, rowTwo, rowThree, rowFour].map((row, i) => (
              <TableRow key={i}>
                {row.map((cell) => (
                  <Cell
                    id={cell.id as number}
                    value={cell.name as string}
                    key={cell.id}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
