<script setup lang="ts">
import { ref, watch } from "vue";
import { useAsset } from "~/composable/useAsset";
import { useDataSource } from "~/composable/useDataSource";

const { resolvePath } = useAsset();
const { source, sources, setSource } = useDataSource();

const selectedSource = ref(source.value.value);
watch(selectedSource, (val) => setSource(val));

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue", "update:type", "update:rank"]);

const search = ref(props.modelValue || "");

const types = [
  { label: "Types", value: "Types", icon: null },
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

const ranks = ["Rangs", "F", "E", "D", "C", "B", "A", "S", "SS"];

const selectedType = ref(types[0]);
const selectedRank = ref("Rangs");

watch(search, (val) => emit("update:modelValue", val));

watch(selectedType, (val) => {
  const valueToEmit = val?.value === "Types" ? "" : val?.value;
  emit("update:type", valueToEmit);
});

watch(selectedRank, (val) => {
  const valueToEmit = val === "Rangs" ? "" : val;
  emit("update:rank", valueToEmit);
});
</script>

<template>
  <div
    class="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b dark:border-gray-800 py-4 mb-4 shadow-sm"
  >
    <div
      class="flex flex-wrap sm:flex-nowrap gap-2 items-center container mx-auto px-4"
    >
      <USelect
        v-model="selectedSource"
        :items="sources"
        value-key="value"
        label-key="label"
        class="order-2 flex-1 sm:order-1 sm:flex-none sm:w-40"
        size="lg"
      />

      <UInput
        v-model="search"
        placeholder="Rechercher un monstre..."
        class="order-1 w-full sm:order-2 sm:w-auto sm:flex-1"
        icon="i-heroicons-magnifying-glass"
        size="lg"
      />

      <USelect
        v-model="selectedRank"
        :items="ranks"
        class="order-3 flex-1 sm:flex-none sm:w-32"
        size="lg"
      />

      <USelectMenu
        v-model="selectedType"
        :items="types"
        class="order-4 flex-1 sm:flex-none sm:w-32"
        size="lg"
      >
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
