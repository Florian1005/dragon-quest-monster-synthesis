import type { Monster } from "~/interfaces/monster.interface";

export const useMonsters = () => {
  const monsters = useState<Monster[]>("monsters", () => []);

  const getMonster = (id: string) => monsters.value.find((m) => m.id === id);

  return { monsters, getMonster };
};
