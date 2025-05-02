export enum Days {
  Segunda = "Segunda",
  Terca = "Terça",
  Quarta = "Quarta",
  Quinta = "Quinta",
  Sexta = "Sexta",
  Sabado = "Sábado",
  Domingo = "Domingo",
}

export enum GymOptions {
  Peito = "Peito",
  Costas = "Costas",
  Ombro = "Ombro",
  Trapezio = "Trapézio",
  Biceps = "Bíceps",
  Triceps = "Tríceps",
  Antebraco = "Antebraço",
  Posterior = "Posteior",
  Gluteo = "Glúteo",
  Panturrilha = "Panturrilha",
  PernaCompleta = "Perna (completa)",
  BracoCompleto = "Braço (completo)",
  Abdomen = "Abdômen",
  Lombar = "Lombar",
  Vazio = "Vazio",
}

export type WeeklyWorkoutRow = {
  id: number;
  UserId: string;
  [Days.Domingo]: GymOptions;
  [Days.Segunda]: GymOptions;
  [Days.Terca]: GymOptions;
  [Days.Quarta]: GymOptions;
  [Days.Quinta]: GymOptions;
  [Days.Sexta]: GymOptions;
  [Days.Sabado]: GymOptions;
};
