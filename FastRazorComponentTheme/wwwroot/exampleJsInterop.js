
// Import fast components to change the dark and light themes
import { neutralLayerCardContainerBehavior } from "https://unpkg.com/@fluentui/web-components";
import { parseColorString } from "https://unpkg.com/@fluentui/web-components";
import { createColorPalette } from "https://unpkg.com/@microsoft/fast-components";


// Initialize the fast color palette with dark theme by default.
export function initDesignSystemProvider() {

    //  Get the fluent-design-system-designSystemProvider to configure
    const designSystemProvider = document.querySelector("fluent-design-system-provider");

    //  Default parameters
    designSystemProvider.density = 0;
    designSystemProvider.designUnit = 4;
    designSystemProvider.baseHeightMultiplier = 10;
    designSystemProvider.baseHorizontalSpacingMultiplier = 3;
    designSystemProvider.cornerRadius = 3;
    designSystemProvider.outlineWidth = 1;
    designSystemProvider.focusOutlineWidth = 2;
    designSystemProvider.disabledOpacity = 0.3;

    // Tells the fluent-design-system-provider to create the layer CSS custom property
    designSystemProvider.registerCSSCustomProperty(neutralLayerCardContainerBehavior);

    // Tells the design-system-provider to use the above as the CSS background for the region
    designSystemProvider.style.setProperty("background-color", `var(--${neutralLayerCardContainerBehavior.name})`);
}

// Initialize the fast color palette.
export function setColorLayerLuminance(layerLuminance) {
    var designSystemProvider = document.querySelector("fluent-design-system-provider");

    // Update the baseLayerLuminance to reflect the selected style.
    designSystemProvider.baseLayerLuminance = parseFloat(layerLuminance).toFixed(2);

    // Update accent color
    updateAccentColor(designSystemProvider, layerLuminance);

    // Update the background color based on evaluated color recipe.
    updateBackgroundColor(designSystemProvider);

    // Update neutral color
    updateNeutralColor(designSystemProvider);
}

// Update Accent color on design provider
function updateAccentColor(designSystemProvider) {
    var accentBaseColor = "#e1a054";
    designSystemProvider.accentBaseColor = accentBaseColor;
    const accentPalette = createColorPalette(parseColorString(accentBaseColor));
    designSystemProvider.accentPalette = accentPalette;
}

// Update neutral color on design provider
function updateNeutralColor(designSystemProvider, layerLuminance) {
    var neutralColor = "#808080";
    const neutralPalette = createColorPalette(parseColorString(neutralColor));
    designSystemProvider.neutralPalette = neutralPalette;
}

// Update background color on design provider
function updateBackgroundColor(designSystemProvider) {
    designSystemProvider.backgroundColor = (neutralLayerCardContainerBehavior.value)(designSystemProvider.designSystem);
}
