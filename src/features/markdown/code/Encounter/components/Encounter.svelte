<script lang="ts">
  import type { Encounter } from "..";
	
	import Environment from "./Environment.svelte";
	import Sitrep from "./Sitrep.svelte";
  import Forces from "./Forces.svelte";

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
  <Forces forces={forces}/>
</div>