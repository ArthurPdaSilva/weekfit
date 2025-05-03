export enum GymOptions {
  Empty = 0,
  Chest = 1,
  Back = 2,
  Shoulder = 3,
  Trapezius = 4,
  Biceps = 5,
  Triceps = 6,
  Forearm = 7,
  Posterior = 8,
  Gluteus = 9,
  Calf = 10,
  FullLeg = 11,
  FullArm = 12,
  Abdomen = 13,
  Lumbar = 14,
}

export const GymOptionLabels: Record<GymOptions, string> = {
  [GymOptions.Empty]: "Vazio",
  [GymOptions.Chest]: "Peito",
  [GymOptions.Back]: "Costas",
  [GymOptions.Shoulder]: "Ombro",
  [GymOptions.Trapezius]: "Trapézio",
  [GymOptions.Biceps]: "Bíceps",
  [GymOptions.Triceps]: "Tríceps",
  [GymOptions.Forearm]: "Antebraço",
  [GymOptions.Posterior]: "Posterior",
  [GymOptions.Gluteus]: "Glúteo",
  [GymOptions.Calf]: "Panturrilha",
  [GymOptions.FullLeg]: "Perna (completa)",
  [GymOptions.FullArm]: "Braço (completo)",
  [GymOptions.Abdomen]: "Abdômen",
  [GymOptions.Lumbar]: "Lombar",
};

export type WeeklyWorkout = {
  id?: number;
  position: number;
  userId: number;
  sunday: GymOptions;
  monday: GymOptions;
  tuesday: GymOptions;
  wednesday: GymOptions;
  thursday: GymOptions;
  friday: GymOptions;
  saturday: GymOptions;
};
