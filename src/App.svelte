<script>
	import Input from "./Input.svelte";
	import Specs from "./Specs.svelte";

	import Clipboard from "clipboard";

	import { scopes, primary, secondary, gear, tactical } from "./data.js";

	new Clipboard(".copy");

	let user = "";
	const loadouts = [
		{
			Primary: {
				Receiver: "AK470 Rifle",
				Magazine: "Standard",
				Barrel: "ArmCom Assault Barrel",
				Stock: "Redsand Compensator Stock",
				Muzzle: "ArmCom Slit Flash breaker",
				Scope: "4X Ammo Counter Scope",
				Grip: "",
			},
			Secondary: {
				Receiver: "Breech Loaded Pistol",
				Magazine: "Explosive",
				Barrel: "No Barrel Mod",
				Stock: "No Stock",
				Muzzle: "None",
				Scope: "4X Ammo Counter Scope",
				Grip: "",
			},
			Gear1: "Frag Grenade Mk.1",
			Gear2: "Combat Knife Mk.1",
			Gear3: "Shock Grenade Mk.1",
			Gear4: "EMP Grenade Mk.1",
			Tactical: "Heal Injector Mk.1",
		},
		{
			Primary: {
				Receiver: "AK470 Rifle",
				Magazine: "Standard",
				Barrel: "ArmCom Assault Barrel",
				Stock: "Redsand Compensator Stock",
				Muzzle: "ArmCom Slit Flash breaker",
				Scope: "4X Ammo Counter Scope",
				Grip: "",
			},
			Secondary: {
				Receiver: "Breech Loaded Pistol",
				Magazine: "Explosive",
				Barrel: "No Barrel Mod",
				Stock: "No Stock",
				Muzzle: "None",
				Scope: "4X Ammo Counter Scope",
				Grip: "",
			},
			Gear1: "Frag Grenade Mk.1",
			Gear2: "Combat Knife Mk.1",
			Gear3: "Shock Grenade Mk.1",
			Gear4: "EMP Grenade Mk.1",
			Tactical: "Heal Injector Mk.1",
		},
		{
			Primary: {
				Receiver: "AK470 Rifle",
				Magazine: "Standard",
				Barrel: "ArmCom Assault Barrel",
				Stock: "Redsand Compensator Stock",
				Muzzle: "ArmCom Slit Flash breaker",
				Scope: "4X Ammo Counter Scope",
				Grip: "",
			},
			Secondary: {
				Receiver: "Breech Loaded Pistol",
				Magazine: "Explosive",
				Barrel: "No Barrel Mod",
				Stock: "No Stock",
				Muzzle: "None",
				Scope: "4X Ammo Counter Scope",
				Grip: "",
			},
			Gear1: "Frag Grenade Mk.1",
			Gear2: "Combat Knife Mk.1",
			Gear3: "Shock Grenade Mk.1",
			Gear4: "EMP Grenade Mk.1",
			Tactical: "Heal Injector Mk.1",
		},
	];

	$: template =
		"register\n" +
		JSON.stringify(
			{
				PlayerName: user,
				Loadout1: loadouts[0],
				Loadout2: loadouts[1],
				Loadout3: loadouts[2],
			},
			null,
			2
		);
</script>

<div class="App uk-padding-small">
	<h1>BLR Loadout Generator</h1>

	<div class="uk-position-small uk-position-top-right">
		<div class="uk-alert-danger" uk-alert>
			<p>Stats are not currently correct and are just placeholders.</p>
		</div>
	</div>

	<div class="uk-margin">
		<div class="uk-form-controls">
			<input
				class="uk-input"
				type="text"
				placeholder="Username"
				id="username"
				bind:value={user}
			/>
		</div>
	</div>

	<div class="uk-margin">
		<div class="uk-form-controls">
			<textarea class="uk-textarea" rows="5" value={template} disabled />
		</div>
	</div>

	<button
		class="uk-button uk-button-primary copy"
		data-clipboard-text={template}>Copy to Clipboard</button
	>

	<hr class="uk-divider-icon" />

	<ul uk-tab>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<li><a href="#">Loadout 1</a></li>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<li><a href="#">Loadout 2</a></li>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<li><a href="#">Loadout 3</a></li>
	</ul>

	<ul class="uk-switcher uk-margin">
		{#each loadouts as loadout}
			<li>
				<form class="uk-form-stacked uk-grid-small" uk-grid>
					{#each ["Primary", "Secondary"] as A, i}
						<div class="uk-width-1-1">
							<legend class="uk-legend">{A} Weapon</legend>
						</div>

						<div class="uk-width-1-2">
							<Input
								bind:loadout
								name={"Receiver"}
								primary={!i}
								itter={Object.entries(!i ? primary : secondary)}
							/>
							<Input
								name={"Magazine"}
								primary={!i}
								bind:loadout
								itter={Object.entries(
									(!i ? primary : secondary)[
										loadout[A].Receiver
									].magazines
								)}
							/>
							<Input
								name={"Barrel"}
								primary={!i}
								bind:loadout
								itter={(!i ? primary : secondary)[
									loadout[A].Receiver
								].barrels}
							/>
							<Input
								name={"Stock"}
								primary={!i}
								bind:loadout
								itter={(!i ? primary : secondary)[
									loadout[A].Receiver
								].stocks}
							/>
							<Input
								name={"Muzzle"}
								primary={!i}
								bind:loadout
								itter={Object.entries(
									(!i ? primary : secondary)[
										loadout[A].Receiver
									].muzzles
								)}
							/>
							<Input
								name={"Scope"}
								primary={!i}
								bind:loadout
								itter={scopes}
							/>
							{#if i}
								<Input
									name={"Grip"}
									bind:loadout
									itter={secondary[loadout.Secondary.Receiver]
										.grips}
								/>
							{/if}
						</div>
						<div class="uk-width-1-2">
							<Specs {loadout} primary={!i} />
						</div>
					{/each}

					<div class="uk-width-1-1">
						<legend class="uk-legend">Gear</legend>
					</div>
					{#each [1, 2, 3, 4] as i}
						<div class="uk-margin-small-top uk-width-1-2">
							<label class="uk-form-label" for="gear{i}"
								>Gear {i}</label
							>
							<div class="uk-form-controls">
								<select
									class="uk-select"
									id="gear{i}"
									bind:value={loadout[`Gear${i}`]}
								>
									{#each Object.entries(gear) as e}
										<option>{e[0]}</option>
									{/each}
								</select>
							</div>
						</div>
					{/each}

					<div class="uk-width-1-2">
						<label class="uk-form-label" for="tactical"
							>Tactical</label
						>
						<div class="uk-form-controls">
							<select
								class="uk-select"
								id="tactical"
								bind:value={loadout.Tactical}
							>
								{#each Object.entries(tactical) as e}
									<option>{e[0]}</option>
								{/each}
							</select>
						</div>
					</div>
				</form>
			</li>
		{/each}
	</ul>
</div>
