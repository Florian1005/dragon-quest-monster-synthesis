<template>
  <UModal
    :open="modelValue"
    @update:open="$emit('update:modelValue', $event)"
    class="sm:max-w-7xl"
  >
    <template #content>
      <div
        v-if="monster"
        class="flex flex-col h-[85vh] bg-white dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden"
      >
        <div
          class="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800"
        >
          <div class="flex items-center gap-4">
            <img
              :src="resolvePath(monster.image)"
              class="w-10 h-10 object-contain"
              v-if="monster.image"
            />
            <h2 class="text-2xl font-bold">{{ monster.name }}</h2>
            <span
              class="px-2 py-0.5 rounded bg-primary-100 text-primary-700 text-sm font-bold"
            >
              Rang {{ monster.rank }}
            </span>
          </div>
          <button
            @click="$emit('update:modelValue', false)"
            class="text-3xl hover:text-primary"
          >
            &times;
          </button>
        </div>

        <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
          <!--         <aside
            class="w-full md:w-80 border-r border-gray-100 dark:border-gray-800 p-4 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50"
          >
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <span class="w-1.5 h-6 bg-primary rounded-full"></span>
              Matériaux requis
            </h3>
            <div
              v-if="Object.keys(requirements).length === 0"
              class="text-sm text-gray-500 italic"
            >
              Monstre de base.
            </div>
            <div
              v-for="(count, id) in requirements"
              :key="id"
              class="flex items-center justify-between border-b dark:border-gray-800 py-3 last:border-0"
            >
              <div class="flex items-center gap-3">
                <img
                  v-if="getMonster(id)?.image"
                  :src="resolvePath(getMonster(id)?.image!)"
                  class="w-10 h-10 object-contain bg-white rounded shadow-sm"
                />
                <div class="flex flex-col">
                  <span class="text-sm font-medium">{{
                    getMonster(id)?.name || id
                  }}</span>
                  <span class="text-[10px] text-gray-400 font-mono"
                    >ID: {{ id }}</span
                  >
                </div>
              </div>
              <span class="font-black text-primary px-2">x{{ count }}</span>
            </div>
          </aside>
 -->
          <main
            class="flex-1 flex flex-col p-4 bg-white dark:bg-gray-900 overflow-hidden"
          >
            <UTabs :items="tabs" class="w-full h-full flex flex-col">
              <template #genealogy>
                <div
                  class="flex-1 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl relative overflow-hidden mt-4 h-[55vh]"
                >
                  <FusionTree :monster="monster" />
                </div>
              </template>

              <template #usages>
                <div
                  class="space-y-3 p-2 h-[55vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200"
                >
                  <div
                    v-for="usage in usages"
                    :key="usage.resultId"
                    class="flex items-center gap-2 p-3 border rounded-xl bg-gray-50/50 dark:bg-gray-800/50 group"
                  >
                    <div class="flex items-center gap-1 flex-1">
                      <div
                        v-if="usage.partnersIds.length === 0"
                        class="text-[10px] text-gray-400 uppercase font-bold px-2"
                      >
                        Solo
                      </div>
                      <div
                        v-for="(pId, idx) in usage.partnersIds"
                        :key="idx"
                        class="flex items-center gap-2 bg-white dark:bg-gray-900 p-1.5 rounded-lg border dark:border-gray-700 shadow-sm min-w-[120px]"
                      >
                        <img
                          :src="resolvePath(getMonster(pId)?.image!)"
                          class="w-8 h-8 object-contain"
                        />
                        <div class="flex flex-col min-w-0">
                          <span
                            class="text-[10px] font-bold text-primary leading-none"
                            >{{ getMonster(pId)?.rank }}</span
                          >
                          <span class="text-xs font-medium truncate">{{
                            getMonster(pId)?.name || "???"
                          }}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      class="flex items-center justify-center px-2 text-gray-300"
                    >
                      <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                    </div>

                    <div
                      class="flex items-center gap-2 bg-primary/5 p-1.5 rounded-lg border border-primary/20 min-w-[120px]"
                    >
                      <img
                        :src="resolvePath(monster?.image)"
                        class="w-8 h-8 object-contain opacity-60"
                      />
                      <div class="flex flex-col">
                        <span
                          class="text-[10px] font-black text-primary/40 leading-none"
                          >{{ monster?.rank }}</span
                        >
                        <span
                          class="text-xs font-bold text-primary/60 truncate italic"
                          >{{ monster?.name }}</span
                        >
                      </div>
                    </div>

                    <div class="px-2">
                      <UIcon
                        name="i-heroicons-arrow-long-right"
                        class="w-5 h-5 text-primary animate-pulse-slow"
                      />
                    </div>

                    <div
                      class="flex items-center gap-3 bg-primary/10 p-2 rounded-lg border border-primary/30 min-w-[150px] shadow-sm ring-1 ring-primary/20"
                    >
                      <img
                        :src="resolvePath(getMonster(usage.resultId)?.image!)"
                        class="w-10 h-10 object-contain"
                      />
                      <div class="flex flex-col">
                        <span
                          class="text-[10px] font-black text-primary leading-none"
                        >
                          {{ getMonster(usage.resultId)?.rank }}
                        </span>
                        <p class="font-bold text-sm truncate">
                          {{ getMonster(usage.resultId)?.name }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="usages.length === 0"
                    class="flex flex-col items-center justify-center py-20 text-gray-400"
                  >
                    <UIcon
                      name="i-heroicons-beaker"
                      class="w-12 h-12 opacity-20 mb-2"
                    />
                    <p class="italic text-sm">
                      Aucune fusion trouvée pour ce monstre.
                    </p>
                  </div>
                </div>
              </template>
            </UTabs>
          </main>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useAsset } from "~/composable/useAsset";
import { useMonsters } from "~/composable/useMonster";
import type { Monster } from "~/interfaces/monster.interface";
import type { Recipe } from "~/interfaces/recipe.interface";

const props = defineProps<{
  monster: Monster | null;
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);
const config = useRuntimeConfig();
const { getMonster } = useMonsters();
const { resolvePath } = useAsset();
const recipes = ref<Recipe[]>([]);

const tabs = [
  { label: "Généalogie", slot: "genealogy" },
  { label: "Utilisé pour...", slot: "usages" },
];

onMounted(async () => {
  const baseUrl = config.app.baseURL;
  const data = await fetch(`${baseUrl}/data/dqmj3pro/recipes.json`).then((r) =>
    r.json(),
  );
  recipes.value = data;
});

const usages = computed(() => {
  if (!props.monster || recipes.value.length === 0) return [];

  // On filtre toutes les recettes où notre monstre est présent dans le tableau 'ingredients'
  return recipes.value
    .filter((r) => r.ingredients.includes(props.monster!.id))
    .map((r) => {
      // On crée une copie de la liste des ingrédients
      const allIngredients = [...r.ingredients];

      // On trouve l'index de notre monstre actuel pour l'enlever UNE seule fois
      // (important si la fusion demande deux fois le même monstre)
      const index = allIngredients.indexOf(props.monster!.id);
      if (index > -1) {
        allIngredients.splice(index, 1);
      }

      return {
        resultId: r.result,
        partnersIds: allIngredients,
      };
    });
});
const requirements = computed(() => {
  if (!props.monster || recipes.value.length === 0) return {};
  const counts: Record<string, number> = {};
  const MAX_DEPTH = 3;

  function dfs(id: string, depth = 0) {
    if (depth >= MAX_DEPTH) {
      counts[id] = (counts[id] || 0) + 1;
      return;
    }
    const recipe = recipes.value.find((r) => r.result === id);
    if (!recipe) {
      counts[id] = (counts[id] || 0) + 1;
      return;
    }
    recipe.ingredients.forEach((ingredientId) => dfs(ingredientId, depth + 1));
  }

  dfs(props.monster.id);
  return counts;
});
</script>
