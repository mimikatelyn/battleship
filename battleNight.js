let battleships = 6;
const perRow = 12; //this chnages the size of the gameboard
const root = document.documentElement; //get me the entire element
root.style.setProperty("--perRow", perRow)

let player1 = [];
let player2 = [];
let gameover = false;

let computerShots = [];

const message = document.getElementById("message");

const setPlayer = document.getElementById("setPlayer");
setPlayer.addEventListener("click", setPlayerOne);

const reset = document.getElementById("reset");
reset.addEventListener("click", resetGame);

function init() {//short for initialize
    const gameboard = document.getElementById("gameboard");
    for (let i = 0; i < perRow ** 2; i++) { 
        // ** means to the power of 
        let tile = document.createElement("div");
        tile.className = `tile tile-${i}`;
        tile.innerText = i; //adds the numbers on the inside of the tile in the html
        gameboard.appendChild(tile);
        // appendChild: adds child element
    }
}

function resetGame() {
    const gameboard = document.getElementById("gameboard");
    gameboard.innerText = "";
    init(); //reinitialize the gameboard
    setPlayer.disabled = false;
    gameover = false;
    computerShots = [];
    message.innerText = "";
    battleships = 2
    player1 = []
    player2 = []
}

function setPlayerOne() {
    reset.disabled = true;
    const tiles = document.querySelectorAll(".tile");

    // tiles.forEach(tile => tile.addEventListener("click", pickTile)); //one way to do this

    for (const tile of tiles) {
        tile.addEventListener("click", pickTile);
    }//another way

    alert("Please select a tile for player 1.");
    // https://meet.google.com/linkredirect?authuser=4&dest=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWindow
}

function pickTile(event) {
    // console.log(event.target);

    let tile = event.target; //lets us know which tile was clicked

    if (confirm("Is this your choice?")) {
        setPlayer.disabled = true;
        // setPlayer.remove(); //this happens after the conditional has occurred  
        
        player1.push(tile); //.push allows you to add things to an array

        tile.classList.add("battleship");
        const tiles = document.querySelectorAll(".tile");

        //pick a randon tile for player 2 (computer)
        player2.push(tiles[getRandomInt(tiles.length)]); //this is dependent upon when you want the computer to chose the tile (before or after Player 1)      
        
        battleships--;

        if (battleships == 0) {
            for (const tile of tiles) {
                //find each tile and remove the pickTile event listener
                tile.removeEventListener("click", pickTile);
                tile.addEventListener("click", play);
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function play(event) {
    if (!gameover) {
        let tile = event.target;
        tile.classList.add("shot");

        //if the tile that we clicked on matches the player 2 tile
        if (player2.includes(tile)) {
            let idx = player2.indexOf(tile);
            player2.splice(idx, 1);
            tile.classList.add("winPlayer1");
            
            if (player2.length == 0) {
                gameover = true;
                message.innerText = "Player 1 wins!!!";
                reset.disabled = false;
            } 
            
        } else {
            //get all the tiles
            let tiles = document.querySelectorAll(".tile");
            //converting a NodelIst to an array
            tiles = Array.from(tiles);
            tiles = tiles.filter((tile) => {
                if (!computerShots.includes(tile)) {
                    return tile;
                }
            });

            // console.log(tiles);
            let idx = getRandomInt(tiles.length);
            let shot = tiles[idx];
            computerShots.push(shot);

            // do stuff 

            //remove any tiles from the tiles nodelist that may be in the computershots array

            //loop through the tiles and decide if the computershots array contains this tiles index

            // console.log(idx, player1); //to log out where the shot and player 1 is
            // console.log(computerShots);

        if (player1.includes(shot)) {
            let idx = player1.indexOf(shot);
            player1.splice(idx, 1);

            if (player1.length == 0) {
                gameover = true;
                message.innerText = "Player 2 wins!!!";
                shot.classList.add("winPlayer2");
                reset.disabled = false;
            }
        }
    } 
}
}

init(); //when the js gets loaded, it's going to fire the init function and loop through and create the div and give it a number








// /*  PSEUDOCODE
// set player 1 on the gamerboard
// randomly set player 2 (computer)
// click on tiles to try and hit player2
// player2 randomly picks a tile to try and hit player 1

// if player 1 hits player 2
//     player 1 wins
// if player 2 hits player 1
//     player 2 wins

// */
// let battleships = 2;
// const perRow = 3;
// const root = document.documentElement;
// root.style.setProperty('--perRow', perRow); 
//         //this manipulates our css in our css selector which is currently set to three which is why our width and height work out. If we changed it to 4 it adjust itself.
// let player1 = [];
// let player2 = [];
// let gameover = false;
// let computerShots = []; //as computer takes it shot, save that index in here

// const message = document.getElementById('message');

// const setPlayer = document.getElementById('setPlayer');
// setPlayer.addEventListener('click', setPlayerOne);

// const reset = document.getElementById('reset');
// reset.addEventListener('click', resetGame);

// function init() {
//     const gameboard = document.getElementById('gameboard');
//     for (let i = 0; i < perRow ** 2; i++) { //perRow raised to the power of 2 so 3*3=9 or 3^2
//         let tile = document.createElement('div');  //this is creating a new div in a var named tile
//         tile.className = `tile tile-${i}`; //give it a className tile, add string iterpolation to pass in the index of the thing we are creating
//         tile.innerText = i; //make the text inside i
//         gameboard.appendChild(tile); //adds child element
//     }
// }
// //note appendChild adds dom nodes. this is saying hey gameboard, which we attached by get element by id. hey dom board i want to append a child element. this element is what we created in a class called div saved inside tile that has i inside. and it knows how many divs to add because we did a for loop where we did the perRow**2 which is 9. To increase our size we could change the const perRow by changing how many pieces we want perRow

// function resetGame() {
//     const gameboard = document.getElementById('gameboard');
//     gameboard.innerText = '';
//     init();  //reinitialize the gameboard
//     setPlayer.disabled = false;
//     gameover = false;
//     computerShots = [];
//     message.innerText = '';
// }

// function setPlayerOne() {
//     reset.disabled = true;
//     const tiles = document.querySelectorAll('.tile');
//             //note Doing it this way with the forEach is familiar.
//             // tiles.forEach(tile => tile.addEventListener('click, pickTile'));
//             //note This is another way of using for loops to get tiles and attach an event listener. For tile of tiles, add the event listener on click pickTile
//     for (const tile of tiles) {
//         tile.addEventListener('click', pickTile);
//     }

//     alert('Please select a tile for player 1.');
// }

// function pickTile(event) {

//     let tile = event.target;

    
//     if (confirm("Is this your choice?")) {
//         setPlayer.disabled = true;
//             //this happens after the conditional has occured
//         player1.push(tile); //push allows you to add things to the array
//         tile.classList.add('battleship');
//         const tiles = document.querySelectorAll('.tile');
//     //todo COME BACK TO MAKE SURE COMPUTER CHOOSES DIFFERENT TILES
        
//         player2.push(tiles[getRandomInt(tiles.length)]);

//         battleships--;

//         if (battleships == 0) {
//             for (const tile of tiles) { //pick a random tile for player 2
//                 tile.removeEventListener('click', pickTile);//find each tile and remove the pickTile event listener
//                 tile.addEventListener('click', play);
//             }
//         }
//     }
// }

// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }

// function play(event) {
//     if (!gameover) {
//         let tile = event.target; 
//         tile.classList.add('shot'); 
        
//         if (player2.includes(tile)) { //if the tile that we clicked on matches the player2 tile
//             let idx = player2.indexOf(tile);
//             player2.splice(idx, 1);

//             if (player2.length == 0) {
//                 gameover = true;
//                 message.innerText = 'Player 1 wins!';
//                 tile.classlist.add('winPlayer1');
//                 reset.disabled = false;
//             } 

//         } else {
//             let tiles = document.querySelectorAll('.tile'); // get all the tiles
//             tiles = Array.from(tiles); // converting a nodeList to an Array to get the methods
//             tiles = tiles.filter((tile) => { // filter those tiles from shots that have been taken
//                 if (!computerShots.includes(tile)) { // as long as the tiles aren't included in computer shot
//                     return tile; // return that tile which means the computer hasn't tried it before and now it's in an array the computer can try from like us. 
//                 }
//             });

//             //console.log(tiles)
//             let idx = getRandomInt(tiles.length); 
//             let shot = tiles[idx];
//             computerShots.push(shot); // save in computerShots
//             // do stuff 

//             //remove any tiles from the tiles nodelist that may be in the computershots array

//             //loop through the tiles and decide if the computershots array contains this tiles index

//             if (player1.includes(shot)) {
//                 let idx = player1.indexOf(shot);
//                 player1.splice(idx, 1);

//                 if (player1.length == 0) {
//                     gameover = true;
//                     message.innerText = 'Player 2 wins!';
//                     shot.classList.add('winPlayer2');
//                     reset.disabled = false;
//                 }
//             }
//         }
//     }
// }

// // function computerTurn(params) {
    
// // }

// init();     






/* ===============  
Battleship V2
HTML------------------------------
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Battleship</title>
    <style>
        :root {
            --perRow: 3;
        }

        /* {
            box-sizing: border-box;
        }

        body {
            font-family: sans-serif;
            background: #ccc;
        }

        h1 {
            text-align: center;
        }
        
        //#gameboard {
            display: flex;
            flex-wrap: wrap;
            width: 600px;
            height: 600px;
            margin: 0 auto;
            background: rgb(107, 149, 212);
        }

        .tile {
            width: calc(100%/var(--perRow));
            height: calc(100%/var(--perRow));
            border: 1px solid #fff;
        }
        .battleship {
            background: green;
        }
        .shot {
            background: orange;
        }
        .winPlayer1 {
            background: red;
        }
        .winPlayer2 {
            background: black;
        }
    </style>
</head>
<body>
    <h1>Battleship</h1>
    <div id="gameboard"></div><!-- /#gameboard  -->
    <div class="controls">
        <button id="setPlayer">Set Player 1</button>
        <button id="reset" disabled>Reset</button>
    </div>
    <div id="message"></div>
    <script src="app2.js"></script>
</body>
</html>
END HTML--------------------------

JS----------------------------------------
let battleships = 8;
const perRow = 12;
const root = document.documentElement;
root.style.setProperty('--perRow', perRow);
let player1 = [];
let player2 = [];
let gameover = false;
let computerShots = [];
const message = document.getElementById('message');

const setPlayer = document.getElementById('setPlayer');
setPlayer.addEventListener('click', setPlayerOne);

const reset = document.getElementById('reset');
reset.addEventListener('click', resetGame);

function init() {
    const gameboard = document.getElementById('gameboard');
    for (let i = 0; i < perRow ** 2; i++) {
        let tile = document.createElement('div');
        tile.className = `tile tile-${i}`;
        gameboard.appendChild(tile);
    }
}

function resetGame() {
    const gameboard = document.getElementById('gameboard');
    gameboard.innerText = '';
    init();
    setPlayer.disabled = false;
    gameover = false;
    computerShots = [];
    message.innerText = '';
}

function setPlayerOne() {
    reset.disabled = true;
    const tiles = document.querySelectorAll('.tile');
    
    for (const tile of tiles) {
        tile.addEventListener('click', pickTile);
    }
    
    alert('Please select a tile for player 1.');
}

function pickTile(event) {
    let tile = event.target;

    if (confirm("Is this your choice?")) {
        setPlayer.disabled = true;

        player1.push(tile);
        tile.classList.add('battleship');
        const tiles = document.querySelectorAll('.tile');
        player2.push(tiles[getRandomInt(tiles.length)]);
        battleships--;

        if (battleships == 0) {
            for (const tile of tiles) {
                tile.removeEventListener('click', pickTile);
                tile.addEventListener('click', play);
            }
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function play(event) {
    if (!gameover) {        
        let tile = event.target;
        tile.classList.add('shot');

        if (player2.includes(tile)) {
            let idx = player2.indexOf(tile);
            player2.splice(idx, 1);
            tile.classList.add('winPlayer1');

            if (player2.length == 0) {     
                gameover = true;
                message.innerText = 'Player 1 Wins!!!';
                reset.disabled = false;
            } else {
                computerTurn();
            }
        } else {
            computerTurn();
        }
    }
}

function computerTurn() {
    let tiles = document.querySelectorAll('.tile');
    tiles = Array.from(tiles);
    tiles = tiles.filter((tile) => {
        if (!computerShots.includes(tile)) {
            return tile;
        }
    });
    let idx = getRandomInt(tiles.length);
    let shot = tiles[idx];
    computerShots.push(shot);

    if (player1.includes(shot)) {
        let idx = player1.indexOf(shot);
        player1.splice(idx, 1);
        shot.classList.add('winPlayer2');

        if (player1.length == 0) {              
            gameover = true;
            message.innerText = 'Player 2 Wins!!!';
            reset.disabled = false;
        }
    }    
}

init();

END JS---------------------------   =============   */ 
