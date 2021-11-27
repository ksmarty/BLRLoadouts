const str1 = `
0 = No Tactical Gear
1 = Heal Injector Mk.1
2 = Repair Tool
3 = Ammunition Pod Mk.1
4 = Barricade Mk.1
5 = Revival Injector Mk.1
6 = Cloak
7 = Hardsuit HRV Ping
8 = Hardsuit Battle Mode
9 = Respawn Beacon
10 = Firewall Breach Kit
11 = HRV Cloak
12 = Cloak Mk.2
13 = Barricade Mk.2`;

const spl = str1
	.split("\n")
	.slice(1)
	.map((e) => e.split(" = "))
	// .reduce((acc, cur) => ({ ...acc, [cur[1].split(" ")[(cur[1].split(" ").length) - 1]]: cur[0] }), {});
	.reduce((acc, cur) => ({ ...acc, [cur[1]]: cur[0] }), {});
console.log(spl);
