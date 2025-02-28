<script lang="ts">
	import * as Lancer from "src/classes/Lancer";

	interface Props {
		data: Lancer.Sitrep;
	}

	let { data }: Props = $props();
</script>

<fieldset>
	<legend> <b>SITREP:</b> {data.name} </legend>
	<p>{data.description}</p>
  <div class={data.noVictory ? "victory-full" : "victory"}>
    <fieldset>
      <legend> PC VICTORY </legend>
			<p>{data.pcVictory}</p>
		</fieldset>
		<fieldset>
      <legend> ENEMY VICTORY </legend>
			<p>{data.enemyVictory}</p>
		</fieldset>
    {#if data.noVictory}
		<fieldset>
      <legend> NO VICTORY </legend>
			<p>{data.noVictory}</p>
		</fieldset>
    {/if}
	</div>
	<div class="extra">
    {#if data.deployment}  
		<fieldset>
      <legend> DEPLOYMENT </legend>
			{data.deployment}
		</fieldset>
    {/if}
    {#if data.extraction}  
		<fieldset>
      <legend> EXTRACTION </legend>
			{data.extraction}
		</fieldset>
    {/if}
    {#if data.controlZone}
    <fieldset>
      <legend> CONTROL ZONE </legend>
			{data.controlZone}
		</fieldset>
    {/if}
		{#if data.objective}
    <fieldset>
      <legend> OBJECTIVE </legend>
			{data.objective}
		</fieldset>
    {/if}
	</div>
</fieldset>

<style>
	.victory {
		display: grid;
    grid-template-columns: 1fr 1fr;
	}

  .victory-full {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
	}
  
	.extra {
		display: grid;
    grid-template-columns: 1fr 1fr;
	}
</style>