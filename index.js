const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a fun to initialise the game
function initGame()
{
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    // ui pr empty bhi krna padega boxes ko
    boxes.forEach((box,index) =>
    {
        box.innerText="";
       // boxes[index].style.pointerEvents="all";
         box.style.pointerEvents="all";
        // one more thing is miising   initialsise boxes with css pro again
        box.classList=`box box${ index+1 }`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`current Player-${currentPlayer}`;
}

initGame();

function swapTurn()
{
    if(currentPlayer=="X")
    {
        currentPlayer="0";
    }
    else
    {
        currentPlayer="X";
    }
    // ui update 
    gameInfo.innerText=`current player-${currentPlayer}`;
}


function checkGameOver()
{
    let answer="";

    winningPositions.forEach((position) =>
    {   
        // all three boxes shuld be non-empty and exactly same in value

        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
           // check  if winner is x
           if(gameGrid[position[0]] === "X")
               answer="X";
           else
           {
            answer= "0";
           }

           // disable pointer events
           boxes.forEach((box) => 
            {
                box.style.pointerEvents="none";
            })
           // now we no x/0 is a winner  high light the winning box
           boxes[position[0]].classList.add("win");
           boxes[position[1]].classList.add("win");
           boxes[position[2]].classList.add("win");
        }
    });
    // it means   
    if(answer !== "")
    {
        gameInfo.innerText=`winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when there is  tie

     let fillCount=0;
     gameGrid.forEach((box) =>
    {
        if(box !== "")
             fillCount++;
    });

    // board is filled ,game is tie

    if(fillCount==9)
    {
        gameInfo.innerText="Game Tied";
        newGameBtn.classList.add("active");


    }


}

function handleClick(index)
{
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap turn
        swapTurn();
        // check koi jeet to ni gya
        checkGameOver();

    }
}


boxes.forEach((box,index)=>
{
    box.addEventListener("click",() => {
        handleClick(index);
    });
});


newGameBtn.addEventListener("click",initGame);