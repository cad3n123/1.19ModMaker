let saves = JSON.parse(localStorage.getItem("saves")) == null ? [] : JSON.parse(localStorage.getItem("saves"));

let title = document.getElementById("title");
let modNameInput = document.getElementById("mod-name");
let modIDInput = document.getElementById("mod-id");
let container = document.getElementsByClassName("container")[0];
let leftColumn = document.getElementsByClassName("left-column")[0];
let entityNameInput = document.getElementById("entity-name");
let numberOfInputSlotsInput = document.getElementById("num-input-slots");
let numberOfInputSlots;
let numberOfOutputSlotsInput = document.getElementById("num-output-slots");
let numberOfOutputSlots;
let numberOfProgressArrowsInput = document.getElementById("num-arrows");
let numberOfProgressArrows;
let numberOfProgressBurnsInput = document.getElementById("num-burns");
let numberOfProgressBurns;
let loadDropdownSelect = document.getElementById("load-dropdown");
let GUIContainerContainerDiv = document.getElementById("gui-container-container");
let emptyGUI = document.getElementById("empty-gui");
let emptyGUIX = emptyGUI.getBoundingClientRect().x;
let emptyGUIY = emptyGUI.getBoundingClientRect().y;

class GUIContainer {
    constructor(GUIInfoType) {
        this.GUIInfoType = GUIInfoType;
        this.GUIInfoElements = [];
        this.GUIContainerDiv = document.createElement("div");
        this.GUIContainerDiv.setAttribute("id", (GUIInfoType.toLowerCase()) + "-info-container");
    }

    newGUIInfo() {
        return new GUIInfo(this.GUIInfoType);
    }

    loadGUIInfoElements(newTotal) {
        Array.from(this.GUIContainerDiv.childNodes).forEach(childElement => {
            childElement.remove();
        })

        while (newTotal > this.GUIInfoElements.length) {
            let thisGUIInfo = this.newGUIInfo();
            thisGUIInfo.create();
            this.GUIInfoElements.push(thisGUIInfo.GUIInfoDiv);
        }
        while (newTotal < this.GUIInfoElements.length) {
            this.GUIInfoElements.pop();
        }

        this.GUIInfoElements.forEach(element => {
            this.GUIContainerDiv.appendChild(element);
        });
    }
}

class GUIInputContainer extends GUIContainer {
    constructor() {
        super("input");
    }

    newGUIInfo = function() {
        return new GUIInputInfo();
    }
}
class GUIOutputContainer extends GUIContainer {
    constructor() {
        super("output");
    }

    newGUIInfo = function() {
        return new GUIOutputInfo();
    }
}
class GUIProgressArrowContainer extends GUIContainer {
    constructor() {
        super("progress-arrow");
    }

    newGUIInfo = function() {
        return new GUIProgressArrowInfo();
    }
}
class GUIProgressBurnContainer extends GUIContainer {
    constructor() {
        super("progress-burn");
    }

    newGUIInfo = function() {
        return new GUIProgressBurnInfo();
    }
}

class GUIInfo {
    constructor(type) {
        this.type = type;

        this.startX = 0;
        this.startY = 0;
        this.GUIInfoDiv;
        this.GUIInfoHeader;
        this.GUIInfoStartXLabel;
        this.GUIInfoStartXInput;
        this.GUIInfoStartYLabel;
        this.GUIInfoStartYInput;
    }

    newGUIInfoDiv() {
        this.GUIInfoDiv = document.createElement("div");
        return this.GUIInfoDiv;
    }
    newGUIInfoHeader() {
        this.GUIInfoHeader = document.createElement("h2");
        this.GUIInfoHeader.innerHTML = this.type.charAt(0).toUpperCase() + this.type.slice(1 - this.type.length).toLowerCase() + " Slot";
        return this.GUIInfoHeader;
    }
    newGUIInfoStartXLabel() {
        this.GUIInfoStartXLabel = document.createElement("label");
        this.GUIInfoStartXLabel.innerHTML = "Start X: ";
        return this.GUIInfoStartXLabel;
    }
    newGUIInfoStartXInput() {
        this.GUIInfoStartXInput = document.createElement("input");
        this.GUIInfoStartXInput.setAttribute("type", "number");
        this.GUIInfoStartXInput.value = 0;
        this.GUIInfoStartXInput.addEventListener("change", () => {
            this.setStartX(this.GUIInfoStartXInput.value);
        })
        return this.GUIInfoStartXInput;
    }
    newGUIInfoStartYLabel() {
        this.GUIInfoStartYLabel = document.createElement("label");
        this.GUIInfoStartYLabel.innerHTML = "Start Y: ";
        return this.GUIInfoStartYLabel;
    }
    newGUIInfoStartYInput() {
        this.GUIInfoStartYInput = document.createElement("input");
        this.GUIInfoStartYInput.setAttribute("type", "number");
        this.GUIInfoStartYInput.value = 0;
        this.GUIInfoStartYInput.addEventListener("change", () => {
            this.setStartY(this.GUIInfoStartYInput.value);
        })
        return this.GUIInfoStartYInput;
    }
    defaultCreate() {
        this.newGUIInfoDiv();
        this.GUIInfoDiv.appendChild(this.newGUIInfoHeader());
        this.GUIInfoDiv.appendChild(this.newGUIInfoStartXLabel());
        this.GUIInfoDiv.appendChild(this.newGUIInfoStartXInput());
        this.GUIInfoDiv.appendChild(this.newGUIInfoStartYLabel());
        this.GUIInfoDiv.appendChild(this.newGUIInfoStartYInput());
        return this.GUIInfoDiv;
    }

        /*
        this.newGUIInfoDiv = document.createElement("div");
    
        this.newGUIInfoHeader = document.createElement("h2");
        this.newGUIInfoHeader.innerHTML = this.type.charAt(0).toUpperCase() + this.type.slice(1 - this.type.length).toLowerCase() + " Slot";
    
        this.newGUIInfoStartXLabel = document.createElement("label");
        this.newGUIInfoStartXLabel.innerHTML = "Start X: ";
    
        this.newGUIInfoStartXInput = document.createElement("input");
        this.newGUIInfoStartXInput.setAttribute("type", "number");
        this.newGUIInfoStartXInput.value = 0;
        this.newGUIInfoStartXInput.addEventListener("change", () => {
            this.startX = this.newGUIInfoStartXInput.value;
        })
    
        this.newGUIInfoStartYLabel = document.createElement("label");
        this.newGUIInfoStartYLabel.innerHTML = "Start Y: ";
    
        this.newGUIInfoStartYInput = document.createElement("input");
        this.newGUIInfoStartYInput.setAttribute("type", "number");
        this.newGUIInfoStartYInput.value = 0;
        this.newGUIInfoStartYInput.addEventListener("change", () => {
            this.startY = this.newGUIInfoStartYInput.value;
        })

        if(this.type.toLowerCase() == "progress-arrow" || this.type.toLowerCase() == "progress-burn") {
            this.newGUIInfoEndXLabel = document.createElement("label");
            this.newGUIInfoEndXLabel.innerHTML = "End X: ";
        
            this.newGUIInfoEndXInput = document.createElement("input");
            this.newGUIInfoEndXInput.setAttribute("type", "number");
            this.newGUIInfoEndXInput.value = 0;
            this.newGUIInfoEndXInput.addEventListener("change", () => {
                this.endX = this.newGUIInfoEndXInput.value;
            })
        
            this.newGUIInfoEndYLabel = document.createElement("label");
            this.newGUIInfoEndYLabel.innerHTML = "End Y: ";
        
            this.newGUIInfoEndYInput = document.createElement("input");
            this.newGUIInfoEndYInput.setAttribute("type", "number");
            this.newGUIInfoEndYInput.value = 0;
            this.newGUIInfoEndYInput.addEventListener("change", () => {
                this.endY = this.newGUIInfoEndYInput.value;
            })
        }

        if (this.type.toLowerCase() == "input" || this.type.toLowerCase() == "output") {
            this.newGUIInfoImage = document.createElement("img");
            this.newGUIInfoImage.setAttribute("src", "images/" + this.type.toLowerCase() + "_slot.png");
            this.newGUIInfoImage.setAttribute("class", "gui-info-image");
            this.newGUIInfoImage.style.x = emptyGUIX + (this.startX - (this.type.toLowerCase() == "input" ? 1 : 4)) * 2;
            this.newGUIInfoImage.style.y = emptyGUIY + (this.startY - (this.type.toLowerCase() == "input" ? 1 : 4)) * 2;
        }

        if(this.type.toLowerCase() == "progress-arrow" || this.type.toLowerCase() == "progress-burn") {
            this.newGUIInfoDiv.appendChild(this.newGUIInfoEndXLabel);
            this.newGUIInfoDiv.appendChild(this.newGUIInfoEndXInput);
            this.newGUIInfoDiv.appendChild(this.newGUIInfoEndYLabel);
            this.newGUIInfoDiv.appendChild(this.newGUIInfoEndYInput);
        }
        if (this.type.toLowerCase() == "input" || this.type.toLowerCase() == "output") {
            container.insertBefore(this.newGUIInfoImage, leftColumn);
        }
        */

    setStartX(x) {
        this.startX = x;
        this.GUIInfoStartXInput.value = x;
    }
    setStartY(y) {
        this.startY = y;
        this.GUIInfoStartYInput.value = y;
    }
    setStartXY(x, y) {
        this.startX = x;
        this.startY = y;
        this.GUIInfoStartXInput.value = x;
        this.GUIInfoStartYInput.value = y;
    }
}

class GUIInputInfo extends GUIInfo {
    constructor() {
        super("input");
        this.GUIInfoImage;
    }

    newGUIInfoImage() {
        this.GUIInfoImage = document.createElement("img");
        this.GUIInfoImage.setAttribute("src", "images/" + this.type.toLowerCase() + "_slot.png");
        this.GUIInfoImage.setAttribute("class", "gui-info-image");
        this.GUIInfoImage.style.left = (emptyGUIX + (this.startX) * 2) + "px";
        this.GUIInfoImage.style.top = (-1 + emptyGUIY + (this.startY) * 2) + "px";
        return this.GUIInfoImage;
    }

    create() {
        let div = this.defaultCreate();
        div.appendChild(this.newGUIInfoImage());
        
        return div;
    }

    setStartX(x) {
        this.startX = x;
        this.GUIInfoStartXInput.value = x;
        this.GUIInfoImage.style.left = (emptyGUIX + (this.startX) * 2) + "px";
    }

    setStartY(y) {
        this.startY = y;
        this.GUIInfoStartYInput.value = y;
        this.GUIInfoImage.style.top = (-1 + emptyGUIY + (this.startY) * 2) + "px";
    }

    setStartXY(x, y) {
        this.startX = x;
        this.GUIInfoStartXInput.value = x;
        this.GUIInfoImage.style.left = (emptyGUIX + (this.startX) * 2) + "px";

        this.startY = y;
        this.GUIInfoStartYInput.value = y;
        this.GUIInfoImage.style.top = (-1 + emptyGUIY + (this.startY) * 2) + "px";
    }
}

class GUIOutputInfo extends GUIInfo {
    constructor() {
        super("output");
        this.GUIInfoImage;
    }

    newGUIInfoImage() {
        this.GUIInfoImage = document.createElement("img");
        this.GUIInfoImage.setAttribute("src", "images/" + this.type.toLowerCase() + "_slot.png");
        this.GUIInfoImage.setAttribute("class", "gui-info-image");
        this.GUIInfoImage.style.left = (emptyGUIX + (this.startX) * 2) + "px";
        this.GUIInfoImage.style.top = (-1 + emptyGUIY + (this.startY) * 2) + "px";
        return this.GUIInfoImage;
    }

    create() {
        let div = this.defaultCreate();
        div.appendChild(this.newGUIInfoImage());
        return div;
    }

    setStartX(x) {
        this.startX = x;
        this.GUIInfoStartXInput.value = x;
        this.GUIInfoImage.style.left = (emptyGUIX + (this.startX) * 2) + "px";
    }

    setStartY(y) {
        this.startY = y;
        this.GUIInfoStartYInput.value = y;
        this.GUIInfoImage.style.top = (-1 + emptyGUIY + (this.startY) * 2) + "px";
    }

    setStartXY(x, y) {
        this.startX = x;
        this.GUIInfoStartXInput.value = x;
        this.GUIInfoImage.style.left = (emptyGUIX + (this.startX) * 2) + "px";

        this.startY = y;
        this.GUIInfoStartYInput.value = y;
        this.GUIInfoImage.style.top = (-1 + emptyGUIY + (this.startY) * 2) + "px";
    }
}

class GUIProgressArrowInfo extends GUIInfo {
    constructor() {
        super("progress-arrow");
        this.GUIInfoStartImages = [];
        this.GUIInfoStartImageLength = 1;
        this.GUIInfoEndImage;
    }

    newGUIInfoLengthLabel() {
        this.GUIInfoLengthLabel = document.createElement("label");
        this.GUIInfoLengthLabel.innerHTML = "Length: ";
        return this.GUIInfoLengthLabel;
    }
    newGUIInfoLengthInput() {
        this.GUIInfoLengthInput = document.createElement("input");
        this.GUIInfoLengthInput.setAttribute("type", "number");
        this.GUIInfoLengthInput.value = 1;
        this.GUIInfoLengthInput.addEventListener("change", () => {
            this.setLength(this.GUIInfoLengthInput.value);
        })
        return this.GUIInfoLengthInput;
    }

    newGUIInfoStartImages() {
        let firstX = 0;
        let firstY = 0;
        for (let index = 0; index < this.GUIInfoStartImageLength; index++) {

            let GUIInfoImage = document.createElement("img");
            GUIInfoImage.setAttribute("src", "images/" + this.type.toLowerCase() + "-horizontal-start.png");
            GUIInfoImage.setAttribute("class", "gui-info-image");
            
            GUIInfoImage.style.left = (emptyGUIX + firstX + this.startX * 2) + "px";
            GUIInfoImage.style.top = (-1 + emptyGUIY + firstY + this.startY * 2) + "px";

            this.GUIInfoStartImages.push(GUIInfoImage);
            GUIInfoImage = undefined;

            firstX++;
        }

        return this.GUIInfoStartImages;
    }

    create() {
        let div = this.defaultCreate();
        div.appendChild(this.newGUIInfoLengthLabel());
        div.appendChild(this.newGUIInfoLengthInput());

        let startImages = this.newGUIInfoStartImages();
        console.log(startImages);
        startImages.forEach(startImage => {
            console.log(startImage);
            div.appendChild(startImage);
        });

        return div;
    }

    setStartX(x) {
        this.startX = x;
        let firstX = x;
        this.GUIInfoStartImages.forEach(startImage => {
            startImage.style.left = (emptyGUIX + (firstX) * 2) + "px";
            firstX++;
        })
    }

    setStartY(y) {
        this.startY = y;
        let firstY = y;
        this.GUIInfoStartImages.forEach(startImage => {
            startImage.style.top = (emptyGUIY + (firstY) * 2) + "px";
        })
    }

    setStartXY(x, y) {
        this.startX = x;
        let firstX = x;
        this.GUIInfoStartImages.forEach(startImage => {
            startImage.style.left = (emptyGUIX + (firstX) * 2) + "px";
            firstX++;
        })

        this.startY = y;
        let firstY = y;
        this.GUIInfoStartImages.forEach(startImage => {
            startImage.style.top = (emptyGUIY + (firstY) * 2) + "px";
            firstY++;
        })
    }

    setLength(length) {

        this.GUIInfoStartImages.forEach(startImage => {
            startImage.remove();
        })

        this.GUIInfoStartImages = []

        this.GUIInfoStartImageLength = length;

        let div = this.GUIInfoDiv;
        let startImages = this.newGUIInfoStartImages();
        console.log(startImages);
        startImages.forEach(startImage => {
            console.log(startImage);
            div.appendChild(startImage);
        });

        return div;
    }
}

let inputSlotInfoContainer = new GUIInputContainer();
let outputSlotInfoContainer = new GUIOutputContainer();
let progressArrowInfoContainer = new GUIProgressArrowContainer();
let progressBurnInfoContainer = new GUIContainer("progress-burn");

GUIContainerContainerDiv.appendChild(inputSlotInfoContainer.GUIContainerDiv);
GUIContainerContainerDiv.appendChild(outputSlotInfoContainer.GUIContainerDiv);
GUIContainerContainerDiv.appendChild(progressArrowInfoContainer.GUIContainerDiv);
GUIContainerContainerDiv.appendChild(progressBurnInfoContainer.GUIContainerDiv);

window.onload = () => {
}


// Save button click event handler
document.getElementById("save-button").addEventListener("click", function() {
    var saveName = prompt("Enter a name for your save:");
    if (saveName) {

    }
});

// Load button click event handler
document.getElementById("load-button").addEventListener("click", function() {
    var selectedSave = document.getElementById("load-dropdown").value;

});

// Delete button click event handler
document.getElementById("delete-button").addEventListener("click", function() {
    var selectedSave = document.getElementById("load-dropdown").value;

});

numberOfInputSlotsInput.addEventListener("change", () => {
    inputSlotInfoContainer.loadGUIInfoElements(numberOfInputSlotsInput.value);
})

numberOfOutputSlotsInput.addEventListener("change", () => {
    outputSlotInfoContainer.loadGUIInfoElements(numberOfOutputSlotsInput.value);
})

numberOfProgressArrowsInput.addEventListener("change", () => {
    progressArrowInfoContainer.loadGUIInfoElements(numberOfProgressArrowsInput.value);
})

numberOfProgressBurnsInput.addEventListener("change", () => {
    progressBurnInfoContainer.loadGUIInfoElements(numberOfProgressBurnsInput.value);
})