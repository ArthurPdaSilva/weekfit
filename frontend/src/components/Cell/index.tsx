import { useContext } from "react";
import { Dropdown, TableCell } from "semantic-ui-react";
import { AuthContext } from "../../contexts/auth";
import api from "../../services/api";

type Props = {
  value: string;
  id: number;
};

export default function Cell({ value, id }: Props) {
  const appContext = useContext(AuthContext);
  const gymOptions = [
    { key: "pt", value: "Peito", text: "Peito" },
    { key: "ct", value: "Costas", text: "Costas" },
    { key: "ob", value: "Ombro", text: "Ombro" },
    { key: "tpz", value: "Trapézio", text: "Trapézio" },
    { key: "bc", value: "Bíceps", text: "Bíceps" },
    { key: "tc", value: "Tríceps", text: "Tríceps" },
    { key: "ay", value: "Antebraço", text: "Antebraço" },
    { key: "ptt", value: "Posteior", text: "Posteior" },
    { key: "gt", value: "Glúteo", text: "Glúteo" },
    { key: "ptr", value: "Panturrilha", text: "Panturrilha" },
    { key: "prn", value: "Perna (completa)", text: "Perna (completa)" },
    { key: "bcc", value: "Braço (completo)", text: "Braço (completo)" },
    { key: "abd", value: "Abdômen", text: "Abdômen" },
    { key: "lbr", value: "Lombar", text: "Lombar" },
  ];

  const onUpdate = async function (value: string) {
    console.log(value);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${appContext?.token}`;
    await api.put(`/update-table/${id}`, { name: value });
  };

  return (
    <TableCell key={id}>
      <Dropdown
        placeholder="-"
        selection
        options={gymOptions}
        defaultValue={value}
        onChange={(_, value) => onUpdate(value.value as string)}
      />
    </TableCell>
  );
}
