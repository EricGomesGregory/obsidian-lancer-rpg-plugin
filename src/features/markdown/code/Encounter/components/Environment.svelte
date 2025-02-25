<script lang="ts">
  import * as Lancer from "src/classes/Lancer";
	
  interface Props {
    data: Lancer.Environment
  }

  let {
    data
  }: Props = $props()

</script>

<fieldset>
  <legend> {data.name} </legend>
  <p> {data.description} </p>
</fieldset>