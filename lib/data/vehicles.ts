import type { VehicleMake } from "@/types";

const vehicleMakes: VehicleMake[] = [
  {
    id: "make-toyota",
    name: "Toyota",
    models: [
      {
        id: "model-camry",
        name: "Camry",
        trims: [
          { id: "trim-camry-le", name: "LE", oemSize: "215/55R17" },
          { id: "trim-camry-se", name: "SE", oemSize: "235/45R18" },
          { id: "trim-camry-xse", name: "XSE", oemSize: "235/40R19" },
        ],
      },
      {
        id: "model-rav4",
        name: "RAV4",
        trims: [
          { id: "trim-rav4-le", name: "LE", oemSize: "225/65R17" },
          { id: "trim-rav4-xle", name: "XLE", oemSize: "225/60R18" },
          { id: "trim-rav4-trd", name: "TRD Off-Road", oemSize: "225/60R18" },
        ],
      },
      {
        id: "model-corolla",
        name: "Corolla",
        trims: [
          { id: "trim-corolla-l", name: "L", oemSize: "195/65R15" },
          { id: "trim-corolla-se", name: "SE", oemSize: "225/40R18" },
        ],
      },
    ],
  },
  {
    id: "make-honda",
    name: "Honda",
    models: [
      {
        id: "model-civic",
        name: "Civic",
        trims: [
          { id: "trim-civic-lx", name: "LX", oemSize: "215/55R16" },
          { id: "trim-civic-sport", name: "Sport", oemSize: "235/40R18" },
          { id: "trim-civic-si", name: "Si", oemSize: "235/40R18" },
        ],
      },
      {
        id: "model-crv",
        name: "CR-V",
        trims: [
          { id: "trim-crv-lx", name: "LX", oemSize: "235/65R17" },
          { id: "trim-crv-touring", name: "Touring", oemSize: "235/60R18" },
        ],
      },
      {
        id: "model-pilot",
        name: "Pilot",
        trims: [
          { id: "trim-pilot-ex", name: "EX-L", oemSize: "245/60R18" },
          { id: "trim-pilot-elite", name: "Elite", oemSize: "245/55R20" },
        ],
      },
    ],
  },
  {
    id: "make-ford",
    name: "Ford",
    models: [
      {
        id: "model-f150",
        name: "F-150",
        trims: [
          { id: "trim-f150-xl", name: "XL", oemSize: "265/70R17" },
          { id: "trim-f150-lariat", name: "Lariat", oemSize: "275/60R20" },
          { id: "trim-f150-raptor", name: "Raptor", oemSize: "315/70R17" },
        ],
      },
      {
        id: "model-explorer",
        name: "Explorer",
        trims: [
          { id: "trim-explorer-base", name: "Base", oemSize: "245/60R18" },
          { id: "trim-explorer-st", name: "ST", oemSize: "265/45R21" },
        ],
      },
      {
        id: "model-mustang",
        name: "Mustang",
        trims: [
          { id: "trim-mustang-ecoboost", name: "EcoBoost", oemSize: "235/50R18" },
          { id: "trim-mustang-gt", name: "GT Premium", oemSize: "255/40R19" },
        ],
      },
    ],
  },
  {
    id: "make-chevrolet",
    name: "Chevrolet",
    models: [
      {
        id: "model-silverado",
        name: "Silverado 1500",
        trims: [
          { id: "trim-silverado-wt", name: "Work Truck", oemSize: "255/70R17" },
          { id: "trim-silverado-lt", name: "LT Trail Boss", oemSize: "275/65R18" },
        ],
      },
      {
        id: "model-equinox",
        name: "Equinox",
        trims: [
          { id: "trim-equinox-ls", name: "LS", oemSize: "225/65R17" },
          { id: "trim-equinox-premier", name: "Premier", oemSize: "235/50R19" },
        ],
      },
    ],
  },
  {
    id: "make-bmw",
    name: "BMW",
    models: [
      {
        id: "model-3series",
        name: "3 Series",
        trims: [
          { id: "trim-330i", name: "330i", oemSize: "225/45R18" },
          { id: "trim-m340i", name: "M340i", oemSize: "225/40R19" },
        ],
      },
      {
        id: "model-x5",
        name: "X5",
        trims: [
          { id: "trim-x5-xdrive40i", name: "xDrive40i", oemSize: "265/50R20" },
          { id: "trim-x5-m", name: "M60i", oemSize: "285/40R22" },
        ],
      },
    ],
  },
  {
    id: "make-subaru",
    name: "Subaru",
    models: [
      {
        id: "model-outback",
        name: "Outback",
        trims: [
          { id: "trim-outback-base", name: "Base", oemSize: "225/65R17" },
          { id: "trim-outback-wilderness", name: "Wilderness", oemSize: "225/60R18" },
        ],
      },
      {
        id: "model-forester",
        name: "Forester",
        trims: [{ id: "trim-forester-premium", name: "Premium", oemSize: "225/60R17" }],
      },
    ],
  },
  {
    id: "make-tesla",
    name: "Tesla",
    models: [
      {
        id: "model-model3",
        name: "Model 3",
        trims: [
          { id: "trim-model3-standard", name: "Standard Range", oemSize: "235/45R18" },
          { id: "trim-model3-performance", name: "Performance", oemSize: "235/35R20" },
        ],
      },
      {
        id: "model-modely",
        name: "Model Y",
        trims: [{ id: "trim-modely-long-range", name: "Long Range", oemSize: "255/45R19" }],
      },
    ],
  },
  {
    id: "make-jeep",
    name: "Jeep",
    models: [
      {
        id: "model-wrangler",
        name: "Wrangler",
        trims: [
          { id: "trim-wrangler-sport", name: "Sport", oemSize: "255/75R17" },
          { id: "trim-wrangler-rubicon", name: "Rubicon", oemSize: "285/70R17" },
        ],
      },
      {
        id: "model-grand-cherokee",
        name: "Grand Cherokee",
        trims: [{ id: "trim-grand-cherokee-limited", name: "Limited", oemSize: "265/50R20" }],
      },
    ],
  },
];

const YEAR_MIN = 2015;
const YEAR_MAX = 2026;

export function getAvailableYears() {
  const years: number[] = [];
  for (let y = YEAR_MAX; y >= YEAR_MIN; y--) years.push(y);
  return years;
}

export function getMakesForYear() {
  return vehicleMakes.map(({ id, name }) => ({ id, name }));
}

export function getModelsForMake(makeId: string) {
  const make = vehicleMakes.find((m) => m.id === makeId);
  return make ? make.models.map(({ id, name }) => ({ id, name })) : [];
}

export function getTrimsForModel(makeId: string, modelId: string) {
  const make = vehicleMakes.find((m) => m.id === makeId);
  const model = make?.models.find((m) => m.id === modelId);
  return model ? model.trims : [];
}

export function resolveVehicleSelection(makeId: string, modelId: string, trimId: string) {
  const make = vehicleMakes.find((m) => m.id === makeId);
  const model = make?.models.find((m) => m.id === modelId);
  const trim = model?.trims.find((t) => t.id === trimId);
  if (!make || !model || !trim) return null;
  return { make: make.name, model: model.name, trim: trim.name, oemSize: trim.oemSize };
}

export { vehicleMakes };
