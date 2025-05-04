import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, useMediaQuery } from "@mui/material";
import {
  type MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { OperationResult } from "../@types/OperationResult";
import {
  GymOptionLabels,
  GymOptions,
  type WeeklyWorkout,
  dayLabels,
  gymOptions,
} from "../@types/WorkoutDay";
import { AuthContext } from "../contexts/auth";
import api from "../services/api";
import { ExcelButton } from "./ExcelButton";

export const Table = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const handleRowEdit = async (row: WeeklyWorkout) => {
    const response = await api
      .put<OperationResult<null>>("/WeeklyWorkout/Put", row)
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

    setWeeklyWorkoutRows((prev) =>
      prev.map((r) => (r.id === row.id ? row : r))
    );

    toast.success(message);
  };

  const createDayColumn = (
    day: keyof WeeklyWorkout
  ): MRT_ColumnDef<WeeklyWorkout> => ({
    accessorFn: (row) => row[day],
    header: dayLabels[day],
    enableHiding: true,
    editSelectOptions: gymOptions,
    muiEditTextFieldProps: ({ row }) => ({
      select: true,
      fullWidth: true,
      onChange: (e) => {
        const value = e.target.value as unknown as GymOptions;
        const newRow = { ...row.original, [day]: value };
        handleRowEdit(newRow);
      },
    }),
    editVariant: "select",
    Cell: ({ row }) => {
      const value = row.original[day] as GymOptions;
      return <span>{GymOptionLabels[value]}</span>;
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const columns = useMemo<MRT_ColumnDef<WeeklyWorkout>[]>(
    () =>
      (
        [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ] as (keyof WeeklyWorkout)[]
      ).map(createDayColumn),
    [weeklyWorkoutRows]
  );

  const handleAddRow = async () => {
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
    };

    const response = await api
      .post<OperationResult<number | null>>("/WeeklyWorkout/Post", newRow)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return err.response.data as OperationResult<null>;
      });

    const { data, isError, message } = response;

    if (isError || !data) {
      toast.error(message);
      return;
    }

    newRow.id = data;

    setWeeklyWorkoutRows((prev) => [...prev, newRow]);
    toast.success(message);
  };

  const handleDeleteRow = async (row: WeeklyWorkout) => {
    const newData = weeklyWorkoutRows.filter((r) => r.id !== row.id);

    const response = await api
      .delete<OperationResult<null>>("/WeeklyWorkout/Delete", {
        params: {
          rowId: row.id,
        },
      })
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
    toast.success(message);
  };

  const table = useMaterialReactTable({
    columns,
    data: weeklyWorkoutRows,
    enableEditing: true,
    enableRowActions: true,
    enableGlobalFilter: false,
    enableFilters: false,
    enableSorting: false,
    editDisplayMode: isMobile ? "modal" : "cell",
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
    renderToolbarInternalActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <ExcelButton data={weeklyWorkoutRows} />
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        sx={{ margin: "1rem" }}
        onClick={handleAddRow}
      >
        Adicionar nova linha
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};
