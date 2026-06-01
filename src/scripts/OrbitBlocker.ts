import { Behaviour, serializable } from "@needle-tools/engine";
import { OrbitControls } from "@needle-tools/engine"; // Import native web orbit reference
import { PrefabRotator } from "./PrefabRotator";

export class OrbitBlocker extends Behaviour {

    private orbitControls: OrbitControls | null = null;

    start() {
        // Find the native web orbit controls attached to this object or camera
        this.orbitControls = this.gameObject.getComponent(OrbitControls);
    }

    update() {
        if (!this.orbitControls) return;

        // If a summonable model is open, flip native web inputs off!
        if (PrefabRotator.isAnyPrefabActive) {
            this.orbitControls.enableRotate = false;
            this.orbitControls.enableZoom = false;
            this.orbitControls.enablePan = false;
        } else {
            // Re-enable everything to default when showcase is closed
            this.orbitControls.enableRotate = true;
            this.orbitControls.enableZoom = true;
            this.orbitControls.enablePan = true;
        }
    }
}