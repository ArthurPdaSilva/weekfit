import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { IconButton, Tooltip } from "@mui/material";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { GymOptionLabels, type WeeklyWorkout } from "../@types/WorkoutDay";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "treinos",
});

interface ExportButtonProps {
  data: WeeklyWorkout[];
}

export const ExcelButton = ({ data }: ExportButtonProps) => {
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(
      data.map((row) => {
        const { id, userId, ...rest } = row;
        return {
          ...rest,
          sunday: GymOptionLabels[rest.sunday],
          monday: GymOptionLabels[rest.monday],
          tuesday: GymOptionLabels[rest.tuesday],
          wednesday: GymOptionLabels[rest.wednesday],
          thursday: GymOptionLabels[rest.thursday],
          friday: GymOptionLabels[rest.friday],
          saturday: GymOptionLabels[rest.saturday],
        };
      })
    );
    download(csvConfig)(csv);
  };

  return (
    <Tooltip title="Exportar para Excel">
      <IconButton onClick={handleExportData}>
        <FileDownloadIcon />
      </IconButton>
    </Tooltip>
  );
};
