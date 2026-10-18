import type { ImageAsset } from "./types";

/**
 * Stock photography (Unsplash License: free for commercial use, no attribution
 * required). These are interim images. Alt text describes what is in each
 * photo, never claims it shows Trident Core Energy's own facility, team or
 * projects. Replace with real company photography before launch (see the
 * README checklist); slots that must show the company itself, such as the
 * facility gallery, ignore stock images entirely.
 */
function unsplash(id: string, alt: string, sourceUrl: string, width = 1600): ImageAsset {
  return {
    // Cap the source size; next/image resizes further per viewport.
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`,
    alt,
    stock: true,
    sourceUrl,
  };
}

export const images = {
  solarFarmAerial: unsplash(
    "1641959166364-6c9b9898e804",
    "Aerial view of a large solar farm stretching to the horizon at sunrise",
    "https://unsplash.com/photos/an-aerial-view-of-a-large-solar-farm-Y5j57HvzuZg",
    2000,
  ),
  solarFarmGreen: unsplash(
    "1497435334941-8c899ee9e8e9",
    "Aerial view of rows of solar panels across a green field",
    "https://unsplash.com/photos/aerial-photography-of-grass-field-with-blue-solar-panels-Ilpf2eUPpUE",
  ),
  solarFieldSky: unsplash(
    "1509391366360-2e959784a276",
    "Ground-mounted solar panels on a grassy field under a blue sky with clouds",
    "https://unsplash.com/photos/solar-panels-on-green-field-513dBrMJ_5w",
  ),
  groundMountPlant: unsplash(
    "1629726797843-618688139f5a",
    "Ground-mounted solar plant set among green farmland",
    "https://unsplash.com/photos/black-solar-panels-on-green-grass-field-during-daytime-IwY-27ceRCA",
  ),
  groundMountRows: unsplash(
    "1508514177221-188b1cf16e9d",
    "Rows of tilted solar panels under a bright blue sky",
    "https://unsplash.com/photos/solar-panel-under-blue-sky-XGAZzyLzn18",
  ),
  panelsGrass: unsplash(
    "1558449028-b53a39d100fc",
    "Close view of a solar array on green grass under a clear sky",
    "https://unsplash.com/photos/blue-solar-panel-WvusC5M-TM8",
  ),
  elevatedRows: unsplash(
    "1545208942-e1c9c916524b",
    "Parallel rows of elevated solar modules seen from between the structures",
    "https://unsplash.com/photos/blue-and-white-solar-panel-lot-GXiHwHkIdVs",
  ),
  moduleRows: unsplash(
    "1521618755572-156ae0cdd74d",
    "Close-up of blue solar modules arranged in long rows",
    "https://unsplash.com/photos/blue-solar-panel-boards-V4ZYJZJ3W4M",
  ),
  modulesSunset: unsplash(
    "1613665813446-82a78c468a1d",
    "Solar module surfaces reflecting the setting sun",
    "https://unsplash.com/photos/black-and-white-solar-panels-0GbrjL3vZF4",
  ),
  engineerVest: unsplash(
    "1726221062299-88f27b653c59",
    "Engineer in a hard hat and high-visibility vest overlooking a solar installation",
    "https://unsplash.com/photos/hBE96YanOlM",
  ),
  engineerUnderArray: unsplash(
    "1726221062287-fda475b85493",
    "Engineer in safety gear standing beneath a solar array on site",
    "https://unsplash.com/photos/dnUPzv-eytA",
  ),
  technicianOnPanels: unsplash(
    "1719848576338-9516ba7ccd8b",
    "Technician in a hard hat working on a large solar array",
    "https://unsplash.com/photos/a-man-in-a-hardhat-working-on-a-solar-panel-JlhvFEVMwng",
  ),
  technicianModule: unsplash(
    "1668097613572-40b7c11c8727",
    "Gloved hands of a technician working on a solar module",
    "https://unsplash.com/photos/a-person-working-on-a-solar-panel-rNn_TU8dvoY",
  ),
  installerRoof: unsplash(
    "1624397640148-949b1732bb0a",
    "Installer placing a solar panel on a residential roof",
    "https://unsplash.com/photos/person-installing-solar-panel-on-roof-wmaP3Tl80ww",
  ),
  installerHouse: unsplash(
    "1719559519300-e9d2c2bf6de1",
    "Installer in a hard hat carrying a solar panel outside a house",
    "https://unsplash.com/photos/S2Jxs3DXpyA",
  ),
  homeRooftop: unsplash(
    "1655300256335-beef51a914fe",
    "Modern house with solar panels on its pitched roof",
    "https://unsplash.com/photos/a-house-with-solar-panels-Ja8t8nJN2I4",
  ),
  tiledRooftop: unsplash(
    "1780445392792-556e5609c5ab",
    "Solar panels installed on a tiled residential roof",
    "https://unsplash.com/photos/solar-panels-installed-on-a-tiled-residential-roof-VAegToqdX3A",
  ),
  commercialRoof: unsplash(
    "1707247111552-aaf74241058b",
    "Large solar array covering the roof of a commercial building",
    "https://unsplash.com/photos/a-large-amount-of-solar-panels-on-the-roof-of-a-building-twOIx6I35tk",
  ),
  commercialRoofRows: unsplash(
    "1694327671725-e2a81cda3436",
    "Several rows of solar panels across a flat building roof",
    "https://unsplash.com/photos/several-rows-of-solar-panels-on-a-roof-t-rzp15L7qg",
  ),
  industrialRoof: unsplash(
    "1780445392628-d6f5b9e5609b",
    "Solar panels covering a corrugated metal industrial roof",
    "https://unsplash.com/photos/solar-panels-installed-on-a-grey-corrugated-metal-roof-0b3KYOuSNho",
  ),
  panelCleaning: unsplash(
    "1754619880959-2b0528375883",
    "Solar panels being cleaned with a long-handled brush",
    "https://unsplash.com/photos/XZP59dwklV4",
  ),
  hardhatOnPanel: unsplash(
    "1648135327756-b606e2eb8caa",
    "White safety helmet resting on a solar panel",
    "https://unsplash.com/photos/a-white-hard-hat-sitting-on-top-of-a-solar-panel-2ASQyjafflo",
  ),
} satisfies Record<string, ImageAsset>;
