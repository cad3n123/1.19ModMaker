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
let emptyGUIX = emptyGUI.getBoundingClientRect().x - (emptyGUI.clientWidth)/2;
let emptyGUIY = emptyGUI.getBoundingClientRect().y - (emptyGUI.clientHeight)/2;

class GUIContainer {
    constructor(GUIInfoType) {
        this.GUIInfoType = GUIInfoType;
        this.GUIInfoElements = [];
        this.GUIContainerDiv = document.createElement("div");
        this.GUIContainerDiv.setAttribute("id", (GUIInfoType.toLowerCase()) + "-info-container");
    }

    loadGUIInfoElements(newTotal) {
        Array.from(this.GUIContainerDiv.childNodes).forEach(childElement => {
            childElement.remove();
        })

        while (newTotal > this.GUIInfoElements.length) {
            this.GUIInfoElements.push(new GUIInfo(this.GUIInfoType).newGUIInfoDiv);
        }
        while (newTotal < this.GUIInfoElements.length) {
            this.GUIInfoElements.pop();
        }

        this.GUIInfoElements.forEach(element => {
            this.GUIContainerDiv.appendChild(element);
        });
    }
}

class GUIInfo {
    constructor(type) {
        this.type = type;

        this.startX = 0;
        this.startY = 0;

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

        this.newGUIInfoDiv.appendChild(this.newGUIInfoHeader);
        this.newGUIInfoDiv.appendChild(this.newGUIInfoStartXLabel);
        this.newGUIInfoDiv.appendChild(this.newGUIInfoStartXInput);
        this.newGUIInfoDiv.appendChild(this.newGUIInfoStartYLabel);
        this.newGUIInfoDiv.appendChild(this.newGUIInfoStartYInput);
        if(this.type.toLowerCase() == "progress-arrow" || this.type.toLowerCase() == "progress-burn") {
            this.newGUIInfoDiv.appendChild(this.newGUIInfoEndXLabel);
            this.newGUIInfoDiv.appendChild(this.newGUIInfoEndXInput);
            this.newGUIInfoDiv.appendChild(this.newGUIInfoEndYLabel);
            this.newGUIInfoDiv.appendChild(this.newGUIInfoEndYInput);
        }
        if (this.type.toLowerCase() == "input" || this.type.toLowerCase() == "output") {
            container.insertBefore(this.newGUIInfoImage, leftColumn);
        }
    }

    setX(x) {
        this.startX = x;
        this.newGUIInfoStartXInput.value = x;
    }
    setY(y) {
        this.startY = y;
        this.newGUIInfoStartYInput.value = y;
    }
    setXY(x, y) {
        this.startX = x;
        this.startY = y;
        this.newGUIInfoStartXInput.value = x;
        this.newGUIInfoStartYInput.value = y;
    }
}

let inputSlotInfoContainer = new GUIContainer("input");
let outputSlotInfoContainer = new GUIContainer("output");
let progressArrowInfoContainer = new GUIContainer("progress-arrow");
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