<script lang="ts">

import * as Models from 'src/database/models';

interface Props {
  lcp: Models.ContentPack
  onToggle?: (state: boolean) => void; 
}

let {
  lcp,
  onToggle
}: Props = $props();

</script>

<div>
  <h3> {lcp.manifest.name} </h3>
  <input type="checkbox" value={lcp.active}>
  <div>
    <aside>
      <p>
        <b> Author: </b>
        {lcp.manifest.author}
      </p>
      
    </aside>
  </div>
</div>
