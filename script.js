const boardSize = 15;
const board = [];
let currentPlayer = '黑';
let gameOver = false;

// 初始化棋盘数组
for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
        board[i][j] = null;
    }
}

// 渲染棋盘
function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            if (board[i][j]) {
                const stone = document.createElement('div');
                stone.classList.add('stone');
                stone.classList.add(board[i][j] === '黑' ? 'black' : 'white');
                cell.appendChild(stone);
            }
            boardElement.appendChild(cell);
        }
    }
    updateStatus();
}

// 处理点击事件
function handleCellClick(event) {
    if (gameOver) {
        alert('游戏已结束，请重置游戏！');
        return;
    }

    const row = parseInt(event.currentTarget.dataset.row);
    const col = parseInt(event.currentTarget.dataset.col);

    if (board[row][col]) {
        alert('该位置已被占用！');
        return;
    }

    board[row][col] = currentPlayer;
    renderBoard();

    if (checkWin(row, col)) {
        alert(`${currentPlayer} 赢了！`);
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === '黑' ? '白' : '黑';
    updateStatus();
}

// 更新状态显示
function updateStatus() {
    const statusElement = document.getElementById('status');
    statusElement.textContent = `当前玩家：${currentPlayer}`;
}

// 检查胜利条件
function checkWin(x, y) {
    const directions = [
        { dx: 1, dy: 0 },  // 水平
        { dx: 0, dy: 1 },  // 垂直
        { dx: 1, dy: 1 },  // 斜向右下
        { dx: 1, dy: -1 }  // 斜向右上
    ];

    for (const dir of directions) {
        let count = 1;

        // 向一个方向延伸
        let i = 1;
        while (
            x + dir.dx * i >= 0 &&
            x + dir.dx * i < boardSize &&
            y + dir.dy * i >= 0 &&
            y + dir.dy * i < boardSize &&
            board[x + dir.dx * i][y + dir.dy * i] === currentPlayer
        ) {
            count++;
            i++;
        }

        // 向相反方向延伸
        i = 1;
        while (
            x - dir.dx * i >= 0 &&
            x - dir.dx * i < boardSize &&
            y - dir.dy * i >= 0 &&
            y - dir.dy * i < boardSize &&
            board[x - dir.dx * i][y - dir.dy * i] === currentPlayer
        ) {
            count++;
            i++;
        }

        if (count >= 5) {
            return true;
        }
    }

    return false;
}

// 重置游戏
function resetGame() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = null;
        }
    }
    currentPlayer = '黑';
    gameOver = false;
    renderBoard();
}

// 绑定重置按钮
document.getElementById('reset').addEventListener('click', resetGame);

// 初始化棋盘
window.onload = renderBoard; 