<script lang="ts">
  import type { Encounter } from "..";
	import Environment from "./Environment.svelte";
	import Sitrep from "./Sitrep.svelte";

  interface Props {
    encounter: Encounter
  }

  let {
    encounter
  }: Props = $props()
</script>

<div>
  <Environment data={encounter.environment}/>
  <Sitrep data={encounter.sitrep}/>
</div>