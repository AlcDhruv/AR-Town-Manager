import { Behaviour, serializable, GameObject } from "@needle-tools/engine";
import { ShowcaseToggler } from "./ShowcaseToggler";

export class GlobalUIController extends Behaviour {

    // Clean reference targets for direct DOM manipulation
    private overlayContainer: HTMLElement | null = null;
    private descriptionCard: HTMLElement | null = null;
    private descriptionText: HTMLElement | null = null;

    // This is called automatically by UIManager.ts when a 3D subcomponent is tapped
    public openUI(descriptionText: string) {
        // 1. Fetch DOM elements directly from your updated index.html layout
        this.overlayContainer = document.querySelector("#global-showcase-ui");
        this.descriptionCard = document.querySelector("#ui-description-card");
        this.descriptionText = document.querySelector("#ui-description-text");

        // 2. Reveal the main transparent interface box wrapper
        if (this.overlayContainer) {
            this.overlayContainer.style.display = "block";
        }
        
        // 3. Keep description popup card hidden until they actively tap the Info button
        if (this.descriptionCard) {
            this.descriptionCard.style.display = "none";
        }

        // 4. Inject the 3D asset description string right into your HTML text node
        if (this.descriptionText) {
            this.descriptionText.innerText = descriptionText;
        }
    }

    public closeShowcase() {
        // Find elements to hide everything safely
        this.overlayContainer = document.querySelector("#global-showcase-ui");
        this.descriptionCard = document.querySelector("#ui-description-card");

        if (this.overlayContainer) this.overlayContainer.style.display = "none";
        if (this.descriptionCard) this.descriptionCard.style.display = "none";

        // Release the camera freezing locks so background map navigation works again
        if (ShowcaseToggler.currentActiveToggler) {
            ShowcaseToggler.currentActiveToggler.toggleShowcase(false);
        }
    }

    public toggleDescription() {
        this.descriptionCard = document.querySelector("#ui-description-card");
        if (!this.descriptionCard) return;
        
        // Lightweight display style toggler
        if (this.descriptionCard.style.display === "none" || this.descriptionCard.style.display === "") {
            this.descriptionCard.style.display = "block";
        } else {
            this.descriptionCard.style.display = "none";
        }
    }
}