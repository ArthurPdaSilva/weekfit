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
  GymOptionLabels,
  GymOptions,
  type WeeklyWorkout,
} from "../../@types/WorkoutDay";

export default function TableContainer() {
  const [data, setData] = useState<WeeklyWorkout[]>([]);
  console.log(data);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const columns = useMemo<MRT_ColumnDef<WeeklyWorkout>[]>(() => {
    return Object.entries(Days).map(([key, label]) => ({
      accessorKey: key,
      header: label,
      editVariant: "select",
      editSelectOptions: Object.values(GymOptions)
        .filter((opt) => typeof opt === "number")
        .map((option) => ({
          label: GymOptionLabels[option as GymOptions],
          value: option,
        })),
      muiEditTextFieldProps: {
        select: true,
        fullWidth: true,
      },
      Cell: ({ cell }) => GymOptionLabels[cell.getValue() as GymOptions],
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
              prev.filter((row) => row.Position !== props.row.original.Position)
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
          const newRow: WeeklyWorkout = {
            Sunday: GymOptions.Empty,
            Monday: GymOptions.Empty,
            Tuesday: GymOptions.Empty,
            Wednesday: GymOptions.Empty,
            Thursday: GymOptions.Empty,
            Friday: GymOptions.Empty,
            Saturday: GymOptions.Empty,
            UserId: 4,
            Position: table.getPrePaginationRowModel().rows.length + 1,
          };
          setData((prev) => [...prev, newRow]);
          toast.success("Linha adicionada com sucesso!");
        }}
      >
        Adicionar nova linha
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
}
