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
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        render();
    }
}

