<script lang="ts">
	import type { Npc } from "src/classes/Lancer";


interface Props {
  data: Npc
  onClick: (npc: Npc) => void
}

let {
  data,
  onClick
}: Props = $props();

</script>

<button onclick={() => onClick(data)}>
  {#each data.templates as template }
    {template.name}
  {/each}
  {data.name} {data.tier}
</button>