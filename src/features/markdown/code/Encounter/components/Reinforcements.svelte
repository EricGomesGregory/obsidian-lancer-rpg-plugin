<script lang="ts">
  import type { Npc } from "src/classes/Lancer";
	import NpcPill from "./NpcPill.svelte";

  interface Props {
    data: Npc[]
    onClick: (npc: Npc) => void
  }

  let {
    data,
    onClick
  }: Props = $props()

</script>

<fieldset>
  <legend> <b> REINFORCEMENTS </b> </legend>
  {#each data as ncp }
    <NpcPill data={ncp} onClick={onClick}/>
  {/each}
</fieldset>