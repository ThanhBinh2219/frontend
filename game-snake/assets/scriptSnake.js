const food = ["🐧"]; // tọa biến food để chứa thức ăn
const playBoard = document.querySelector(".content"); // Tạo biến playBoard để lấy dữ liệu từ thẻ có thuộc tính là content
const scoreElement = document.querySelector(".game-score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 20,
    snakeY = 20;
// Tọa độ di chuyển
let velocityX = 0,
    velocityY = 0;

let snakeBody = [];
let setIntervalId;
let score = 0;
let snakeRotation = 0;

//Lấy điểm cao nhất từ session, nếu không có thì kết quả là 0
let highScore = localStorage.getItem("high-score") || 0;
// in lại giá trị điểm cao nhất ra màn hình
highScoreElement.innerText = `High Score: ${highScore}`;

let draw = false;
let huong_dau_ran = -90;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 35) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
};
// hàm gọi khi game kế thúc và reload lại trang
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
};

// hàm điều hướng cho con rắn
const rotateSnakeImage = () => {
    // đặt biến snakeImg được lấy từ class head img
    const snakeImg = document.querySelector(".head img");
    if (snakeImg) {
        // Trường hợp sankeImg có thì gán stype cho nó là rotate(đối số)deg để nó xoay theo chiều đã chỉ định
        snakeImg.style.transform = `rotate(${snakeRotation}deg)`;
    }
};

// Hàm gán giá trị cho snakeRotation
const changeDirectionHead = (key) => {
    switch (key) {
        case "ArrowUp":
            return -90;
        case "ArrowDown":
            return 90;
        case "ArrowLeft":
            return 180;
        case "ArrowRight":
            return 0;
    }
};
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        huong_dau_ran = changeDirectionHead(e.key);
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        huong_dau_ran = changeDirectionHead(e.key);
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        huong_dau_ran = changeDirectionHead(e.key);
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
        huong_dau_ran = changeDirectionHead(e.key);
    }
};


controls.forEach((button) =>
    button.addEventListener("click", () =>
        changeDirection({key: button.dataset.key})
    )
);
/*khởi tạo trò chơi*/
const initGame = () => {
    //Nếu gameOver = true thì trả hàm handleGameOver để thoát game
    if (gameOver) return handleGameOver();

    // tạo một biến html chứa chuỗi rỗng
    let html = "";
    // Nếu tọa độ đầu con rắn trùng với tọa của thức ăn thì con rắn nối thêm một đoạn
    if (snakeX === foodX && snakeY === foodY) {
        //cập nhật vị trí thức ăn mới
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        if (score >= highScore) {
            highScore = score;
        }
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    snakeX += velocityX;
    snakeY += velocityY;
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
    if (snakeX <= 0 || snakeX > 35 || snakeY <= 0 || snakeY > 20) {
        return (gameOver = true);
    }

    if(draw && velocityX === 0 && velocityY === 0) return
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="${i === 0 ? "snake-head" : "snake-body"}" style="grid-area: ${snakeBody[i][1]} / ${
            snakeBody[i][0]}; width:  100%; height: 100%; font-size: 20px; display: flex; justify-content: center; align-items: center; transform: rotate(${huong_dau_ran}deg)">${
            i === 0
                ? '<img src="/assets/image/headOfSnake.jpg" style="width: 20px; height: 20px;">'
                : "🟩"
        }</div>`;
    }
    html += `<div class="food" style="grid-area: ${foodY} / ${foodX}">${
        food[Math.floor(Math.random() * food.length)]
    }</div>`;

    playBoard.innerHTML = html;

   draw = true;
};
const checkWin = () => {
    if (highScore = 200) {
        alert("You win, go to level 2");
    }
}
updateFoodPosition();
setIntervalId = setInterval(initGame, 200);
document.addEventListener("keyup", changeDirection);
