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

class InputSlot {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.newInputSlotDiv = document.createElement("div");

        this.newInputSlotDiv.setAttribute("class", "input-slot-div");
    
        this.newInputSlotHeader = document.createElement("h2");
        this.newInputSlotHeader.innerHTML = "Input Slot";
    
        this.newInputSlotXLabel = document.createElement("label");
        this.newInputSlotXLabel.innerHTML = "X: ";
    
        this.newInputSlotXInput = document.createElement("input");
        this.newInputSlotXInput.setAttribute("type", "number");
        this.newInputSlotXInput.value = 0;
        this.newInputSlotXInput.addEventListener("change", () => {
            this.x = this.newInputSlotXInput.value;
        })
    
        this.newInputSlotYLabel = document.createElement("label");
        this.newInputSlotYLabel.innerHTML = "Y: ";
    
        this.newInputSlotYInput = document.createElement("input");
        this.newInputSlotYInput.setAttribute("type", "number");
        this.newInputSlotYInput.value = 0;
        this.newInputSlotYInput.addEventListener("change", () => {
            this.y = this.newInputSlotYInput.value;
        })
        
        
        this.newInputSlotDiv.appendChild(this.newInputSlotHeader);
        this.newInputSlotDiv.appendChild(this.newInputSlotXLabel);
        this.newInputSlotDiv.appendChild(this.newInputSlotXInput);
        this.newInputSlotDiv.appendChild(this.newInputSlotYLabel);
        this.newInputSlotDiv.appendChild(this.newInputSlotYInput);
    }

    setX(x) {
        this.x = x;
        this.newInputSlotXInput.value = x;
    }
    setY(y) {
        this.y = y;
        this.newInputSlotYInput.value = y;
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.newInputSlotXInput.value = x;
        this.newInputSlotYInput.value = y;
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
            inputSlotInfoSections: inputSlotInfoSections
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
            console.log(existingSave.inputSlotInfoSections);

            numberOfInputSlots = numberOfInputSlotsInput.value;
            loadInputSlotAmount();
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
    inputSlotInfoSections.forEach(inputSlot => {
        console.log(inputSlot);
        inputSlotInfoContainer.appendChild(inputSlot.newInputSlotDiv);
    });
}

function loadInputSlotAmount() {
    Array.from(inputSlotInfoContainer.childNodes).forEach(childElement => {
        childElement.remove();
    })

    let newInputSlotInfoSections = [];

    inputSlotInfoSections.forEach(inputSlot => {
        let newInputSlot = new InputSlot();

        console.log("X being added: " + inputSlot.x);

        newInputSlot.setXY(inputSlot.x, inputSlot.y)
        newInputSlotInfoSections.push(newInputSlot);
        inputSlotInfoContainer.appendChild(newInputSlot.newInputSlotDiv);
    });
    inputSlotInfoSections = newInputSlotInfoSections
}