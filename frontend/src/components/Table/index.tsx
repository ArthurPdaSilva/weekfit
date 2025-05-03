import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import {
  type MRT_ColumnDef,
  type MRT_TableInstance,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { OperationResult } from "../../@types/OperationResult";
import {
  GymOptionLabels,
  GymOptions,
  type WeeklyWorkout,
} from "../../@types/WorkoutDay";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";

export default function TableContainer() {
  const appContext = useContext(AuthContext);
  const [weeklyWorkoutRows, setWeeklyWorkoutRows] = useState<WeeklyWorkout[]>(
    []
  );

  if (!appContext) return null;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api
        .get<OperationResult<WeeklyWorkout[]>>("/WeeklyWorkout/Get")
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        });

      if (!response) return;
      const { data, isError, message } = response;
      if (isError || !data) {
        toast.error(message);
        return;
      }

      setWeeklyWorkoutRows(data);
    };

    fetchData();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const columns = useMemo<MRT_ColumnDef<WeeklyWorkout>[]>(
    () => [
      {
        accessorFn: (row) => row.sunday,
        header: "Domingo",
        enableHiding: true,
        Cell: ({ row }) => {
          const value = row.original.sunday;
          return <span>{GymOptionLabels[value]}</span>;
        },
      },
      {
        accessorFn: (row) => row.monday,
        header: "Segunda",
        enableHiding: true,
        Cell: ({ row }) => {
          const value = row.original.monday;
          return <span>{GymOptionLabels[value]}</span>;
        },
      },
      {
        accessorFn: (row) => row.tuesday,
        header: "Terça",
        enableHiding: true,
        Cell: ({ row }) => {
          const value = row.original.tuesday;
          return <span>{GymOptionLabels[value]}</span>;
        },
      },
      {
        accessorFn: (row) => row.wednesday,
        header: "Quarta",
        enableHiding: true,
        Cell: ({ row }) => {
          const value = row.original.wednesday;
          return <span>{GymOptionLabels[value]}</span>;
        },
      },
      {
        accessorFn: (row) => row.thursday,
        header: "Quinta",
        enableHiding: true,
        Cell: ({ row }) => {
          const value = row.original.thursday;
          return <span>{GymOptionLabels[value]}</span>;
        },
      },
      {
        accessorFn: (row) => row.friday,
        header: "Sexta",
        enableHiding: true,
        Cell: ({ row }) => {
          const value = row.original.friday;
          return <span>{GymOptionLabels[value]}</span>;
        },
      },
      {
        accessorFn: (row) => row.saturday,
        header: "Sábado",
        enableHiding: true,
        Cell: ({ row }) => {
          const value = row.original.saturday;
          return <span>{GymOptionLabels[value]}</span>;
        },
      },
    ],
    [weeklyWorkoutRows]
  );

  const handleAddRow = async (table: MRT_TableInstance<WeeklyWorkout>) => {
    if (!appContext.user || !appContext.user.id) return;

    const newRow: WeeklyWorkout = {
      sunday: GymOptions.Empty,
      monday: GymOptions.Empty,
      tuesday: GymOptions.Empty,
      wednesday: GymOptions.Empty,
      thursday: GymOptions.Empty,
      friday: GymOptions.Empty,
      saturday: GymOptions.Empty,
      userId: appContext.user.id,
      position: table.getPrePaginationRowModel().rows.length + 1,
    };

    const newData: WeeklyWorkout[] = [...weeklyWorkoutRows, newRow];

    const response = await api
      .post<OperationResult<null>>("/WeeklyWorkout/Post", newData)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return err.response.data as OperationResult<null>;
      });

    const { isError, message } = response;

    if (isError) {
      toast.error(message);
      return;
    }

    setWeeklyWorkoutRows((prev) => [...prev, newRow]);
    toast.success("Linha adicionada com sucesso!");
  };

  const handleDeleteRow = async (row: WeeklyWorkout) => {
    const newData = weeklyWorkoutRows.filter(
      (r) => r.position !== row.position
    );

    const response = await api
      .post<OperationResult<null>>("/WeeklyWorkout/Post", newData)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return err.response.data as OperationResult<null>;
      });

    const { isError, message } = response;

    if (isError) {
      toast.error(message);
      return;
    }

    setWeeklyWorkoutRows(newData);
    toast.success("Linha removida com sucesso!");
  };

  const table = useMaterialReactTable({
    columns,
    data: weeklyWorkoutRows,
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
    renderRowActions({ row }) {
      return (
        <IconButton onClick={() => handleDeleteRow(row.original)}>
          <DeleteIcon color="error" />
        </IconButton>
      );
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        sx={{ margin: "1rem" }}
        onClick={() => handleAddRow(table)}
      >
        Adicionar nova linha
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
}
