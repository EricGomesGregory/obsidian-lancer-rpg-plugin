<script lang="ts">
  import type { Encounter } from "..";
	
	import Environment from "./Environment.svelte";
	import Sitrep from "./Sitrep.svelte";
  import Forces from "./Forces.svelte";
	import Reinforcements from "./Reinforcements.svelte";

  interface Props {
    encounter: Encounter
  }

  let {
    encounter
  }: Props = $props();

  let forces = encounter.forces;

</script>

<div>
  <Environment data={encounter.environment}/>
  <Sitrep data={encounter.sitrep}/>
  <Forces data={forces}/>
  {#if encounter.reinforcements != undefined}
    <Reinforcements data={encounter.reinforcements}/>
  {/if}
</div>