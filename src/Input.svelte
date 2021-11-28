<script>
	import { afterUpdate } from "svelte";

	export let name;
	export let primary = false;
	export let loadout;
	export let itter;

	let select;

	afterUpdate(() => {
		if (
			(loadout[primary ? "Primary" : "Secondary"][name] &&
				!select.value) ||
			!loadout[primary ? "Primary" : "Secondary"][name]
		) {
			select.selectedIndex = 0;
			loadout[primary ? "Primary" : "Secondary"][name] = select.value;
		}

		if (
			/(?:Heavy|Light) Pistol/.test(
				loadout[primary ? "Primary" : "Secondary"].Receiver
			) &&
			name === "Stock" &&
			loadout[primary ? "Primary" : "Secondary"].Barrel ===
				"No Barrel Mod"
		) {
			select.disabled = true;
			loadout[primary ? "Primary" : "Secondary"].Stock = "No Stock";
		} else select.disabled = false;

		if (
			name === "Grip" &&
			loadout[primary ? "Primary" : "Secondary"].Receiver !== "Shotgun"
		) {
			select.disabled = true;
		}
	});
</script>

<div
	class={primary && name === "Grip" ? "uk-invisible" : ""}
	style="margin-bottom: 0.25rem"
>
	<label
		class="uk-form-label"
		for="{primary ? 'primary' : 'secondary'}-{name.toLowerCase()}"
		>{name}</label
	>
	<div class="uk-form-controls">
		<select
			bind:this={select}
			class="uk-select"
			id="{primary ? 'primary' : 'secondary'}-{name.toLowerCase()}"
			disabled={!itter.length}
			bind:value={loadout[primary ? "Primary" : "Secondary"][name]}
		>
			{#each itter as e}
				<option>{e.constructor === Array ? e[0] : e}</option>
			{/each}
		</select>
	</div>
</div>
