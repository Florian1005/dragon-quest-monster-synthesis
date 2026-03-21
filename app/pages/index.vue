<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useMonsters } from "../composable/useMonster";
import type { Monster } from "../interfaces/monster.interface";
import { useRecipes } from "~/composable/useRecipes";

const config = useRuntimeConfig();
const { monsters } = useMonsters();
const { recipes } = useRecipes();

const search = ref("");
const selectedType = ref("");
const selectedRank = ref("");
const selected = ref<Monster | null>(null);
const isOpen = ref(false);

onMounted(async () => {
  const baseUrl = config.app.baseURL;
  monsters.value = await fetch(
    `${baseUrl}/data/dqmj3pro/monsters_list.json`,
  ).then((r) => r.json());
  recipes.value = await fetch(`${baseUrl}data/dqmj3pro/recipes.json`).then(
    (r) => r.json(),
  );
});

function selectMonster(monster: Monster) {
  selected.value = monster;
  isOpen.value = true;
}

const filtered = computed(() => {
  return monsters.value.filter((m) => {
    const matchSearch = m.name
      ?.toLowerCase()
      .includes(search.value.toLowerCase());

    const matchType = !selectedType.value || m.type === selectedType.value;
    const matchRank = !selectedRank.value || m.rank === selectedRank.value;

    return matchSearch && matchType && matchRank;
  });
});
</script>

<template>
  <div class="p-4">
    <MonsterSearch
      v-model="search"
      @update:type="selectedType = $event"
      @update:rank="selectedRank = $event"
    />

    <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
      <MonsterCard
        v-for="m in filtered"
        :key="m.id"
        :monster="m"
        @click="selectMonster(m)"
      />
    </div>

    <MonsterDrawer :monster="selected" v-model="isOpen" />
  </div>
</template>
