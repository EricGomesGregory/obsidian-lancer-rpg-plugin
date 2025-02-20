<script lang="ts">

import * as Models from 'src/database/models';

interface Props {
  lcp: Models.ContentPack
  onRemove: (id: string) => void;
  onToggle?: (state: boolean) => void; 
}

let {
  lcp,
  onRemove,
  onToggle
}: Props = $props();

</script>

<fieldset class="content-pack">
  <legend> {lcp.manifest.name} </legend>
  <div class="row">
    <aside class="column">
      <label> Version: </label>
      <input disabled value={lcp.manifest.version}/>
    </aside>
    <aside class="column">
      <img alt={lcp.manifest.name} src={lcp.manifest.image_url}/>
    </aside>
  </div>
  <footer class="column">
    <button onclick={() => onRemove(lcp.id)}> Remove </button>
    {lcp.id}
  </footer>
</fieldset>

<style>
  .content-pack {
    width: 95%;
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .column {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
</style>