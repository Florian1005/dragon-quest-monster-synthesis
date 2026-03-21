<template>
  <UCard
    @click="$emit('click')"
    class="relative cursor-pointer hover:scale-105 transition overflow-hidden group"
  >
    <div
      class="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded text-[10px] font-black text-white shadow-sm bg-gray-800/80 backdrop-blur-sm ring-1 ring-white/20"
      :class="getRankColor(monster.rank)"
    >
      {{ monster.rank }}
    </div>

    <div
      class="absolute top-1 right-1 z-10 w-6 h-6 p-1 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm ring-1 ring-black/5"
    >
      <img
        :src="resolvePath(`/img/dqmj3pro/types/${monster.type}.png`)"
        :alt="monster.type"
        class="w-full h-full object-contain"
        @error="handleIconError"
      />
    </div>

    <div
      class="aspect-square flex items-center justify-center p-2 bg-gray-50/50 dark:bg-gray-900/50 rounded-lg"
    >
      <img
        :src="resolvePath(monster.image)"
        :alt="monster.name"
        class="w-full h-24 object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all"
      />
    </div>

    <div
      class="text-center text-xs font-bold mt-2 truncate text-gray-700 dark:text-gray-200"
    >
      {{ monster.name }}
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useAsset } from "~/composable/useAsset";
import type { Monster } from "~/interfaces/monster.interface";

defineProps<{
  monster: Monster;
}>();

defineEmits(["click"]);
const { resolvePath } = useAsset();
const getRankColor = (rank: string) => {
  const colors: Record<string, string> = {
    SS: "bg-purple-600",
    S: "bg-orange-500",
    A: "bg-red-500",
    B: "bg-blue-500",
    C: "bg-green-500",
    D: "bg-yellow-600",
    E: "bg-slate-500",
    F: "bg-stone-400",
  };
  return colors[rank] || "bg-gray-500";
};

const handleIconError = (e: Event) => {
  (e.target as HTMLImageElement).src = resolvePath(
    "/img/dqmj3pro/types/inconnu.png",
  );
};
</script>
