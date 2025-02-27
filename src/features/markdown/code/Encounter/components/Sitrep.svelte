<script lang="ts">
  import * as Lancer from "src/classes/Lancer";

  interface Props {
    data: Lancer.Sitrep
  }

  let {
    data
  }: Props = $props()
</script>

<fieldset>
  <legend> <b>SITREP:</b> {data.name} </legend>
  <p> {data.description} </p>
</fieldset>