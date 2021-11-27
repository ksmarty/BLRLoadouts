<script>
	export let name;
	export let primary = false;
	export let loadout;
	export let itter;
</script>

<div class="uk-margin-small">
	<label
		class="uk-form-label"
		for="{primary ? 'primary' : 'secondary'}-{name.toLowerCase()}"
		>{name}</label
	>
	<div class="uk-form-controls">
		<select
			class="uk-select"
			id="primary-reciever"
			disabled={!itter.length}
			bind:value={loadout[primary ? "Primary" : "Secondary"][name]}
		>
			{#each itter as e}
				<option>{e.constructor === Array ? e[0] : e}</option>
			{:else}
				<option value="" selected disabled>None</option>
			{/each}
		</select>
	</div>
</div>
