


<script lang="ts">
  import { type NpcClassData } from "src/database/models";

  interface Props {
    data: NpcClassData
  }

  let {
    data
  }: Props = $props()

</script>

<div>
  <header class="headerRow">
    <h3> {data.name} </h3>
    <p> {data.role} </p>
  </header>
</div>

<style>
  .headerRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>