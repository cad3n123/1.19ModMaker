let saves = JSON.parse(localStorage.getItem("saves")) == null ? [] : JSON.parse(localStorage.getItem("saves"));

let modNameInput = document.getElementById("mod-name");
let modIDInput = document.getElementById("mod-id");
let entityNameInput = document.getElementById("entity-name");
let numberOfInputSlotsInput = document.getElementById("num-input-slots");
let numberOfInputSlots;
let inputSlotInfoSections = [];
let numberOfOutputSlotsInput = document.getElementById("num-output-slots");
let numberOfOutputSlots;
let numberOfProgressArrowsInput = document.getElementById("num-arrows");
let numberOfProgressArrows;
let numberOfProgressBurnsInput = document.getElementById("num-burns");
let numberOfProgressBurns;
let loadDropdownSelect = document.getElementById("load-dropdown");
let inputSlotInfoContainer = Array.from(document.getElementsByClassName("input-slot-info-container"))[0];

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
            numberOfProgressBurns: numberOfProgressBurnsInput.value
        }

        class SavedInputSlot {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
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
    
    saves.forEach(existingSave => {
        if (existingSave.saveName == selectedSave) {
            modNameInput.value = existingSave.modName;
            modIDInput.value = existingSave.modID;
            entityNameInput.value = existingSave.entityName;
            numberOfInputSlotsInput.value = existingSave.numberOfInputSlots;
            numberOfOutputSlotsInput.value = existingSave.numberOfOutputSlots;
            numberOfProgressArrowsInput.value = existingSave.numberOfProgressArrows;
            numberOfProgressBurnsInput.value = existingSave.numberOfProgressBurns;

            numberOfInputSlots = numberOfInputSlotsInput.value;
            updateInputSlotAmount();
            updateInputSlotsInfo();
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

function inputSlot() {
    let newInputSlotDiv = document.createElement("div");
    newInputSlotDiv.setAttribute("class", "input-slot-div");

    let newInputSlotHeader = document.createElement("h2");
    newInputSlotHeader.innerHTML = "Input Slot";

    let newInputSlotXLabel = document.createElement("label");
    newInputSlotXLabel.innerHTML = "X: ";

    let newInputSlotXInput = document.createElement("input");
    newInputSlotXInput.setAttribute("type", "number");
    newInputSlotXInput.value = 0;

    let newInputSlotYLabel = document.createElement("label");
    newInputSlotYLabel.innerHTML = "Y: ";

    let newInputSlotYInput = document.createElement("input");
    newInputSlotYInput.setAttribute("type", "number");
    newInputSlotYInput.value = 0;
    
    
    newInputSlotDiv.appendChild(newInputSlotHeader);
    newInputSlotDiv.appendChild(newInputSlotXLabel);
    newInputSlotDiv.appendChild(newInputSlotXInput);
    newInputSlotDiv.appendChild(newInputSlotYLabel);
    newInputSlotDiv.appendChild(newInputSlotYInput);

    return newInputSlotDiv;
}

function updateInputSlotAmount() {
    if (numberOfInputSlots > inputSlotInfoContainer.childElementCount) {
        let difference = numberOfInputSlots - inputSlotInfoContainer.childElementCount;
        for (let i = 0; i < difference; i++) {
            inputSlotInfoContainer.appendChild(inputSlot());
        }
    } else if (numberOfInputSlots < inputSlotInfoContainer.childElementCount) {
        let difference = inputSlotInfoContainer.childElementCount - numberOfInputSlots;
        for (let i = 0; i < difference; i++) {
            inputSlotInfoContainer.removeChild(inputSlotInfoContainer.lastChild);
        }
    }
}

function updateInputSlotsInfo() {

}