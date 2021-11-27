import { chromium } from "playwright";
import { writeFile } from "fs";
import { promisify } from "util";

const funcs = [
	async (page, key) => {
		const rawDataSpread = await page
			.locator(".pi-horizontal-group")
			.allInnerTexts();
		const rawDataOther = await page.locator(".pi-data").allInnerTexts();

		return {
			[key]: {
				...rawDataSpread[0]
					?.split("\n")
					.slice(1)
					.reduce((acc, cur) => [...acc, ...cur.split("\t")], [])
					.reduce(
						(acc, cur, i, arr) => ({
							...acc,
							[cur]: [...arr.splice(-3 + i, 1)][0].replace(
								/,/,
								"."
							),
						}),
						{}
					),
				...rawDataOther.reduce(
					(acc, cur) => ({
						...acc,
						[cur.split("\n")[0]]: cur
							.split("\n")[1]
							.replace(/,/, "."),
					}),
					{}
				),
			},
		};
	},
	async (page, key) => {
		if (key === "Breech Loaded Pistol")
			return {
				"Breech Loaded Pistol": {
					"HE Round Bore": { None: "" },
					"Incendiary Round Bore": { Damage: "+50" },
					"Flechette Chamber Boring": {
						Damage: "-200",
						Range: "+28/+40",
					},
				},
			};

		const rawData = await page.locator("td:not([colspan])").allInnerTexts();

		return {
			[key]: {
				...rawData.reduce(
					(acc, cur, i) =>
						cur.includes("Foiche")
							? [...rawData.splice(i + 1, 3)] && acc
							: {
									...acc,
									[cur]: [...rawData.splice(i + 1, 3)][1]
										?.split("\n")
										.reduce(
											(acc2, cur2) => ({
												...acc2,
												[cur2.split(": ")[0] || "None"]:
													cur2.split(": ")[1] ?? "",
											}),
											{}
										),
							  },
					{}
				),
			},
		};
	},
	async (page, _key) => {
		const rawData = await page
			.locator(".article-table > tbody:nth-child(2)")
			.innerText();

		return rawData
			.split("\n")
			.map((e) => e.split("\t"))
			.reduce(
				(acc, cur) => ({
					...acc,
					[cur[0]]: {
						Zoom: cur[2],
						"Scope In": cur[3],
					},
				}),
				{}
			);
	},
	async (page, key) => {
		const rawData = await page.locator(".pi-data").allInnerTexts();
		const rawSpread = await page
			.locator(".pi-horizontal-group-item")
			.allInnerTexts();
			
		return {
			[key]: {
				...rawData
					.map((e) => e.split("\n"))
					.reduce(
						(acc, cur) => ({
							...acc,
							[cur[0]]: cur[1],
						}),
						{}
					),
				...rawSpread.reduce(
					(acc, cur, i) => ({
						...acc,
						[cur]: rawSpread.splice(3, 1)[0],
					}),
					{}
				),
			},
		};
	},
];

const abc = [
	{
		url: "https://blacklight.fandom.com/wiki/Receiver",
		selector: ".mw-parser-output > ul > li > a",
		fileName: "Receivers",
		func: funcs[3],
	},
	{
		url: "https://blacklight.fandom.com/wiki/Stock",
		selector: ".article-table td:nth-child(2) > a",
		fileName: "Stocks",
		func: funcs[0],
	},
	{
		url: "https://blacklight.fandom.com/wiki/Barrel",
		selector: "table.article-table td:nth-child(1) > a",
		fileName: "Barrels",
		func: funcs[0],
	},
	{
		url: "https://blacklight.fandom.com/wiki/Ammunition",
		selector: ".mw-parser-output > ul > li > a",
		fileName: "Ammo",
		func: funcs[1],
	},
	{
		url: "https://blacklight.fandom.com/wiki/Scope",
		selector: "table.article-table > tbody:nth-child(2)",
		fileName: "Scopes",
		func: funcs[2],
	},
];

const browser = await chromium.launch();
const page = await browser.newPage();

let combined = {};

for (let { url, selector, fileName, func } of abc) {
	// Get Links
	await page.goto(url);
	const links = await page.evaluate(
		(selector) =>
			[...document.querySelectorAll(selector)].map((e) => e.href),
		selector
	);

	// Get Data

	let data = {};

	for (let link of links == false ? [url] : links) {
		await page.goto(link);
		const key = await page.innerText("#firstHeading");

		const pageData = await func(page, key);

		data = {
			...data,
			...pageData,
		};
	}

	combined = {
		...combined,
		[fileName]: data,
	};
}

await browser.close();

await promisify(writeFile)(
	`./scaped_data.json`,
	JSON.stringify(combined, null, 2),
	() => {}
);
