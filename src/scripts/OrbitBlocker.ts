import { Behaviour } from "@needle-tools/engine";
import { OrbitControls } from "@needle-tools/engine"; 
import { PrefabRotator } from "./PrefabRotator";

export class OrbitBlocker extends Behaviour {

    private orbitControls: OrbitControls | null = null;

    start() {
        this.orbitControls = this.gameObject.getComponent(OrbitControls);
    }

    update() {
        if (!this.orbitControls) return;

        if (PrefabRotator.isAnyPrefabActive) {
            // Lock background map navigation but keep zoom functional for the model
            this.orbitControls.enableRotate = false;
            this.orbitControls.enableZoom = true; 
            this.orbitControls.enablePan = false;
        } else {
            this.orbitControls.enableRotate = true;
            this.orbitControls.enableZoom = true;
            this.orbitControls.enablePan = true;
        }
    }
}