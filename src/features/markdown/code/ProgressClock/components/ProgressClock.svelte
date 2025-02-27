<script lang="ts">
	import type { ProgressClockData } from "..";


  interface Props {
    data: ProgressClockData
    update: (progress: number) => void
  }

  let {
    data,
    update
  }: Props = $props();

  let progress = $state(data.progress)

  function reduce() {
    progress = Math.max(progress -1, 0);
    update(progress);
  }

  function increment() {
    progress = Math.min(progress + 1, data.sides);
    update(progress);
  }

</script>

<fieldset>
  <legend> {data.name} </legend>
  {progress}
  <div>
    <button onclick={() => reduce()}> - </button>
    <button onclick={() => increment()}> + </button>
  </div>
</fieldset>