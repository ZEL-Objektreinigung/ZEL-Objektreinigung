type Type = "standard-cleaning" | "decluttering" | "office-cleaning" | "basic-cleaning" | "construction-cleaning" | "glass-cleaning" | "household-dissolution" | "bulk-waste-disposal" | "high-pressure-cleaning";
type Area = number;
type GlassCount = number;
type RoomCount = number;
type Accessibility = "easy" | "medium" | "hard";
type FurnitureWeight = "light" | "medium" | "heavy";
type FurnitureSize = "small" | "medium" | "large";
type Surface = "wood" | "stone" | "plastic" | "metal" | "carpet";
type InsideOutside = "inside" | "outside";

type All = {
	type: Type;
	area: Area;
	glassCount: GlassCount;
	roomCount: RoomCount;
	accessibility: Accessibility;
	furnitureWeight: FurnitureWeight;
	furnitureSize: FurnitureSize;
	surface: Surface;
	inside: boolean;
};

const typeElement = document.querySelector(".type > .input") as HTMLSelectElement;
const areaElement = document.querySelector(".area > .input") as HTMLInputElement;
const glassCountElement = document.querySelector(".amount-windows-mirror > .input") as HTMLInputElement;
const roomCountElement = document.querySelector(".amount-rooms > .input") as HTMLInputElement;
const accessibilityElement = document.querySelector(".accessibility > .input") as HTMLSelectElement;
const furnitureWeightElement = document.querySelector(".weight-furniture > .input") as HTMLSelectElement;
const furnitureSizeElement = document.querySelector(".size-furniture > .input") as HTMLSelectElement;
const surfaceElement = document.querySelector(".type-surface > .input") as HTMLSelectElement;
const insideOutsideElement = document.querySelector(".inside-outside > .input") as HTMLSelectElement;
const priceElement = document.querySelector(".result > .description > .price") as HTMLInputElement;

const allInputs = [typeElement, areaElement, glassCountElement, roomCountElement, accessibilityElement, furnitureWeightElement, furnitureSizeElement, surfaceElement, insideOutsideElement];

const getType = (): Type => typeElement.value as Type;
const getArea = (): Area => Number(areaElement.value);
const getGlassCount = (): GlassCount => Number(glassCountElement.value);
const getRoomCount = (): RoomCount => Number(roomCountElement.value);
const getAccessibility = (): Accessibility => accessibilityElement.value as Accessibility;
const getFurnitureWeight = (): FurnitureWeight => furnitureWeightElement.value as FurnitureWeight;
const getFurnitureSize = (): FurnitureSize => furnitureSizeElement.value as FurnitureSize;
const getSurface = (): Surface => surfaceElement.value as Surface;
const getIsInside = (): boolean => (insideOutsideElement.value as InsideOutside) === "inside";

const getAllInput = (): All => ({
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

const showInput = (element: HTMLElement, show: boolean): void => {
	const parent = element.parentElement;

	if (show) parent?.classList.remove("hidden");
	else parent?.classList.add("hidden");
};

const showInputForType = (type: Type): void => {
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

const showPrice = (price: number): void => {
	console.log(price);

	if (price === -1) {
		priceElement.parentElement?.parentElement?.classList.add("hidden");
		return;
	} else {
		priceElement.textContent = Math.floor(price) + " €";
		priceElement.parentElement?.parentElement?.classList.remove("hidden");
	}
};

const calculatePrice = (): void => {
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

	// There are more prices in this object, however they are being inserted by the compiler
	const prices: Record<Type, Record<string, any>> = {
		"standard-cleaning": {
			perSquareMeter: 10,
		},
		decluttering: {
			perSquareMeter: 15,
		},
		"office-cleaning": {
			perSquareMeter: 8,
		},
		"basic-cleaning": {
			perSquareMeter: 12,
		},
		"construction-cleaning": {
			perSquareMeter: 20,
		},
		"glass-cleaning": {
			perWindow: 5,
		},
		"household-dissolution": {
			perSquareMeter: 10,

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
			perSquareMeter: 5,

			lightFurnitureWeightMultiplier: 1,
			mediumFurnitureWeightMultiplier: 1.1,
			heavyFurnitureWeightMultiplier: 1.25,

			smallFurnitureSizeMultiplier: 0.8,
			mediumFurnitureSizeMultiplier: 1,
			largeFurnitureSizeMultiplier: 1.2,
		},
		"high-pressure-cleaning": {
			perSquareMeter: 15,

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
	} else if (data.type === "decluttering") {
		// Required data: area
		showPrice(data.area * prices["decluttering"].perSquareMeter);
	} else if (data.type === "office-cleaning") {
		// Required data: area
		showPrice(data.area * prices["office-cleaning"].perSquareMeter);
	} else if (data.type === "basic-cleaning") {
		// Required data: area
		showPrice(data.area * prices["basic-cleaning"].perSquareMeter);
	} else if (data.type === "construction-cleaning") {
		// Required data: area
		showPrice(data.area * prices["construction-cleaning"].perSquareMeter);
	} else if (data.type === "glass-cleaning") {
		// Required data: area
		showPrice(data.glassCount * prices["glass-cleaning"].perWindow);
	} else if (data.type === "household-dissolution") {
		// Required data: area, roomCount, accessibility, furnitureWeight, furnitureSize

		const accessibilityMultiplier = data.accessibility === "easy" ? prices["household-dissolution"].easyAccessibilityMultiplier : data.accessibility === "medium" ? prices["household-dissolution"].mediumAccessibilityMultiplier : prices["household-dissolution"].hardAccessibilityMultiplier;
		const furnitureWeightMultiplier = data.furnitureWeight === "light" ? prices["household-dissolution"].lightFurnitureWeightMultiplier : data.furnitureWeight === "medium" ? prices["household-dissolution"].mediumFurnitureWeightMultiplier : prices["household-dissolution"].heavyFurnitureWeightMultiplier;
		const furnitureSizeMultiplier = data.furnitureSize === "small" ? prices["household-dissolution"].smallFurnitureSizeMultiplier : data.furnitureSize === "medium" ? prices["household-dissolution"].mediumFurnitureSizeMultiplier : prices["household-dissolution"].largeFurnitureSizeMultiplier;

		showPrice(data.area * prices["household-dissolution"].perSquareMeter * accessibilityMultiplier * (furnitureWeightMultiplier * furnitureSizeMultiplier) * (data.roomCount > 5 ? prices["household-dissolution"].roomCountAbove5Multiplier : 1));
	} else if (data.type === "bulk-waste-disposal") {
		// Required data: area, furnitureWeight, furnitureSize

		const furnitureWeightMultiplier = data.furnitureWeight === "light" ? prices["bulk-waste-disposal"].lightFurnitureWeightMultiplier : data.furnitureWeight === "medium" ? prices["bulk-waste-disposal"].mediumFurnitureWeightMultiplier : prices["bulk-waste-disposal"].heavyFurnitureWeightMultiplier;
		const furnitureSizeMultiplier = data.furnitureSize === "small" ? prices["bulk-waste-disposal"].smallFurnitureSizeMultiplier : data.furnitureSize === "medium" ? prices["bulk-waste-disposal"].mediumFurnitureSizeMultiplier : prices["bulk-waste-disposal"].largeFurnitureSizeMultiplier;

		showPrice(data.area * prices["bulk-waste-disposal"].perSquareMeter * furnitureWeightMultiplier * furnitureSizeMultiplier);
	} else if (data.type === "high-pressure-cleaning") {
		// Required data: area, surface, inside

		const surfaceMultiplier = data.surface === "wood" ? 1 : data.surface === "stone" ? 1.25 : data.surface === "plastic" ? 1.1 : data.surface === "metal" ? 1.5 : data.surface === "carpet" ? 1.2 : 1;
		const insideMultiplier = data.inside ? 1 : 1.5;

		showPrice(data.area * surfaceMultiplier * insideMultiplier);
	}
};

for (const input of Array.from(allInputs)) input.addEventListener("input", calculatePrice);
