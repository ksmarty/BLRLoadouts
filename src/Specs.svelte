<script>
	import specs from "./specs.json";

	export let loadout;
	export let primary;

	$: modifiers = Object.keys(loadout.Primary)
		.filter((e) => e !== "Receiver")
		.reduce(
			(acc, cur) => ({
				...acc,
				[cur]:
					cur !== "Magazine"
						? specs[`${cur}s`][
								loadout[primary ? "Primary" : "Secondary"][cur]
						  ]
						: specs.Magazines[
								{
									"Submachine Gun": "SMG Mags",
									"Light Machine Gun": "LMG Mags",
									"Burstfire SMG": "BSMG Mags",
									"M4X Rifle": "M4X Mags",
									"Bullpup Full Auto": "BPFA Mags",
									"Tactical SMG": "TSMG Mags",
									"Compound Bow": "Compound Bow Arrows",
								}[
									loadout[primary ? "Primary" : "Secondary"]
										.Receiver
								] ||
									loadout[primary ? "Primary" : "Secondary"]
										.Receiver + " Mags"
						  ]?.[
								loadout[primary ? "Primary" : "Secondary"]
									.Magazine
						  ] ?? null,
			}),
			{}
		);

	$: modifierStats = Object.fromEntries(
		Object.entries(
			Object.entries(modifiers)
				.filter(([_k, v]) => v) // Removes null values
				.reduce((acc, [_k, v]) => [...acc, ...Object.entries(v)], [])
				.reduce(
					(acc, [k, v]) => ({
						...acc,
						[k]:
							["Range", "Ammo"].indexOf(k) == -1
								? acc[k] + parseFloat(v)
								: acc[k]
										.split("/")
										.map(
											(e, i) =>
												parseInt(e) +
												parseInt(v.split("/")[i])
										)
										.reduce(
											(acc, cur, i) =>
												acc + (i ? cur : `${cur}/`),
											""
										),
					}),
					{
						Damage: 0,
						Ammo: "0/0",
						Reload: 0.0,
						Firerate: 0,
						Zoom: 0.0,
						Recoil: 0.0,
						"Scope In": 0.0,
						Range: "0/0",
						Run: 0.0,
						Aim: 0.0,
						Hip: 0.0,
						Move: 0.0,
					}
				)
		)
			.filter(([_k, v]) => v && v !== "0/0")
			.map(([k, v]) => [
				k,
				(isNaN(v) ? v : (v > 0 ? "+" : "") + v.toFixed(2)) +
					({
						Reload: "s",
						"Scope In": "s",
						Recoil: "°",
						Aim: "°",
						Hip: "°",
						Move: "°",
					}[k] || ""),
			])
	);

	$: gun = Object.entries(
		specs.Receivers[loadout[primary ? "Primary" : "Secondary"].Receiver]
	).map((e) => [...e, modifierStats[e[0]] ?? ""]);
</script>

<div class="uk-card uk-card-small uk-card-default uk-height-1-1 uk-margin-left">
	<div
		class="uk-flex uk-flex-column uk-card-body uk-height-1-1 uk-padding-remove-vertical"
	>
		<span class="uk-margin-small" />
		{#each gun as spec, i}
			<div class="uk-width-1-1 uk-flex uk-margin-auto-vertical">
				<div class="uk-width-1-3 uk-text-bold">{spec[0]}</div>
				<div class="uk-width-1-3 uk-text-center">{spec[1]}</div>
				{#if spec[0] === "Fire Mode"}
					<div class="uk-width-1-3" />
				{:else}
					<div
						class="uk-width-1-3 uk-text-center uk-text-{parseFloat(
							spec[2]
						) > 0
							? 'primary'
							: 'danger'}"
					>
						{spec[2]}
					</div>
				{/if}
			</div>
		{:else}
			<div>That's the none-gun</div>
		{/each}
		<span class="uk-margin-small" />
	</div>
</div>
