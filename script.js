let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
]

let currentPlayer = 'X'; // Track the current player

function init(){
    render();
}

function render() {
    let html = '<table>';
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        const cellClass = fields[index] === 'X' ? 'x-cell' : fields[index] === 'O' ? 'o-cell' : '';
        html += `
            <td id="cell-${index}" class="${cellClass}" onclick="handleClick(${index})">
            ${fields[index] === null ? '' : fields[index]}
            </td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById('content').innerHTML = html;
}

function handleClick(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer; // Update the field state
        const cell = document.getElementById(`cell-${index}`);
        
        if (currentPlayer === "O") {
            // Render the circle SVG
            cell.innerHTML = generateCircleSVG();
            const circle = cell.querySelector("circle");
            if (circle) {
                // Trigger the circle animation
                setTimeout(() => {
                    circle.setAttribute("stroke-dashoffset", "0");
                }, 0);
            }
        } else {
            // Render the cross SVG
            cell.innerHTML = generateCrossSVG();
            const lines = cell.querySelectorAll("line");
            if (lines) {
                // Trigger the cross animation
                lines.forEach(line => {
                    setTimeout(() => {
                        line.setAttribute("stroke-dashoffset", "0");
                    }, 0);
                });
            }
        }

        // Toggle the current player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function generateCrossSVG(width = "90%", height = "90%", color = "#EF8354") {
    return `
        <svg width="${width}" height="${height}" viewBox="0 0 100 100">
            <line 
            x1="20" 
            y1="20" 
            x2="80" 
            y2="80" 
            stroke="${color}" 
            stroke-width="8" 
            stroke-linecap="round"
            style="transition: stroke-dasharray 0.8s ease-in-out, stroke-dashoffset 0.8s ease-in-out;"
            stroke-dasharray="84.85"
            stroke-dashoffset="84.85"
            ></line>
            <line 
            x1="80" 
            y1="20" 
            x2="20" 
            y2="80" 
            stroke="${color}" 
            stroke-width="8" 
            stroke-linecap="round"
            style="transition: stroke-dasharray 0.8s ease-in-out, stroke-dashoffset 0.8s ease-in-out;"
            stroke-dasharray="84.85"
            stroke-dashoffset="84.85"
            ></line>
        </svg>`;
}


function generateCircleSVG() {
    let width = "100%";
    let height = "100%";
    let color = "#007EA7";

    return `
        <svg width="${width}" height="${height}" viewBox="0 0 100 100">
            <circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke="${color}" 
            stroke-width="8" 
            fill="none" 
            stroke-dasharray="251.2" 
            stroke-dashoffset="251.2" 
            style="transition: stroke-dashoffset 1s ease-in-out;"
            ></circle>
        </svg>`;
}
