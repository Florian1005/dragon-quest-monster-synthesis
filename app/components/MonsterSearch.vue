<script setup lang="ts">
import { ref, watch } from "vue";
import { useAsset } from "~/composable/useAsset";

const { resolvePath } = useAsset();

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue", "update:type", "update:rank"]);

const search = ref(props.modelValue || "");

const types = [
  { label: "Tous les types", value: "Tous les types", icon: null },
  { label: "Gluant", value: "gluant", icon: "/img/dqmj3pro/types/gluant.png" },
  { label: "Dragon", value: "dragon", icon: "/img/dqmj3pro/types/dragon.png" },
  {
    label: "Matériel",
    value: "materiel",
    icon: "/img/dqmj3pro/types/materiel.png",
  },
  { label: "Démon", value: "demon", icon: "/img/dqmj3pro/types/demon.png" },
  { label: "Mort-vivant", value: "mv", icon: "/img/dqmj3pro/types/mv.png" },
  {
    label: "Corrompu",
    value: "corrompu",
    icon: "/img/dqmj3pro/types/corrompu.png",
  },
  {
    label: "Inconnu",
    value: "inconnu",
    icon: "/img/dqmj3pro/types/inconnu.png",
  },
];

const ranks = ["Tous les rangs", "F", "E", "D", "C", "B", "A", "S", "SS"];

const selectedType = ref(types[0]);
const selectedRank = ref("Tous les rangs");

watch(search, (val) => emit("update:modelValue", val));

watch(selectedType, (val) => {
  const valueToEmit = val?.value === "Tous les types" ? "" : val?.value;
  emit("update:type", valueToEmit);
});

watch(selectedRank, (val) => {
  const valueToEmit = val === "Tous les rangs" ? "" : val;
  emit("update:rank", valueToEmit);
});
</script>

<template>
  <div
    class="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b dark:border-gray-800 py-4 mb-4 shadow-sm"
  >
    <div class="flex gap-2 items-center container mx-auto px-4">
      <UInput
        v-model="search"
        placeholder="Rechercher un monstre..."
        class="flex-1"
        icon="i-heroicons-magnifying-glass"
        size="lg"
      />

      <USelect v-model="selectedRank" :items="ranks" class="w-32" size="lg" />

      <USelectMenu v-model="selectedType" :items="types" class="w-56" size="lg">
        <template #leading>
          <img
            v-if="selectedType?.icon"
            :src="resolvePath(selectedType?.icon)"
            class="w-5 h-5 object-contain"
          />
        </template>

        <template #item-label="{ item }">
          <div class="flex items-center gap-2">
            <img
              v-if="item.icon"
              :src="resolvePath(item.icon)"
              class="w-5 h-5 object-contain"
            />
            <span>{{ item.label }}</span>
          </div>
        </template>
      </USelectMenu>
    </div>
  </div>
</template>
