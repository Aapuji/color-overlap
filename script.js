let bgColor = "(0, 0, 0)";

let actual = document.getElementById("actual");
let calculated = document.getElementById("calculated");

// Array of layers, first is the top.
let layers = [];

// Color Stuff
function setBgColor(color) {
    bgColor = color;
    actual.style.backgroundColor = `rgb${bgColor}`;
    calculated.style.backgroundColor = `rgb${bgColor}`;
}

async function getActualColor() {
    let rect = actual.getBoundingClientRect();

    let x = rect.x + rect.width / 2;
    let y = rect.y + rect.height / 2;

    let rgb = await html2canvas(document.body)
        .then(canvas => {
            let ctx = canvas.getContext('2d');
            let p = ctx.getImageData(x, y, 1, 1).data;

            console.log("");

            return [p[0], p[1], p[2]];
        });
    
    console.log(rgb);
    
    document.getElementById("actual-color").innerText = `(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function setCalculatedColor(color) {
    calculated.style.backgroundColor = `rgb${color}`;
    
    document.getElementById("calculated-color").innerHTML = color;
}

// Actual Good Stuff -- Calculating the color
function calculateColor(layers, bg) {
    let color = [0, 0, 0];

    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        
        let alpha = layer.at(-1);

    }

    return bg;
}

// Layers Stuff
const layerContainer = document.getElementById("layer-container");
const addLayer = document.getElementById("add-layer-btn");

let isAdding = false;

// Function to create a new layer
function createLayer(text) {
    const layer = document.createElement("div");
    layer.classList.add("desc-layer");

    const layerText = document.createElement("span");
    layerText.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-layer-btn");
    deleteBtn.textContent = "×";
    deleteBtn.style.fontSize = "1.25em";

    // Delete functionality
    deleteBtn.addEventListener("click", () => {
        layer.remove();
    });

    // Append elements
    layer.appendChild(layerText);
    layer.appendChild(deleteBtn);
    layerContainer.appendChild(layer);
}

// Handle the add button click
addLayer.addEventListener("click", () => {
    if (isAdding) return; // Prevent multiple clicks

    isAdding = true;
    addLayer.classList.add("active");

    // Create input field inside the add button
    addLayer.innerHTML = "";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "eg. (0, 0, 0)";
    addLayer.appendChild(input);
    input.focus();

    // Add layer on Enter key
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && input.value.trim() !== "") {
            createLayer(input.value.trim());
            resetAddLayer();
        } else if (e.key === "Escape") {
            resetAddLayer();
        }
    });

    // Reset add button if input loses focus
    input.addEventListener("blur", () => {
        resetAddLayer();
    });
});

// Reset the Add Layer button to its default state
function resetAddLayer() {
    addLayer.classList.remove("active");
    addLayer.innerHTML = "+";
    isAdding = false;
}

// Gets the layers and puts them into the `layers` array.
function getLayers() {
    // todo
}

// Main

setBgColor("(0, 0, 0)");

getActualColor();
setCalculatedColor(calculateColor([], bgColor));
