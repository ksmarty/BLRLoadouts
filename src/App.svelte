<script>
	import Input from "./Input.svelte";
	import Clipboard from "clipboard";
	import { scopes, primary, secondary, gear, tactical } from "./data.js";
	import specs from "./specs.json";

	new Clipboard(".copy");

	let user = "";
	const loadouts = [
		{
			Primary: {
				Reciever: "AK470 Rifle",
				Magazine: "Standard",
				Barrel: "ArmCom Assault Barrel",
				Stock: "Redsand Compensator Stock",
				Muzzle: "ArmCom Slit Flash breaker",
				Scope: "4X Ammo Counter Scope",
				Grip: "",
			},
			Secondary: {
				Reciever: "Breech Loaded Pistol",
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
				Reciever: "AK470 Rifle",
				Magazine: "Standard",
				Barrel: "ArmCom Assault Barrel",
				Stock: "Redsand Compensator Stock",
				Muzzle: "ArmCom Slit Flash breaker",
				Scope: "4X Ammo Counter Scope",
				Grip: "",
			},
			Secondary: {
				Reciever: "Breech Loaded Pistol",
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
				Reciever: "AK470 Rifle",
				Magazine: "Standard",
				Barrel: "ArmCom Assault Barrel",
				Stock: "Redsand Compensator Stock",
				Muzzle: "ArmCom Slit Flash breaker",
				Scope: "4X Ammo Counter Scope",
				Grip: "",
			},
			Secondary: {
				Reciever: "Breech Loaded Pistol",
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

	$: console.log(specs["Receivers"][loadouts[0].Primary.Reciever]);
</script>

<div class="App">
	<h1>BLR Loadout Generator</h1>

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

	<ul uk-tab>
		<li><a href="#">Loadout 1</a></li>
		<li><a href="#">Loadout 2</a></li>
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
								name={"Reciever"}
								primary={!i}
								itter={Object.entries(!i ? primary : secondary)}
							/>
							<Input
								name={"Magazine"}
								primary={!i}
								bind:loadout
								itter={Object.entries(
									(!i ? primary : secondary)[
										loadout[A].Reciever
									].ammo
								)}
							/>
							<Input
								name={"Barrel"}
								primary={!i}
								bind:loadout
								itter={(!i ? primary : secondary)[
									loadout[A].Reciever
								].barrels}
							/>
							<Input
								name={"Stock"}
								primary={!i}
								bind:loadout
								itter={(!i ? primary : secondary)[
									loadout[A].Reciever
								].stocks}
							/>
							<Input
								name={"Muzzle"}
								primary={!i}
								bind:loadout
								itter={Object.entries(
									(!i ? primary : secondary)[
										loadout[A].Reciever
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
									itter={secondary[loadout.Secondary.Reciever]
										.grips}
								/>
							{/if}
						</div>
						<div class="uk-width-1-2">Specs</div>
					{/each}

					<div class="uk-width-1-1">
						<legend class="uk-legend">Gear</legend>
					</div>
					<div class="uk-width-1-2">
						{#each [1, 2, 3, 4] as i}
							<div class="uk-margin-small">
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

						<div class="uk-margin-small">
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
					</div>
				</form>
			</li>
		{/each}
	</ul>
</div>
