import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D, Vector2 } from "three";

export class PrefabRotator extends Behaviour {

    @serializable(Number)
    public rotationSpeedX: number = 1.0;

    @serializable(Number)
    public rotationSpeedY: number = 1.0;

    public static isAnyPrefabActive: boolean = false;

    private touchTracking = false;

    update() {
        const nativeObj = this.gameObject as unknown as Object3D;
        
        if (!nativeObj || !nativeObj.visible) {
            return;
        }

        PrefabRotator.isAnyPrefabActive = true;

        const input = this.context.input;

        if (input.getPointerDown(0)) {
            this.touchTracking = true;
        }
        
        if (input.getPointerUp(0)) {
            this.touchTracking = false;
        }

        if (this.touchTracking) {
            // FIX: Use the official Needle API method to get the pointer movement delta vector cleanly
            const motionDelta = input.getPointerPositionDelta(0) as Vector2; 
            
            if (motionDelta && (motionDelta.x !== 0 || motionDelta.y !== 0)) {
                
                // Read the standard x and y coordinates from the returned Vector2
                const deltaYaw = motionDelta.x * this.rotationSpeedY * 0.05;
                const deltaPitch = motionDelta.y * this.rotationSpeedX * 0.05;

                // Force local transformations on the main object container
                nativeObj.rotation.y += deltaYaw;
                nativeObj.rotation.x += deltaPitch;

                // Traverse and update children mesh elements directly
                nativeObj.traverse((child) => {
                    if (child instanceof Object3D && child !== nativeObj) {
                        child.rotation.y += deltaYaw;
                        child.rotation.x += deltaPitch;
                    }
                });
            }
        }
    }

    onDisable() {
        PrefabRotator.isAnyPrefabActive = false;
        this.touchTracking = false;
    }
}