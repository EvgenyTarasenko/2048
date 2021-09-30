const btnNewGame = document.querySelector('.header__game-intro_btn');
const playField = document.querySelector(".game-container");
const emptyGameContainer = document.querySelectorAll('.game-container > .game-container__cell');

const length = 4;
let cellArray = [];



const generate = () => {
  const randomCell =  Math.floor(Math.random() * (cellArray.length));
  const value = cellArray[randomCell].innerHTML;
  if(value === "0") {
    let cardValue = 2;
    const randomValue = parseInt(Math.random() * 10) + 1;
    if(randomValue > 9) {
      cardValue = 4;
    }
    cellArray[randomCell].innerHTML = cardValue;
  }
}

const fillGrid = () => {
  for (let item = 1; item <= length * length; item++) {
    const gameContainer = document.createElement('div');
    gameContainer.setAttribute("id", `cell-${item}`)
    gameContainer.innerHTML = 0;
    cellArray.push(gameContainer);
    playField.append(gameContainer);
  }
  generate();
  generate();
}

const startGame = (event) => {
  event.preventDefault();
  for(let elem of emptyGameContainer) {
    elem.remove(); 
  }
  if(cellArray.length < 16) {
    fillGrid()
  } else {
    for (let item = 1; item <= length * length; item++) {
      const cell = document.getElementById(`cell-${item}`);
      cell.remove();
    }
    cellArray = [];
    fillGrid()
  }
}


const count = () => {
    const initArr = []
    cellArray.forEach(item => {
      initArr.push(item.innerHTML)
    })
    let subarray = [];
    for (let i = 0; i < Math.round(initArr.length/length); i++){
      subarray[i] = initArr.slice((i*length), (i*length) + length);
    }
    return subarray;
}

const moveUp = () => {
  const val = count();

  // [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
  val[3] + val[2]

  const aaa = val.reduce((result, current, index)=> {
    const forCount = current;
    // if(!result.length) {
    //   result.push(forCount)
    // }
    // const forCount = result[0];
    current.forEach((el, index)=> {
      console.log(forCount[index], 'dddd')
      console.log(el, 'el')
      if(el === 0 || forCount[index] === el) {
        forCount[index] = 0;
        el = forCount[index] + el;
      }
    });

    result.push(current)

    console.log(forCount, 'forCount')
    console.log(current, 'current')
    console.log(result, 'result')

    // console.log(index, 'vvvvv')
    // console.log(current, 'vvvvv')
    // console.log(prev, 'pppp')
  }, [])

  console.log(aaa, 'up up up');

}
  

function checkKey (e) {
  e = e || window.event;

  if (e.keyCode == '38') {
    e.preventDefault();
    moveUp();
  }
  if (e.keyCode == '40') {
    e.preventDefault();
    console.log('down down down');
  }
  if (e.keyCode == '39') {
    e.preventDefault();
    console.log('right right right');
  }
  if (e.keyCode == '37') {
    e.preventDefault();
    console.log('left left left');
  }
}



document.onkeydown = checkKey;

btnNewGame.addEventListener('click', startGame);