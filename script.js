const X_CLASS='x'
const CIRCLE_CLASS='circle'
const WINNING_COMBINATIONS=
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
//To mark whose turn it is
let circleTurn
//Get all cells in a nodeList
const cellElements=document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
const winningMessageTextElement= document.querySelector('[data-winning-message-text]')
const winningMessageElement= document.getElementById('winningMessage')
const restartButton= document.getElementById('restartButton')

restartButton.addEventListener('click',startGame)

startGame()

function startGame(){
    circleTurn=false //X's turn first
    //for Each cell listen for click event-
    cellElements.forEach(cell => {
        //clear the board for new start
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        
        //attach event listener to each cell
        //{once:true} - fires Event Listener only once
        cell.addEventListener('click',handleClick,{ once: true })
    })

    //hover of mark based on turn - X or circle
    setBoardHoverClass()
    //hide the winning message element
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    //cell which is clicked
    const cell = e.target;
    //whose turn is it?
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        //false here is for DRAW, whether draw happened or not
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

//Allows hovering wrt to turn
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}


//check if current class - X or circle has won
function checkWin(currentClass){
    // check in WINNING_COMBINATION array if any combination has all positions filled with current class
    return WINNING_COMBINATIONS.some( combination => {
        //for current combination, check if each index/position is filled with current class
        return combination.every( index=> {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw(){
    //check if each cell is filled i.e each cell has X_CLASS or CIRCLE_CLASS
    //cellElements is a nodeList, it has to be converted to array with [...cellElements]
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(draw){
    //draw is variable for if check if there's a tie
    if(draw){
        winningMessageTextElement.innerText="Draw!"
    }
    else{ //Not a draw
        winningMessageTextElement.innerText= (circleTurn ? "O's" : "X's" ) + " WINS!" 
    }
    winningMessageElement.classList.add('show')
}

