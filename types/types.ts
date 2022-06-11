interface HabitType {
  habitId: string;
  name: string;
  color: string;
  gridItems: GridItemType[];
}

interface GridItemType {
  date: string;
  gridId: string;
  completed: boolean;
}

export type { HabitType, GridItemType };
