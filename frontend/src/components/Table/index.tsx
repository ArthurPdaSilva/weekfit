import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo, useState } from "react";
import { Days, GymOptions, WeeklyWorkoutRow } from "../../@types/WorkoutDay";

const generateFakeRow = (id: number): WeeklyWorkoutRow => {
  const getRandomWorkout = (): GymOptions[] => [
    Object.values(GymOptions)[
      Math.floor(Math.random() * Object.values(GymOptions).length)
    ],
  ];

  return {
    id,
    UserId: `user${id}`,
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
  const [data, _] = useState<WeeklyWorkoutRow[]>(
    Array.from({ length: 4 }, (_, i) => generateFakeRow(i + 1))
  );

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
  }, []);

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    editDisplayMode: "cell",
  });

  return <MaterialReactTable table={table} />;
}
