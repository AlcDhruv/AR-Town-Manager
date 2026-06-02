import { Behaviour } from "@needle-tools/engine";
import { ShowcaseToggler } from "./ShowcaseToggler";

export class UIManager extends Behaviour {

    public static instance: UIManager | null = null;

    // DOM Element Reference Caching
    private overlayContainer: HTMLElement | null = null;
    private descriptionCard: HTMLElement | null = null;
    private descriptionText: HTMLElement | null = null;
    private closeButton: HTMLElement | null = null;
    private infoButton: HTMLElement | null = null;

    awake() {
        UIManager.instance = this;
    }

    onEnable() {
        // Query elements directly from index.html DOM layout
        this.overlayContainer = document.querySelector("#global-showcase-ui");
        this.descriptionCard = document.querySelector("#ui-description-card");
        this.descriptionText = document.querySelector("#ui-description-text");
        this.closeButton = document.querySelector("#ui-close-btn");
        this.infoButton = document.querySelector("#ui-info-btn");

        // Hook up web pointer listeners securely
        if (this.closeButton) this.closeButton.addEventListener("click", this.handleCloseClicked);
        if (this.infoButton) this.infoButton.addEventListener("click", this.handleInfoToggle);
    }

    onDisable() {
        // Clean up event listeners on destruction to safeguard browser performance
        if (this.closeButton) this.closeButton.removeEventListener("click", this.handleCloseClicked);
        if (this.infoButton) this.infoButton.removeEventListener("click", this.handleInfoToggle);
    }

    public showUI(descriptionText: string) {
        // Reveal the main container overlay wrapper
        if (this.overlayContainer) this.overlayContainer.style.display = "block";
        
        // Always reset the description text block to hidden until info button is toggled
        if (this.descriptionCard) this.descriptionCard.style.display = "none";

        // Push unique asset information strings directly onto screen text block
        if (this.descriptionText) {
            this.descriptionText.innerText = descriptionText;
        }
    }

    private handleCloseClicked = () => {
        // Hide the overlay interface nodes instantly
        if (this.overlayContainer) this.overlayContainer.style.display = "none";
        if (this.descriptionCard) this.descriptionCard.style.display = "none";

        // Release rotation camera locking targets inside city components
        if (ShowcaseToggler.currentActiveToggler) {
            ShowcaseToggler.currentActiveToggler.toggleShowcase(false);
        }
    }

    private handleInfoToggle = () => {
        if (!this.descriptionCard) return;
        
        // Simple toggle switcher logic
        if (this.descriptionCard.style.display === "none" || this.descriptionCard.style.display === "") {
            this.descriptionCard.style.display = "block";
        } else {
            this.descriptionCard.style.display = "none";
        }
    }
}