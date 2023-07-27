let saves = JSON.parse(localStorage.getItem("saves")) == null ? {} : JSON.parse(localStorage.getItem("saves"));

let title = document.getElementById("title");
let modNameInput = document.getElementById("mod-name");
let modIDInput = document.getElementById("mod-id");
let container = document.getElementsByClassName("container")[0];
let leftColumn = document.getElementsByClassName("left-column")[0];
let entityNameInput = document.getElementById("entity-name");
let modAuthorInput = document.getElementById("mod-author");
let numberOfInputSlotsInput = document.getElementById("num-input-slots");
let numberOfInputSlots;
let numberOfOutputSlotsInput = document.getElementById("num-output-slots");
let numberOfOutputSlots;
let numberOfHorizontalProgressArrowsInput = document.getElementById("num-horizontal-arrows");
let numberOfHorizontalProgressArrows;
let numberOfVerticalProgressArrowsInput = document.getElementById("num-vertical-arrows");
let numberOfVerticalProgressArrows;
let numberOfProgressBurnsInput = document.getElementById("num-burns");
let numberOfProgressBurns;
let loadDropdownSelect = document.getElementById("load-dropdown");
let GUIContainerContainerDiv = document.getElementById("gui-container-container");
let emptyGUI = document.getElementById("empty-gui");
let emptyGUIX = emptyGUI.getBoundingClientRect().x;
let emptyGUIY = emptyGUI.getBoundingClientRect().y;
let popUpOpen = false;

if (!popUpOpen) {

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
    class GUIHorizontalProgressArrowContainer extends GUIContainer {
        constructor() {
            super("horizontal-progress-arrow");
        }

        newGUIInfo = function() {
            return new GUIHorizontalProgressArrowInfo();
        }
    }
    class GUIVerticalProgressArrowContainer extends GUIContainer {
        constructor() {
            super("vertical-progress-arrow");
        }

        newGUIInfo = function() {
            return new GUIVerticalProgressArrowInfo();
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
            this.GUIInfoHeader.innerHTML = this.type.charAt(0).toUpperCase() + this.type.slice(1 - this.type.length).toLowerCase();
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
            this.GUIInfoStartXInput.setAttribute("min", "0");
            this.GUIInfoStartXInput.setAttribute("max", "200");
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
            this.GUIInfoStartYInput.setAttribute("min", "0");
            this.GUIInfoStartYInput.setAttribute("max", "72");
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
            this.GUIInfoImage.style.top = (-1 + emptyGUIY + (this.startY - 4) * 2) + "px";
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

    class GUIHorizontalProgressArrowInfo extends GUIInfo {
        constructor() {
            super("horizontal-progress-arrow");
            this.GUIInfoStartImages = [];
            this.GUIInfoStartImageLength = 1;
            this.GUIInfoEndImage;
            this.GUIInfoLengthLabel;
            this.GUIInfoLengthInput;
        }

        newGUIInfoLengthLabel() {
            this.GUIInfoLengthLabel = document.createElement("label");
            this.GUIInfoLengthLabel.innerHTML = "Length: ";
            return this.GUIInfoLengthLabel;
        }
        newGUIInfoLengthInput() {
            this.GUIInfoLengthInput = document.createElement("input");
            this.GUIInfoLengthInput.setAttribute("type", "number");
            this.GUIInfoLengthInput.setAttribute("min", "1");
            this.GUIInfoLengthInput.setAttribute("max", "168");
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
                GUIInfoImage.setAttribute("src", "images/" + this.type.toLowerCase() + "-start.png");
                GUIInfoImage.setAttribute("class", "gui-info-image");
                
                GUIInfoImage.style.left = (emptyGUIX + firstX + this.startX * 2) + "px";
                GUIInfoImage.style.top = (-1 + emptyGUIY + firstY + (this.startY + 6) * 2) + "px";

                this.GUIInfoStartImages.push(GUIInfoImage);
                GUIInfoImage = undefined;

                firstX += 2;
            }

            return this.GUIInfoStartImages;
        }

        newGUIInfoEndImage() {
            this.GUIInfoEndImage = document.createElement("img");
            this.GUIInfoEndImage.setAttribute("src", "images/" + this.type.toLowerCase() + "-end.png");
            this.GUIInfoEndImage.setAttribute("class", "gui-info-image");

            this.GUIInfoEndImage.style.left = (emptyGUIX + (this.startX + this.GUIInfoStartImageLength) * 2) + "px";
            this.GUIInfoEndImage.style.top = (-1 + emptyGUIY + this.startY * 2) + "px";

            return this.GUIInfoEndImage;
        }

        create() {
            let div = this.defaultCreate();
            div.appendChild(this.newGUIInfoLengthLabel());
            div.appendChild(this.newGUIInfoLengthInput());

            let startImages = this.newGUIInfoStartImages();
            startImages.forEach(startImage => {
                div.appendChild(startImage);
            });

            div.appendChild(this.newGUIInfoEndImage());

            return div;
        }

        setStartX(x) {
            this.startX = parseInt(x);
            let firstX = 0;
            this.GUIInfoStartImages.forEach(startImage => {
                startImage.style.left = emptyGUIX + firstX + (this.startX * 2) + "px";
                firstX += 2;
            })
            this.GUIInfoEndImage.style.left = (emptyGUIX + (this.startX + this.GUIInfoStartImageLength) * 2) + "px";
        }

        setStartY(y) {
            this.startY = parseInt(y);
            this.GUIInfoStartImages.forEach(startImage => {
                startImage.style.top = (emptyGUIY + (this.startY + 6) * 2) + "px";
            })
            this.GUIInfoEndImage.style.top = (-1 + emptyGUIY + this.startY * 2) + "px";
        }

        setStartXY(x, y) {
            this.setStartX(x);
            this.setStartY(y);
        }

        setLength(length) {

            this.GUIInfoStartImages.forEach(startImage => {
                startImage.remove();
            })

            this.GUIInfoStartImages = []

            this.GUIInfoStartImageLength = parseInt(length);

            let div = this.GUIInfoDiv;
            let startImages = this.newGUIInfoStartImages();
            startImages.forEach(startImage => {
                div.appendChild(startImage);
            });
            
            this.GUIInfoEndImage.style.left = (emptyGUIX + (this.startX + this.GUIInfoStartImageLength) * 2) + "px";
            this.GUIInfoEndImage.style.top = (-1 + emptyGUIY + this.startY * 2) + "px";

            return div;
        }
    }

    class GUIVerticalProgressArrowInfo extends GUIInfo {
        constructor() {
            super("vertical-progress-arrow");
            this.GUIInfoStartImages = [];
            this.GUIInfoStartImageLength = 1;
            this.GUIInfoEndImage;
            this.GUIInfoLengthLabel;
            this.GUIInfoLengthInput;
        }

        newGUIInfoLengthLabel() {
            this.GUIInfoLengthLabel = document.createElement("label");
            this.GUIInfoLengthLabel.innerHTML = "Length: ";
            return this.GUIInfoLengthLabel;
        }
        newGUIInfoLengthInput() {
            this.GUIInfoLengthInput = document.createElement("input");
            this.GUIInfoLengthInput.setAttribute("type", "number");
            this.GUIInfoLengthInput.setAttribute("min", "1");
            this.GUIInfoLengthInput.setAttribute("max", "168");
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
                GUIInfoImage.setAttribute("src", "images/" + this.type.toLowerCase() + "-start.png");
                GUIInfoImage.setAttribute("class", "gui-info-image");
                
                GUIInfoImage.style.left = (emptyGUIX + firstX + this.startX * 2) + "px";
                GUIInfoImage.style.top = (-1 + emptyGUIY + firstY + (this.startY + 6) * 2) + "px";

                this.GUIInfoStartImages.push(GUIInfoImage);
                GUIInfoImage = undefined;

                firstY += 2;
            }

            return this.GUIInfoStartImages;
        }

        newGUIInfoEndImage() {
            this.GUIInfoEndImage = document.createElement("img");
            this.GUIInfoEndImage.setAttribute("src", "images/" + this.type.toLowerCase() + "-end.png");
            this.GUIInfoEndImage.setAttribute("class", "gui-info-image");

            this.GUIInfoEndImage.style.left = (emptyGUIX + (this.startX - 6) * 2) + "px";
            this.GUIInfoEndImage.style.top = (-1 + emptyGUIY + (this.startY + this.GUIInfoStartImageLength + 6) * 2) + "px";

            return this.GUIInfoEndImage;
        }

        create() {
            let div = this.defaultCreate();
            div.appendChild(this.newGUIInfoLengthLabel());
            div.appendChild(this.newGUIInfoLengthInput());

            let startImages = this.newGUIInfoStartImages();
            startImages.forEach(startImage => {
                div.appendChild(startImage);
            });

            div.appendChild(this.newGUIInfoEndImage());

            return div;
        }

        setStartX(x) {
            this.startX = parseInt(x);
            let firstX = 0;
            this.GUIInfoStartImages.forEach(startImage => {
                startImage.style.left = emptyGUIX + firstX + (this.startX * 2) + "px";
            })
            this.GUIInfoEndImage.style.left = (emptyGUIX + (this.startX - 6) * 2) + "px";
        }

        setStartY(y) {
            this.startY = parseInt(y);
            let firstY = 0;
            this.GUIInfoStartImages.forEach(startImage => {
                startImage.style.top = (-1 + emptyGUIY + firstY + (this.startY + 6) * 2) + "px";
                firstY += 2;
            })
            this.GUIInfoEndImage.style.top = (-1 + emptyGUIY + (this.startY + this.GUIInfoStartImageLength + 6) * 2) + "px";
        }

        setStartXY(x, y) {
            this.setStartX(x);
            this.setStartY(y);
        }

        setLength(length) {

            this.GUIInfoStartImages.forEach(startImage => {
                startImage.remove();
            })

            this.GUIInfoStartImages = []

            this.GUIInfoStartImageLength = parseInt(length);

            let div = this.GUIInfoDiv;
            let startImages = this.newGUIInfoStartImages();
            startImages.forEach(startImage => {
                div.appendChild(startImage);
            });
            
            this.GUIInfoEndImage.style.left = (emptyGUIX + (this.startX - 6) * 2) + "px";
            this.GUIInfoEndImage.style.top = (-1 + emptyGUIY + (this.startY + this.GUIInfoStartImageLength + 6) * 2) + "px";

            return div;
        }
    }

    class GUIProgressBurnInfo extends GUIInfo {
        constructor() {
            super("progress-burn");
            this.GUIInfoImage;
        }

        newGUIInfoImage() {
            this.GUIInfoImage = document.createElement("img");
            this.GUIInfoImage.setAttribute("src", "images/" + this.type.toLowerCase() + ".png");
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

    let inputSlotInfoContainer = new GUIInputContainer();
    let outputSlotInfoContainer = new GUIOutputContainer();
    let horizontalProgressArrowInfoContainer = new GUIHorizontalProgressArrowContainer();
    let verticalProgressArrowInfoContainer = new GUIVerticalProgressArrowContainer();
    let progressBurnInfoContainer = new GUIProgressBurnContainer();

    GUIContainerContainerDiv.appendChild(inputSlotInfoContainer.GUIContainerDiv);
    GUIContainerContainerDiv.appendChild(outputSlotInfoContainer.GUIContainerDiv);
    GUIContainerContainerDiv.appendChild(horizontalProgressArrowInfoContainer.GUIContainerDiv);
    GUIContainerContainerDiv.appendChild(verticalProgressArrowInfoContainer.GUIContainerDiv);
    GUIContainerContainerDiv.appendChild(progressBurnInfoContainer.GUIContainerDiv);

    window.onload = () => {
        saves = JSON.parse(localStorage.getItem("saves")) == null ? {} : JSON.parse(localStorage.getItem("saves"));
        updateLoadDropdown();
        console.log(saves);
    }

    function updateLoadDropdown() {
        let options = loadDropdownSelect.childNodes;
        Array.from(options).forEach(option => {
            option.remove();
        });
        let defaultOption = document.createElement("option");
        defaultOption.innerHTML = "Select Save...";
        loadDropdownSelect.appendChild(defaultOption);
        for (const save in saves) {
            let newOption = document.createElement("option");
            newOption.innerHTML = save;
            loadDropdownSelect.appendChild(newOption);
        }
    }

    // Save button click event handler
    document.getElementById("save-button").addEventListener("click", function() {
        let saveName = prompt("Enter a name for your save:");

        if (saveName) {
            let save = {
                modName: modNameInput.value,
                modID: modIDInput.value,
                modAuthor: modAuthorInput.value,
                entityName: entityNameInput.value,
                inputSlotContainer: inputSlotInfoContainer,
                outputSlotContainer: outputSlotInfoContainer,
                horizontalProgressArrowContainer: horizontalProgressArrowInfoContainer,
                verticalProgressArrowContainer: verticalProgressArrowInfoContainer,
                progressBurnContainer: progressBurnInfoContainer
            }

            saves[saveName] = save;
            localStorage.setItem("saves", JSON.stringify(saves));
            updateLoadDropdown();
        }
    });

    // Load button click event handler
    document.getElementById("load-button").addEventListener("click", function() {
        let selectedSave = document.getElementById("load-dropdown").value;

        saves = JSON.parse(localStorage.getItem("saves"));
        let save = saves[selectedSave];
        modNameInput.value = save.modName;
        modIDInput.value = save.modID;
        modAuthorInput.value = save.modAuthor;
        entityNameInput.value = save.entityName;
        inputSlotInfoContainer = save.inputSlotContainer;
        outputSlotInfoContainer = save.outputSlotContainer;
        horizontalProgressArrowInfoContainer = save.horizontalProgressArrowContainer;
        verticalProgressArrowInfoContainer = save.verticalProgressArrowContainer;
        progressBurnInfoContainer = save.progressBurnContainer;
    });

    // Delete button click event handler
    document.getElementById("delete-button").addEventListener("click", function() {
        let selectedSave = document.getElementById("load-dropdown").value;

        delete saves[selectedSave];
        localStorage.setItem("saves", JSON.stringify(saves));

        updateLoadDropdown();
    });

    numberOfInputSlotsInput.addEventListener("change", () => {
        inputSlotInfoContainer.loadGUIInfoElements(numberOfInputSlotsInput.value);
    })

    numberOfOutputSlotsInput.addEventListener("change", () => {
        outputSlotInfoContainer.loadGUIInfoElements(numberOfOutputSlotsInput.value);
    })

    numberOfHorizontalProgressArrowsInput.addEventListener("change", () => {
        horizontalProgressArrowInfoContainer.loadGUIInfoElements(numberOfHorizontalProgressArrowsInput.value);
    })

    numberOfVerticalProgressArrowsInput.addEventListener("change", () => {
        verticalProgressArrowInfoContainer.loadGUIInfoElements(numberOfVerticalProgressArrowsInput.value);
    })

    numberOfProgressBurnsInput.addEventListener("change", () => {
        progressBurnInfoContainer.loadGUIInfoElements(numberOfProgressBurnsInput.value);
    })

}

let code = [];
let codeNames = [];
let codeIndex = 0;
let donePopUpDiv;
let donePopUpHeader;
let donePopUpParagraph;
let donePopUpNextButton;

function donePopUp() {
    popUpOpen = true;

    let entityname;
    for (let index = 0; index < entityNameInput.value.length; index++) {
        const char = entityNameInput.value[index];
        if (char != " ") {
            entityname += char.toLowerCase();
        }
    }

    let EntityName = "";
    let firstCharOfWord = true;
    for (let index = 0; index < entityNameInput.value.length; index++) {
        const char = entityNameInput.value[index];
        if (char != " " && firstCharOfWord) {
            EntityName += char.toUpperCase();
            firstCharOfWord = false;
        } else if (char != " " && !firstCharOfWord) {
            EntityName += char.toLowerCase();
        } else if (char == " ") {
            firstCharOfWord = true;
        }
    }
    console.log(EntityName);

    let ENTITY_NAME;
    for (let index = 0; index < entityNameInput.value.length; index++) {
        const char = entityNameInput.value[index];
        if (char != " ") {
            ENTITY_NAME += char.toUpperCase();
        } else {
            ENTITY_NAME += "_";
        }
    }

    let modauthor = "";
    for (let index = 0; index < modAuthorInput.value.length; index++) {
        const char = modAuthorInput.value[index];
        if (char != " ") {
            modauthor += char.toLowerCase();
        }
    }

    let modid = "";
    for (let index = 0; index < modAuthorInput.value.length; index++) {
        const char = modIDInput.value[index];
        if (char != " ") {
            modid += char.toLowerCase();
        }
    }


    console.log(`test from ${modauthor}`);
    codeNames.push("net/" + modauthor + "/" + modid + "/block/entity" + EntityName + "BlockEntity.java");
    code.push(`
    Test
    `);

    

    donePopUpDiv = newDonePopUp();
    donePopUpHeader = newDonePopUpHeader();
    donePopUpParagraph = newDonePopUpParagraph(codeIndex);
    donePopUpCopyButton = newDonePopUpCopyButton();
    donePopUpNextButton = newDonePopUpNextButton();

    donePopUpDiv.appendChild(donePopUpHeader);
    donePopUpDiv.appendChild(donePopUpParagraph);
    donePopUpDiv.appendChild(donePopUpCopyButton);
    donePopUpDiv.appendChild(donePopUpNextButton);
    
    document.body.appendChild(donePopUpDiv);
}

function newDonePopUp() {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "done-pop-up");
    return newDiv;
}

function newDonePopUpHeader() {
    let newHeader = document.createElement("h1");
    newHeader.setAttribute("class", "done-pop-up");
    newHeader.innerHTML = entityNameInput.value;
    return newHeader;
}

function newDonePopUpParagraph(index) {
    let newParagraph = document.createElement("p");
    newParagraph.setAttribute("class", "done-pop-up");
    newParagraph.innerHTML = "Copy this code into your file located at " + codeNames[index];
    return newParagraph;
}

function newDonePopUpNextButton() {
    let newButton = document.createElement("button");
    newButton.setAttribute("class", "done-pop-up");
    newButton.innerHTML = "Next";
    newButton.addEventListener("click", () => {
        if (codeIndex >= code.length - 2) {
            codeIndex++;
            donePopUpParagraph.innerHTML = codeNames[codeIndex];
            newButton.remove();
        } else if (codeIndex <= code.length) {
            codeIndex++;
            donePopUpParagraph.innerHTML = codeNames[codeIndex];
        }
    })

    return newButton;
}

function newDonePopUpCopyButton() {
    let newButton = document.createElement("button");
    newButton.setAttribute("class", "done-pop-up");
    newButton.innerHTML = "Copy";
    newButton.addEventListener("click", () => {
        navigator.clipboard.writeText(code[codeIndex]);
    })

    return newButton;
}