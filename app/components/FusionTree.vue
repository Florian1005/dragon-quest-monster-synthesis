<template>
  <div
    class="h-[500px] w-full border rounded-lg bg-gray-50 dark:bg-gray-900 overflow-hidden"
  >
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :fit-view-on-init="true"
      @pane-ready="onPaneReady"
    >
      <Background pattern-color="#aaa" :gap="16" />
      <Controls />

      <template #node-monster="{ data }">
        <div
          class="px-2 py-1 shadow-md rounded-md bg-white border-2 border-primary-500 flex flex-col items-center min-w-[80px]"
        >
          <img
            :src="resolvePath(data.image)"
            class="w-12 h-12 object-contain"
            v-if="data.image"
          />
          <div
            class="text-[10px] font-bold text-center leading-tight truncate w-full"
          >
            {{ data.label }}
          </div>
          <div
            v-if="data.rank"
            class="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1 rounded"
          >
            {{ data.rank }}
          </div>
          <div
            v-if="data.quantity > 1"
            class="absolute -top-2 -left-2 bg-primary-600 text-white text-[10px] font-bold px-1.5 rounded-full"
          >
            ×{{ data.quantity }}
          </div>
        </div>
      </template>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { useMonsters } from "~/composable/useMonster";
import type { Monster } from "~/interfaces/monster.interface";
import { useRecipes } from "~/composable/useRecipes";
import dagre from "dagre";
import { useAsset } from "~/composable/useAsset";

const props = defineProps<{ monster: Monster }>();

const { getMonster } = useMonsters();
const { getRecipesFor } = useRecipes();
const { fitView } = useVueFlow();

const nodes = ref<any[]>([]);
const edges = ref<any[]>([]);

const layoutNodes = (nodes: any[], edges: any[]) => {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB", nodesep: 50, ranksep: 100 });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => g.setNode(node.id, { width: 100, height: 80 }));
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));

  dagre.layout(g);

  return nodes.map((node) => {
    const { x, y } = g.node(node.id);
    return { ...node, position: { x, y } };
  });
};
const { resolvePath } = useAsset();

const buildTree = (monsterId: string) => {
  const newNodes: any[] = [];
  const newEdges: any[] = [];
  const visited = new Set<string>();

  function traverse(monsterId: string, depth = 0, quantity = 1) {
    if (visited.has(monsterId + depth) || depth > 3) return;
    visited.add(monsterId + depth);

    const monster = getMonster(monsterId);
    const nodeId = `node-${monsterId}-${depth}`;

    newNodes.push({
      id: nodeId,
      type: "monster",
      data: {
        label: monster?.name || `${monsterId}`,
        image: monster?.image,
        rank: monster?.rank,
        quantity,
      },
      position: { x: 0, y: 0 },
    });

    const monsterRecipes = getRecipesFor(monsterId);

    if (monsterRecipes.length > 0) {
      const recipe = monsterRecipes[0];

      const counts = new Map<string, number>();
      recipe?.ingredients.forEach((ingId) => {
        counts.set(ingId, (counts.get(ingId) ?? 0) + 1);
      });

      counts.forEach((ingQuantity, ingId) => {
        const childNodeId = `node-${ingId}-${depth + 1}`;

        newEdges.push({
          id: `e-${ingId}-${monsterId}-${depth}`,
          source: childNodeId,
          target: nodeId,
          animated: false,
          style: { stroke: "#3b82f6", strokeWidth: 2 },
        });

        traverse(ingId, depth + 1, ingQuantity);
      });
    }
  }

  traverse(monsterId);

  if (newNodes.length > 0) {
    nodes.value = layoutNodes(newNodes, newEdges);
    edges.value = newEdges;
  }
};

watch(
  () => props.monster,
  (newVal) => {
    if (newVal) buildTree(newVal.id);
  },
  { immediate: true },
);

const onPaneReady = () => {
  setTimeout(() => fitView(), 50);
};
</script>

<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";

.vue-flow__edge-path {
  stroke: #3b82f6;
  stroke-width: 2;
}
</style>
