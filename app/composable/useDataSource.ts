export interface DataSource {
  label: string;
  value: string;
  monstersFile: string;
  recipesFile: string;
}

export const DATA_SOURCES: DataSource[] = [
  {
    label: "DQMJ3 Pro",
    value: "dqmj3pro",
    monstersFile: "monsters_list.json",
    recipesFile: "recipes.json",
  },
  {
    label: "DQM2",
    value: "dqm2",
    monstersFile: "monster_list.json",
    recipesFile: "recipes.json",
  },
];

export const useDataSource = () => {
  const source = useState<DataSource>("data-source", () => DATA_SOURCES[0]!);

  const setSource = (value: string) => {
    const found = DATA_SOURCES.find((s) => s.value === value);
    if (found) source.value = found;
  };

  return { source, sources: DATA_SOURCES, setSource };
};
