/* eslint-disable */
import { TypeStore } from "@needle-tools/engine"

// Import types
import { OrbitBlocker } from "../scripts/OrbitBlocker.js";
import { PrefabRotator } from "../scripts/PrefabRotator.js";
import { ShowcaseOverlay } from "../scripts/ShowcaseOverlay.js";
import { ShowcaseToggler } from "../scripts/ShowcaseToggler.js";
import { TownElementSelector } from "../scripts/TownElementSelector.js";

// Register types
export function registerTypes() {
	TypeStore.add("OrbitBlocker", OrbitBlocker);
	TypeStore.add("PrefabRotator", PrefabRotator);
	TypeStore.add("ShowcaseOverlay", ShowcaseOverlay);
	TypeStore.add("ShowcaseToggler", ShowcaseToggler);
	TypeStore.add("TownElementSelector", TownElementSelector);
}
registerTypes();
