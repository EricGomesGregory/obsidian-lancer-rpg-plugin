<script lang="ts">
	import type { Npc } from "src/classes/Lancer";
  import type { Encounter } from "..";
	
	import Environment from "./Environment.svelte";
	import Sitrep from "./Sitrep.svelte";
  import Forces from "./Forces.svelte";
	import Reinforcements from "./Reinforcements.svelte";

  interface Props {
    encounter: Encounter
    onClickNpc: (npc: Npc) => void
  }

  let {
    encounter,
    onClickNpc
  }: Props = $props();

  let forces = encounter.forces;

</script>

<div>
  <Environment data={encounter.environment}/>
  <Sitrep data={encounter.sitrep}/>
  <Forces data={forces} onClick={onClickNpc}/>
  {#if encounter.reinforcements != undefined}
    <Reinforcements data={encounter.reinforcements} onClick={onClickNpc}/>
  {/if}
</div>