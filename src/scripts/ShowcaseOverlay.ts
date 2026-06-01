import { Behaviour, GameObject } from "@needle-tools/engine";
import { Vector3, Object3D } from "three";

export class ShowcaseOverlay extends Behaviour {

    private spawnedElement: Object3D | null = null;
    private touchTracking = false;

    async openShowcase(prefabName: string) {
        // 1. Clean up old elements cleanly
        if (this.spawnedElement) {
            this.gameObject.remove(this.spawnedElement);
            this.spawnedElement = null;
        }

        // 2. Look up the prefab blueprint template by name from Needle's asset cache
        const registry = (this.context as any).assets;
        if (!registry) return;

        try {
            // Find the template file safely
            const sourcePrefab = await registry.load(prefabName);
            
            if (sourcePrefab && typeof sourcePrefab.clone === "function") {
                // Clone the raw Three.js nodes directly bypassing the wrapper logic entirely
                const clone = sourcePrefab.clone(true);
                
                this.spawnedElement = clone as Object3D;
                this.gameObject.add(this.spawnedElement);

                // 3. Position and scale beautifully
                this.spawnedElement.position.set(0, 0, -1.5);
                this.spawnedElement.rotation.set(0, 0, 0, 1);
                this.spawnedElement.scale.set(150, 150, 150);
            }
        } catch (err) {
            // Safe logging without circular references
            const errMsg = err instanceof Error ? err.message : String(err);
            console.error("Asset placement roadblock parsed:", errMsg);
        }
    }

    update() {
        const input = this.context.input;

        if (input.getPointerDown(0)) this.touchTracking = true;
        if (input.getPointerUp(0)) this.touchTracking = false;

        if (this.touchTracking && this.spawnedElement) {
            const motionDelta = input.deltaPosition; 
            if (motionDelta) {
                this.spawnedElement.rotateOnWorldAxis(new Vector3(0, 1, 0), motionDelta.x * 0.01);
                this.spawnedElement.rotateOnWorldAxis(new Vector3(1, 0, 0), motionDelta.y * 0.01);
            }
        }
    }
}