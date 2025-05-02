import { MenuItem, Select, SelectChangeEvent, TableCell } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";

type Props = {
  value: string;
  id: number;
};

export default function Cell({ value, id }: Props) {
  const appContext = useContext(AuthContext);

  const gymOptions = [
    { key: "pt", value: "Peito", label: "Peito" },
    { key: "ct", value: "Costas", label: "Costas" },
    { key: "ob", value: "Ombro", label: "Ombro" },
    { key: "tpz", value: "Trapézio", label: "Trapézio" },
    { key: "bc", value: "Bíceps", label: "Bíceps" },
    { key: "tc", value: "Tríceps", label: "Tríceps" },
    { key: "ay", value: "Antebraço", label: "Antebraço" },
    { key: "ptt", value: "Posteior", label: "Posteior" },
    { key: "gt", value: "Glúteo", label: "Glúteo" },
    { key: "ptr", value: "Panturrilha", label: "Panturrilha" },
    { key: "prn", value: "Perna (completa)", label: "Perna (completa)" },
    { key: "bcc", value: "Braço (completo)", label: "Braço (completo)" },
    { key: "abd", value: "Abdômen", label: "Abdômen" },
    { key: "lbr", value: "Lombar", label: "Lombar" },
  ];

  const onUpdate = async (newValue: string) => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${appContext?.token}`;
    await api.put(`/update-table/${id}`, { name: newValue });
  };

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    onUpdate(newValue);
  };

  return (
    <TableCell>
      <Select
        value={value || ""}
        displayEmpty
        fullWidth
        onChange={handleChange}
        size="small"
      >
        <MenuItem value="" disabled>
          -
        </MenuItem>
        {gymOptions.map((opt) => (
          <MenuItem key={opt.key} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </TableCell>
  );
}
