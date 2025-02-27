<script lang="ts">
  import type { Npc } from "src/classes/Lancer";
	import NpcPill from "./NpcPill.svelte";

  interface Props {
    forces: Npc[]
  }

  let {
    forces
  }: Props = $props()

</script>

<fieldset>
  <legend> Forces </legend>
  {#each forces as ncp }
    <NpcPill data={ncp}/>
  {/each}
</fieldset>