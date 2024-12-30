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
        fields[index] = currentPlayer;
        const cell = document.getElementById(`cell-${index}`);
    
        if (currentPlayer === "O") {
            cell.innerHTML = generateCircleSVG();
            const circle = cell.querySelector("circle");
            if (circle) {
                setTimeout(() => {
                    circle.setAttribute("stroke-dashoffset", "0");
                }, 0);
            }
        } else {
            cell.innerHTML = generateCrossSVG();
            const lines = cell.querySelectorAll("line");
            if (lines) {
                lines.forEach(line => {
                    setTimeout(() => {
                        line.setAttribute("stroke-dashoffset", "0");
                    }, 0);
                });
            }
        }
    
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        // Check for winner after each click
        const winner = checkWinner();
        if (winner) {
            alert(`${winner} wins!`); // Alert when there is a winner
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // row 1
        [3, 4, 5], // row 2
        [6, 7, 8], // row 3
        [0, 3, 6], // column 1
        [1, 4, 7], // column 2
        [2, 5, 8], // column 3
        [0, 4, 8], // diagonal 1
        [2, 4, 6], // diagonal 2
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        // Ensure that the three fields are not null and are the same
        if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combination); // Draw the winning line
            return fields[a]; // Return the winner ("X" or "O")
        }
    }

    return null; // No winner
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

function drawWinningLine(combination) {
    // Set initial variables
    const lineColor = 'white'; // The line color
    const lineWidth = '8px'; // The width of the line

    // Get the start and end cells from the combination
    const startCell = document.querySelector(`#cell-${combination[0]}`);
    const endCell = document.querySelector(`#cell-${combination[2]}`);

    // Get the bounding rectangle for both cells
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    // Get the content container's coordinates
    const contentRect = document.getElementById('content').getBoundingClientRect();

    // Calculate the angle of the line using trigonometry
    const deltaX = endRect.left - startRect.left;
    const deltaY = endRect.top - startRect.top;
    const lineAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // in degrees

    // Create the line element
    const line = document.createElement('div');

    // Calculate the length of the line
    const lineLength = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    // Style the line (positioned absolutely)
    line.style.position = 'absolute';
    line.style.top = `${startRect.top - contentRect.top + startRect.height / 2}px`;
    line.style.left = `${startRect.left - contentRect.left + startRect.width / 2}px`;
    line.style.width = `${lineLength}px`;
    line.style.height = lineWidth;
    line.style.backgroundColor = lineColor;
    line.style.transformOrigin = '0 50%'; // Transform around the start point of the line
    line.style.transform = `rotate(${lineAngle}deg)`; // Rotate based on calculated angle
    line.style.transition = 'width 0.5s ease-out, transform 0.5s ease-out'; // Smooth animation

    // Append the line to the content container
    document.getElementById('content').appendChild(line);

    // Trigger the line drawing animation
    setTimeout(() => {
        line.style.width = `${lineLength}px`;
    }, 100); // Delay to ensure styles are applied
}
