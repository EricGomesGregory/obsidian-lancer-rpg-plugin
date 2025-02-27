<script lang="ts">
	import type { Npc } from "src/classes/Lancer";


interface Props {
  data: Npc
}

let {
  data
}: Props = $props();

</script>

<button>
  {data.name} {data.tier}
</button>