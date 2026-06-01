import { Behaviour, serializable, GameObject } from "@needle-tools/engine";
import { PrefabRotator } from "./PrefabRotator";

export class ShowcaseToggler extends Behaviour {

    @serializable(GameObject)
    public showcaseObject?: GameObject;

    private static currentActive: any = null;

    onPointerClick() {
        if (!this.showcaseObject) return;

        const nativeTarget = (this.showcaseObject as any).gameObject || this.showcaseObject;

        if (ShowcaseToggler.currentActive && ShowcaseToggler.currentActive !== nativeTarget) {
            ShowcaseToggler.currentActive.visible = false;
        }

        nativeTarget.visible = !nativeTarget.visible;

        if (nativeTarget.visible) {
            ShowcaseToggler.currentActive = nativeTarget;
            PrefabRotator.isAnyPrefabActive = true; // Engage the background input blocker
        } else {
            if (ShowcaseToggler.currentActive === nativeTarget) {
                ShowcaseToggler.currentActive = null;
                PrefabRotator.isAnyPrefabActive = false; // Disengage the lock
            }
        }
    }
}