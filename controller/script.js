/*jslint browser: true, devel: true */

(function () {
    "use strict";

    let Board;
    const Player1 = "O";
    const Player2 = "X";
    let GameBoard = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];
    let currentPlayer = Player1;

    fInit();
    const cells = document.querySelectorAll(".cell");

    function turn(squareId, player) {
        const myIMG = document.createElement("img");
        if (currentPlayer === Player1) {
            myIMG.src = "image/circle.svg";
        } else {
            myIMG.src = "image/cross.svg";
        }
        Board[squareId] = player;
        document.getElementById(squareId).appendChild(myIMG);
    }

    function switchPlayer() {
        if (currentPlayer === Player1) {
            currentPlayer = Player2;
        } else {
            currentPlayer = Player1;
        }
    }

    /*
    function bestPlay() {

        let bestMove;

        if (currentPlayer === Player2) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {

// else loop over the moves and choose the move with the lowest score
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

// return the chosen move (object) from the moves array
        return moves[bestMove];
    } */

    function checkWin() {
        GameBoard.forEach(function (GameRow, nIndexRow) {
            if (GameRow[0] === currentPlayer &&
                GameRow[1] === currentPlayer &&
                GameRow[2] === currentPlayer) {
                document.getElementById("head").innerHTML = "<h1 class='shake-lr'>YOU WIN</h1>";
                document.getElementById("playerturn").classList.remove("show");
                document.getElementById("playerturn1").classList.remove("show");
            } else if (GameBoard[0][nIndexRow] === currentPlayer &&
                GameBoard[1][nIndexRow] === currentPlayer &&
                GameBoard[2][nIndexRow] === currentPlayer) {
                document.getElementById("head").innerHTML = "<h1 class='shake-lr'>YOU WIN</h1>";
                document.getElementById("playerturn").classList.remove("show");
                document.getElementById("playerturn1").classList.remove("show");
            }
        });
        if (GameBoard[0][0] === currentPlayer &&
            GameBoard[1][1] === currentPlayer &&
            GameBoard[2][2] === currentPlayer) {
            document.getElementById("head").innerHTML = "<h1 class='shake-lr'>YOU WIN</h1>";
            document.getElementById("playerturn").classList.remove("show");
            document.getElementById("playerturn1").classList.remove("show");
        }
        if (GameBoard[0][2] === currentPlayer &&
            GameBoard[1][1] === currentPlayer &&
            GameBoard[2][0] === currentPlayer) {
            document.getElementById("head").innerHTML = "<h1 class='shake-lr'>YOU WIN</h1>";
            document.getElementById("playerturn").classList.remove("show");
            document.getElementById("playerturn1").classList.remove("show");
        }

    }

    function turnClick(square) {
        if (square.target.nodeName === "TD" && !square.target.firstChild) {
            turn(square.target.id, currentPlayer);
            if (square.target.id < 3) {
                GameBoard[0][square.target.id] = currentPlayer;
            } else if (square.target.id < 6) {
                GameBoard[1][square.target.id - 3] = currentPlayer;
            } else {
                GameBoard[2][square.target.id - 6] = currentPlayer;
            }
            showPlayerTurn();
            checkWin();
            switchPlayer();
        }
    }

    function startGame() {
        Board = Array.from(new Array(9).keys());
        cells.forEach(function (cell) {
            cell.innerText = "";
            cell.addEventListener("click", turnClick, false);
        });
    }

    startGame();

    document.getElementById("btn").onclick = function () {
        playAgain();
    };

    function playAgain() {
        for (let i = 0; i < 9; i += 1) {
            while (document.getElementById(i).firstChild) {
                document.getElementById(i).removeChild
                (document.getElementById(i).firstChild);
            }
            currentPlayer = Player1;
            GameBoard = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];
            Board = Array.from(new Array(9).keys());
        }
        document.getElementById("playerturn").classList.add("show");
        document.getElementById("playerturn1").classList.remove("show");
        document.getElementById("head").innerHTML = "<h1>Tic-Tac-Toe</h1>";
    }

    function showPlayerTurn() {
        document.getElementById("playerturn").classList.toggle("show");
        document.getElementById("playerturn1").classList.toggle("show");
    }

    function fInit() {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register
                ("serviceworker.js").then(function (registration) {
                    console.log("ServiceWorker registration successful with scope: ", registration.scope);
                }, function (err) {
                    console.log("ServiceWorker registration failed: ", err);
                });
            });
        }
    }
}());