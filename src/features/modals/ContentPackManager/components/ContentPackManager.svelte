


<script lang="ts">

import ContentPack from './ContentPack.svelte';
import * as Database from 'src/database';

interface Props {
  onImport: (file: File) => void;
};

let contentPacks: Database.Models.ContentPack[] = $state([]);

let {
  onImport
}: Props = $props();

async function importLcp(event: Event & {currentTarget: EventTarget & HTMLInputElement;}) {
  if (event.currentTarget.files) {
    const file = event.currentTarget.files[0];
    if (file) { onImport(file); }
  }
}

export function update(packs: Database.Models.ContentPack[]) {
  contentPacks = packs;
}

</script>


<div>
  <input type="file" accept=".lcp" onchange={importLcp}/>
  <div>
    <h2> Content Packs </h2>
    {#each contentPacks as lcp, i}
      <ContentPack lcp={lcp}/>
    {/each}
  </div>
</div>

