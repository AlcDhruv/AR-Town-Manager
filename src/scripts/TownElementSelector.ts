import { Behaviour, serializable } from "@needle-tools/engine";
import { ShowcaseOverlay } from "./ShowcaseOverlay";

export class TownElementSelector extends Behaviour {

    // Using a string avoids any Unity assignment mismatch loops
    @serializable(String)
    public standaloneModelName: string = "";

    @serializable(ShowcaseOverlay)
    public overlayController?: ShowcaseOverlay;

    onPointerClick() {
        if (!this.standaloneModelName || !this.overlayController) {
            return;
        }
        
        this.overlayController.openShowcase(this.standaloneModelName);
    }
}