import { Behaviour, serializable, GameObject } from "@needle-tools/engine";
import { PrefabRotator } from "./PrefabRotator";
import { UIManager } from "./UIManager";

export class ShowcaseToggler extends Behaviour {

    @serializable(GameObject)
    public showcaseObject?: GameObject;

    public static currentActiveToggler: ShowcaseToggler | null = null;

    onPointerClick() {
        if (!this.showcaseObject) return;
        this.toggleShowcase(true);
    }

    public toggleShowcase(state: boolean) {
        if (!this.showcaseObject) return;
        const nativeTarget = (this.showcaseObject as any).gameObject || this.showcaseObject;

        if (state && ShowcaseToggler.currentActiveToggler && ShowcaseToggler.currentActiveToggler !== this) {
            ShowcaseToggler.currentActiveToggler.toggleShowcase(false);
        }

        nativeTarget.visible = state;

        if (state) {
            ShowcaseToggler.currentActiveToggler = this;
            PrefabRotator.isAnyPrefabActive = true;

            // Talk to the active UIManager to wake up the hidden canvas
            const rotatorScript = this.showcaseObject.getComponent(PrefabRotator);
            if (rotatorScript && UIManager.instance) {
                UIManager.instance.showUI(rotatorScript.assetDescription);
            }
        } else {
            if (ShowcaseToggler.currentActiveToggler === this) {
                ShowcaseToggler.currentActiveToggler = null;
                PrefabRotator.isAnyPrefabActive = false;
            }
        }
    }
}