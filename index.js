"use strict";
const typeElement = document.querySelector(".type > .input");
const areaElement = document.querySelector(".area > .input");
const glassCountElement = document.querySelector(".amount-windows-mirror > .input");
const roomCountElement = document.querySelector(".amount-rooms > .input");
const accessibilityElement = document.querySelector(".accessibility > .input");
const furnitureWeightElement = document.querySelector(".weight-furniture > .input");
const furnitureSizeElement = document.querySelector(".size-furniture > .input");
const surfaceElement = document.querySelector(".type-surface > .input");
const insideOutsideElement = document.querySelector(".inside-outside > .input");
const priceElement = document.querySelector(".result > .description > .price");
const errorElement = document.querySelector(".error > .description");
const allInputs = [typeElement, areaElement, glassCountElement, roomCountElement, accessibilityElement, furnitureWeightElement, furnitureSizeElement, surfaceElement, insideOutsideElement];
const getType = () => typeElement.value;
const getArea = () => Number(areaElement.value);
const getGlassCount = () => Number(glassCountElement.value);
const getRoomCount = () => Number(roomCountElement.value);
const getAccessibility = () => accessibilityElement.value;
const getFurnitureWeight = () => furnitureWeightElement.value;
const getFurnitureSize = () => furnitureSizeElement.value;
const getSurface = () => surfaceElement.value;
const getIsInside = () => insideOutsideElement.value === "inside";
const getAllInput = () => ({
    type: getType(),
    area: getArea(),
    glassCount: getGlassCount(),
    roomCount: getRoomCount(),
    accessibility: getAccessibility(),
    furnitureWeight: getFurnitureWeight(),
    furnitureSize: getFurnitureSize(),
    surface: getSurface(),
    inside: getIsInside(),
});
// | Auftragart                      | Relevante Informationen                                                                           |
// | ------------------------------- | ------------------------------------------------------------------------------------------------- |
// | Standardreinigung innen & außen | Fläche                                                                                            |
// | Entrümplung Häuser & Garagen    | Fläche                                                                                            |
// | Büro- & Arbeitsplatzreinigung   | Fläche                                                                                            |
// | Grund- & Umzugsreinigung        | Fläche                                                                                            |
// | Bauabschlussreinigung           | Fläche                                                                                            |
// | Glas- & Spiegelreinigung        | Anzahl Spiegel/Fenster                                                                            |
// | Haushaltsauflösungen            | Fläche ($m^2$) <br> Anzahl Räume <br> Leicht zugänglich? <br> Art/Gewichtsklassen der Gegenstände |
// | Sperrmüllentsorgung             | Menge/Größe/Gewicht der Gegenstände <br> Leicht zugänglich?                                       |
// | Hochdruckreinigung              | Fläche <br> Art der Oberfläche <br> Verschmutzungsgrad <br> Außen oder Innen?                     |
const showInput = (element, show) => {
    const parent = element.parentElement;
    if (show)
        parent === null || parent === void 0 ? void 0 : parent.classList.remove("hidden");
    else
        parent === null || parent === void 0 ? void 0 : parent.classList.add("hidden");
};
const showInputForType = (type) => {
    const showArea = type === "standard-cleaning" || type === "decluttering" || type === "office-cleaning" || type === "basic-cleaning" || type === "construction-cleaning" || type === "household-dissolution" || type === "high-pressure-cleaning";
    const showGlassCount = type === "glass-cleaning";
    const showRoomCount = type === "household-dissolution";
    const showAccessibility = type === "household-dissolution" || type === "bulk-waste-disposal";
    const showFurnitureWeight = type === "household-dissolution" || type === "bulk-waste-disposal";
    const showFurnitureSize = type === "household-dissolution" || type === "bulk-waste-disposal";
    const showSurface = type === "high-pressure-cleaning";
    const showInsideOutside = type === "high-pressure-cleaning";
    showInput(areaElement, showArea);
    showInput(glassCountElement, showGlassCount);
    showInput(roomCountElement, showRoomCount);
    showInput(accessibilityElement, showAccessibility);
    showInput(furnitureWeightElement, showFurnitureWeight);
    showInput(furnitureSizeElement, showFurnitureSize);
    showInput(surfaceElement, showSurface);
    showInput(insideOutsideElement, showInsideOutside);
};
typeElement.addEventListener("change", () => {
    showInputForType(getType());
});
showInputForType(getType());
const showPrice = (price) => {
    var _a, _b, _c, _d;
    console.log(price);
    if (price === -1) {
        (_b = (_a = priceElement.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
        return;
    }
    else {
        priceElement.textContent = Math.floor(price) + " €";
        (_d = (_c = priceElement.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.remove("hidden");
    }
};
const showError = (show) => {
    var _a, _b;
    if (show)
        (_a = errorElement.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    else
        (_b = errorElement.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
};
const calculatePrice = () => {
    const data = getAllInput();
    // Check if all required fields (for the selected type) are filled
    if (data.type === "standard-cleaning" || data.type === "decluttering" || data.type === "office-cleaning" || data.type === "basic-cleaning" || data.type === "construction-cleaning" || data.type === "household-dissolution" || data.type === "high-pressure-cleaning") {
        if (data.area === 0 || !data.area) {
            showPrice(-1);
            return;
        }
    }
    if (data.type === "glass-cleaning") {
        if (data.glassCount === 0 || !data.glassCount) {
            showPrice(-1);
            return;
        }
    }
    if (data.type === "household-dissolution") {
        if (data.roomCount === 0) {
            showPrice(-1);
            return;
        }
    }
    if (data.type === "glass-cleaning") {
        showError(true);
    }
    else {
        showError(false);
    }
    // There are more prices in this object, however they are being inserted by the compiler
    const prices = {
        "standard-cleaning": {
            perSquareMeter: 1.8,
        },
        decluttering: {
            perSquareMeter: 12.5,
        },
        "office-cleaning": {
            perSquareMeter: 1.75,
        },
        "basic-cleaning": {
            perSquareMeter: 2,
        },
        "construction-cleaning": {
            perSquareMeter: 2.5,
        },
        "glass-cleaning": {
            perWindow: 5,
        },
        "household-dissolution": {
            perSquareMeter: 2,
            easyAccessibilityMultiplier: 1,
            mediumAccessibilityMultiplier: 1.1,
            hardAccessibilityMultiplier: 1.25,
            lightFurnitureWeightMultiplier: 1,
            mediumFurnitureWeightMultiplier: 1.1,
            heavyFurnitureWeightMultiplier: 1.25,
            smallFurnitureSizeMultiplier: 0.8,
            mediumFurnitureSizeMultiplier: 1,
            largeFurnitureSizeMultiplier: 1.2,
            roomCountAbove5Multiplier: 1.5,
        },
        "bulk-waste-disposal": {
            perSquareMeter: 2,
            lightFurnitureWeightMultiplier: 1,
            mediumFurnitureWeightMultiplier: 1.1,
            heavyFurnitureWeightMultiplier: 1.25,
            smallFurnitureSizeMultiplier: 0.8,
            mediumFurnitureSizeMultiplier: 1,
            largeFurnitureSizeMultiplier: 1.2,
        },
        "high-pressure-cleaning": {
            perSquareMeter: 3,
            woodSurfaceMultiplier: 1,
            stoneSurfaceMultiplier: 1.25,
            plasticSurfaceMultiplier: 1,
            metalSurfaceMultiplier: 1.3,
            carpetSurfaceMultiplier: 1.7,
            insideMultiplier: 1,
            outsideMultiplier: 1.5,
        },
    };
    // Now, for each type, calculate the price
    if (data.type === "standard-cleaning") {
        // Required data: area
        showPrice(data.area * prices["standard-cleaning"].perSquareMeter);
    }
    else if (data.type === "decluttering") {
        // Required data: area
        showPrice(data.area * prices["decluttering"].perSquareMeter);
    }
    else if (data.type === "office-cleaning") {
        // Required data: area
        showPrice(data.area * prices["office-cleaning"].perSquareMeter);
    }
    else if (data.type === "basic-cleaning") {
        // Required data: area
        showPrice(data.area * prices["basic-cleaning"].perSquareMeter);
    }
    else if (data.type === "construction-cleaning") {
        // Required data: area
        showPrice(data.area * prices["construction-cleaning"].perSquareMeter);
    }
    else if (data.type === "glass-cleaning") {
        // Required data: none, show error
        showPrice(-1);
    }
    else if (data.type === "household-dissolution") {
        // Required data: area, roomCount, accessibility, furnitureWeight, furnitureSize
        const accessibilityMultiplier = data.accessibility === "easy" ? prices["household-dissolution"].easyAccessibilityMultiplier : data.accessibility === "medium" ? prices["household-dissolution"].mediumAccessibilityMultiplier : prices["household-dissolution"].hardAccessibilityMultiplier;
        const furnitureWeightMultiplier = data.furnitureWeight === "light" ? prices["household-dissolution"].lightFurnitureWeightMultiplier : data.furnitureWeight === "medium" ? prices["household-dissolution"].mediumFurnitureWeightMultiplier : prices["household-dissolution"].heavyFurnitureWeightMultiplier;
        const furnitureSizeMultiplier = data.furnitureSize === "small" ? prices["household-dissolution"].smallFurnitureSizeMultiplier : data.furnitureSize === "medium" ? prices["household-dissolution"].mediumFurnitureSizeMultiplier : prices["household-dissolution"].largeFurnitureSizeMultiplier;
        showPrice(data.area * prices["household-dissolution"].perSquareMeter * accessibilityMultiplier * (furnitureWeightMultiplier * furnitureSizeMultiplier) * (data.roomCount > 5 ? prices["household-dissolution"].roomCountAbove5Multiplier : 1));
    }
    else if (data.type === "bulk-waste-disposal") {
        // Required data: area, furnitureWeight, furnitureSize
        const furnitureWeightMultiplier = data.furnitureWeight === "light" ? prices["bulk-waste-disposal"].lightFurnitureWeightMultiplier : data.furnitureWeight === "medium" ? prices["bulk-waste-disposal"].mediumFurnitureWeightMultiplier : prices["bulk-waste-disposal"].heavyFurnitureWeightMultiplier;
        const furnitureSizeMultiplier = data.furnitureSize === "small" ? prices["bulk-waste-disposal"].smallFurnitureSizeMultiplier : data.furnitureSize === "medium" ? prices["bulk-waste-disposal"].mediumFurnitureSizeMultiplier : prices["bulk-waste-disposal"].largeFurnitureSizeMultiplier;
        showPrice(data.area * prices["bulk-waste-disposal"].perSquareMeter * furnitureWeightMultiplier * furnitureSizeMultiplier);
    }
    else if (data.type === "high-pressure-cleaning") {
        // Required data: area, surface, inside
        const surfaceMultiplier = data.surface === "wood" ? 1 : data.surface === "stone" ? 1.25 : data.surface === "plastic" ? 1.1 : data.surface === "metal" ? 1.5 : data.surface === "carpet" ? 1.2 : 1;
        const insideMultiplier = data.inside ? 1 : 1.5;
        showPrice(data.area * surfaceMultiplier * insideMultiplier);
    }
};
for (const input of Array.from(allInputs))
    input.addEventListener("input", calculatePrice);
//# sourceMappingURL=index.js.map