let saves = JSON.parse(localStorage.getItem("saves")) == null ? [] : JSON.parse(localStorage.getItem("saves"));

let modNameInput = document.getElementById("mod-name");
let modIDInput = document.getElementById("mod-id");
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
let inputSlotInfoContainer = Array.from(document.getElementsByClassName("input-slot-info-container"))[0];
let inputSlotInfoSections = [];
let outputSlotInfoContainer = Array.from(document.getElementsByClassName("output-slot-info-container"))[0];
let outputSlotInfoSections = [];



class GUIElementTemplate {
    constructor(type) {
        this.x = 0;
        this.y = 0;
        
        this.newGUIElementDiv = document.createElement("div");
    
        this.newGUIElementHeader = document.createElement("h2");
        this.newGUIElementHeader.innerHTML = type + " Slot";
    
        this.newGUIElementXLabel = document.createElement("label");
        this.newGUIElementXLabel.innerHTML = "X: ";
    
        this.newGUIElementXInput = document.createElement("input");
        this.newGUIElementXInput.setAttribute("type", "number");
        this.newGUIElementXInput.value = 0;
        this.newGUIElementXInput.addEventListener("change", () => {
            this.x = this.newGUIElementXInput.value;
        })
    
        this.newGUIElementYLabel = document.createElement("label");
        this.newGUIElementYLabel.innerHTML = "Y: ";
    
        this.newGUIElementYInput = document.createElement("input");
        this.newGUIElementYInput.setAttribute("type", "number");
        this.newGUIElementYInput.value = 0;
        this.newGUIElementYInput.addEventListener("change", () => {
            this.y = this.newGUIElementYInput.value;
        })
        
        
        this.newGUIElementDiv.appendChild(this.newGUIElementHeader);
        this.newGUIElementDiv.appendChild(this.newGUIElementXLabel);
        this.newGUIElementDiv.appendChild(this.newGUIElementXInput);
        this.newGUIElementDiv.appendChild(this.newGUIElementYLabel);
        this.newGUIElementDiv.appendChild(this.newGUIElementYInput);
    }

    setX(x) {
        this.x = x;
        this.newGUIElementXInput.value = x;
    }
    setY(y) {
        this.y = y;
        this.newGUIElementYInput.value = y;
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.newGUIElementXInput.value = x;
        this.newGUIElementYInput.value = y;
    }
}

class InputSlot extends GUIElementTemplate {
    constructor() {
        super("Input");
    }
}

class OutputSlot extends GUIElementTemplate {
    constructor() {
        super("Output");
    }
}
window.onload = () => {
    updateLoadDropdown()
}

function makeNewOption(save) {
    newOption = document.createElement("option");
    newOption.value = save.saveName;
    newOption.innerHTML = save.saveName;
    return newOption;
}

function updateLoadDropdown() {
    saves = JSON.parse(localStorage.getItem("saves")) == null ? [] : JSON.parse(localStorage.getItem("saves"));

    Array.from(loadDropdownSelect.children).forEach(element => {
        element.remove();
    });
    

    newOption = document.createElement("option");
    newOption.value = "";
    newOption.innerHTML = "Select Save...";
    loadDropdownSelect.appendChild(newOption);
    
    saves.forEach(save => {
        loadDropdownSelect.appendChild(makeNewOption(save));
    });
}

// Save button click event handler
document.getElementById("save-button").addEventListener("click", function() {
    var saveName = prompt("Enter a name for your save:");
    if (saveName) {

        save = {
            saveName: saveName,
            modName: modNameInput.value,
            modID: modIDInput.value,
            entityName: entityNameInput.value,
            numberOfInputSlots: numberOfInputSlotsInput.value,
            numberOfOutputSlots: numberOfOutputSlotsInput.value,
            numberOfProgressArrows: numberOfProgressArrowsInput.value,
            numberOfProgressBurns: numberOfProgressBurnsInput.value,
            inputSlotInfoSections: inputSlotInfoSections,
            outputSlotInfoSections: outputSlotInfoSections
        }
        let saveNameExists = false;
        let index = 0;
        let existingIndex;
        saves.forEach(existingSave => {
            if (existingSave.saveName == save.saveName) {
                saveNameExists = true;
                existingIndex = index;
            }
            index++;
        });

        
        console.log("Everything being saved: ");
        console.log(saves);
        if (saveNameExists) {
            saves[existingIndex] = save;
            localStorage.setItem("saves", JSON.stringify(saves));
        } else {
            saves.push(save);
            localStorage.setItem("saves", JSON.stringify(saves));
            updateLoadDropdown();
        }
    }
});

// Load button click event handler
document.getElementById("load-button").addEventListener("click", function() {
    saves = JSON.parse(localStorage.getItem("saves")) == null ? [] : JSON.parse(localStorage.getItem("saves"));
    var selectedSave = document.getElementById("load-dropdown").value;

    console.log("Everything being loaded: ");
    console.log(saves);
    
    saves.forEach(existingSave => {
        if (existingSave.saveName == selectedSave) {
            modNameInput.value = existingSave.modName;
            modIDInput.value = existingSave.modID;
            entityNameInput.value = existingSave.entityName;
            numberOfInputSlotsInput.value = existingSave.numberOfInputSlots;
            numberOfOutputSlotsInput.value = existingSave.numberOfOutputSlots;
            numberOfProgressArrowsInput.value = existingSave.numberOfProgressArrows;
            numberOfProgressBurnsInput.value = existingSave.numberOfProgressBurns;
            inputSlotInfoSections = existingSave.inputSlotInfoSections;
            outputSlotInfoSections = existingSave.outputSlotInfoSections;

            numberOfInputSlots = numberOfInputSlotsInput.value;
            numberOfOutputSlots = numberOfOutputSlotsInput.value;
            loadInputSlotAmount();
            loadOutputSlotAmount();
        }
    });

});

// Delete button click event handler
document.getElementById("delete-button").addEventListener("click", function() {
    saves = JSON.parse(localStorage.getItem("saves")) == null ? [] : JSON.parse(localStorage.getItem("saves"));
    var selectedSave = document.getElementById("load-dropdown").value;
    let index = 0;
    let indexToRemove;
    saves.forEach(existingSave => {
        if (existingSave.saveName == selectedSave) {
            indexToRemove = index;
        }
        index++;
    });
    if (indexToRemove != undefined) {
        saves = saves.slice(0, indexToRemove).concat(saves.slice(indexToRemove+1));
    }
    localStorage.setItem("saves", JSON.stringify(saves));
    updateLoadDropdown();
});

numberOfInputSlotsInput.addEventListener("change", () => {
    numberOfInputSlots = numberOfInputSlotsInput.value;
    updateInputSlotAmount();
})

numberOfOutputSlotsInput.addEventListener("change", () => {
    numberOfOutputSlots = numberOfOutputSlotsInput.value;
    updateOutputSlotAmount();
})

function updateInputSlotAmount() {
    Array.from(inputSlotInfoContainer.childNodes).forEach(childElement => {
        childElement.remove();
    })

    if (numberOfInputSlots > inputSlotInfoSections.length) {
        let difference = numberOfInputSlots - inputSlotInfoSections.length;
        for (let index = 0; index < difference; index++) {
            inputSlotInfoSections.push(new InputSlot());
        }
    } else if (numberOfInputSlots < inputSlotInfoSections.length) {
        let difference = inputSlotInfoSections.length - numberOfInputSlots;
        for (let index = 0; index < difference; index++) {
            inputSlotInfoSections.pop();
        }
    }

    console.log("inputSlotInfoSections: ");
    console.log(inputSlotInfoSections);
    let newGUIElementSlotInfoSections = [];
    inputSlotInfoSections.forEach(inputSlot => {
        let newGUIElementSlot = new InputSlot();

        newGUIElementSlot.setXY(inputSlot.x, inputSlot.y)
        newGUIElementSlotInfoSections.push(newGUIElementSlot);
        inputSlotInfoContainer.appendChild(newGUIElementSlot.newGUIElementDiv);
    });
}

function loadInputSlotAmount() {
    Array.from(inputSlotInfoContainer.childNodes).forEach(childElement => {
        childElement.remove();
    })

    let newGUIElementSlotInfoSections = [];

    inputSlotInfoSections.forEach(inputSlot => {
        let newGUIElementSlot = new InputSlot();

        newGUIElementSlot.setXY(inputSlot.x, inputSlot.y)
        newGUIElementSlotInfoSections.push(newGUIElementSlot);
        inputSlotInfoContainer.appendChild(newGUIElementSlot.newGUIElementDiv);
    });
    inputSlotInfoSections = newGUIElementSlotInfoSections
}

function updateOutputSlotAmount() {
    Array.from(outputSlotInfoContainer.childNodes).forEach(childElement => {
        childElement.remove();
    })

    if (numberOfOutputSlots > outputSlotInfoSections.length) {
        let difference = numberOfOutputSlots - outputSlotInfoSections.length;
        for (let index = 0; index < difference; index++) {
            outputSlotInfoSections.push(new OutputSlot());
        }
    } else if (numberOfOutputSlots < outputSlotInfoSections.length) {
        let difference = outputSlotInfoSections.length - numberOfOutputSlots;
        for (let index = 0; index < difference; index++) {
            outputSlotInfoSections.pop();
        }
    }
    let newGUIElementSlotInfoSections = [];

    outputSlotInfoSections.forEach(outputSlot => {
        let newGUIElementSlot = new OutputSlot();

        newGUIElementSlot.setXY(outputSlot.x, outputSlot.y)
        newGUIElementSlotInfoSections.push(newGUIElementSlot);
        outputSlotInfoContainer.appendChild(newGUIElementSlot.newGUIElementDiv);
    });
}

function loadOutputSlotAmount() {
    Array.from(outputSlotInfoContainer.childNodes).forEach(childElement => {
        childElement.remove();
    })

    let newGUIElementSlotInfoSections = [];

    outputSlotInfoSections.forEach(outputSlot => {
        let newGUIElementSlot = new OutputSlot();

        newGUIElementSlot.setXY(outputSlot.x, outputSlot.y)
        newGUIElementSlotInfoSections.push(newGUIElementSlot);
        outputSlotInfoContainer.appendChild(newGUIElementSlot.newGUIElementDiv);
    });
    outputSlotInfoSections = newGUIElementSlotInfoSections
}