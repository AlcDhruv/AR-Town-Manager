/* eslint-disable */
import { TypeStore } from "@needle-tools/engine"

// Import types
import { GlobalUIController } from "../scripts/GlobalUIController.js";
import { OrbitBlocker } from "../scripts/OrbitBlocker.js";
import { PrefabRotator } from "../scripts/PrefabRotator.js";
import { ShowcaseToggler } from "../scripts/ShowcaseToggler.js";
import { UIManager } from "../scripts/UIManager.js";

// Register types
export function registerTypes() {
	TypeStore.add("GlobalUIController", GlobalUIController);
	TypeStore.add("OrbitBlocker", OrbitBlocker);
	TypeStore.add("PrefabRotator", PrefabRotator);
	TypeStore.add("ShowcaseToggler", ShowcaseToggler);
	TypeStore.add("UIManager", UIManager);
}
registerTypes();
