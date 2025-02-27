
<script lang="ts">
	import type { Npc } from "src/classes/Lancer";


  interface Props {
    data: Npc
  }

  let {
    data
  }: Props = $props()

</script>

<div>
  <header>
    <h1> {data.name} </h1>
    <p> {data.class.name} {data.tier} </p>
  </header>

</div>