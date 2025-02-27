<script lang="ts">
  import type { Npc } from "src/classes/Lancer";
	import NpcPill from "./NpcPill.svelte";

  interface Props {
    data: Npc[]
  }

  let {
    data: forces
  }: Props = $props()

</script>

<fieldset>
  <legend> <b> REINFORCEMENTS </b> </legend>
  {#each forces as ncp }
    <NpcPill data={ncp}/>
  {/each}
</fieldset>