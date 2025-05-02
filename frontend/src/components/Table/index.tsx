import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Days,
  GymOptions,
  type WeeklyWorkoutRow,
} from "../../@types/WorkoutDay";

const generateFakeRow = (id: number): WeeklyWorkoutRow => {
  const getRandomWorkout = (): GymOptions =>
    Object.values(GymOptions)[
      Math.floor(Math.random() * Object.values(GymOptions).length)
    ];

  return {
    id,
    UserId: 4,
    [Days.Domingo]: getRandomWorkout(),
    [Days.Segunda]: getRandomWorkout(),
    [Days.Terca]: getRandomWorkout(),
    [Days.Quarta]: getRandomWorkout(),
    [Days.Quinta]: getRandomWorkout(),
    [Days.Sexta]: getRandomWorkout(),
    [Days.Sabado]: getRandomWorkout(),
  };
};

export default function TableContainer() {
  const [data, setData] = useState<WeeklyWorkoutRow[]>(
    Array.from({ length: 4 }, (_, i) => generateFakeRow(i + 1))
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const columns = useMemo<MRT_ColumnDef<WeeklyWorkoutRow>[]>(() => {
    return Object.values(Days).map((day) => ({
      accessorKey: day,
      header: day,
      editVariant: "select",
      editSelectOptions: Object.values(GymOptions),
      muiEditTextFieldProps: {
        select: true,
        fullWidth: true,
      },
    }));
  }, [data]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    enableRowActions: true,
    enableGlobalFilter: false,
    enableFilters: false,
    enableSorting: false,
    editDisplayMode: "cell",
    localization: {
      actions: "Ações",
      noRecordsToDisplay: "Nenhum registro encontrado",
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "1.2rem",
      },
    },

    muiTableHeadCellProps: {
      sx: {
        fontSize: "1.5rem",
        fontWeight: "bold",
      },
    },
    renderRowActions(props) {
      return (
        <IconButton
          onClick={() => {
            setData((prev) =>
              prev.filter((row) => row.id !== props.row.original.id)
            );
            toast.success("Linha removida com sucesso!");
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      );
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        sx={{ margin: "1rem" }}
        onClick={() => {
          const newRow: WeeklyWorkoutRow = {
            Domingo: GymOptions.Vazio,
            Segunda: GymOptions.Vazio,
            Terça: GymOptions.Vazio,
            Quarta: GymOptions.Vazio,
            Quinta: GymOptions.Vazio,
            Sexta: GymOptions.Vazio,
            Sábado: GymOptions.Vazio,
            UserId: 4,
            id: table.getPrePaginationRowModel().rows.length + 1,
          };
          setData((prev) => [...prev, newRow]);
        }}
      >
        Adicionar nova linha
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
}
