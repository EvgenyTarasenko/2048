const btnNewGame = document.querySelector('.header__game-intro_btn');
const playField = document.querySelector(".game-container");
const emptyGameContainer = document.querySelectorAll('.game-container > .game-container__cell');

const length = 4;
let cellArray = [];



const generate = () => {
  const randomCell =  Math.floor(Math.random() * (cellArray.length));
  const value = cellArray[randomCell].innerHTML;
  if(Number(value) === 0) {
    let cardValue = 2;
    const randomValue = parseInt(Math.random() * 10) + 1;
    if(randomValue > 9) {
      cardValue = 4;
    }
    cellArray[randomCell].innerHTML = cardValue;
  } else {
    generate() //рекурсия !
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


const makeSubArray = () => {
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


const convertSubArray = (data) => {
  const un = []
  data.forEach((item) => un.push(...item));

  return un;
}

const countUp = () => {
  const val = makeSubArray();

  // [[0,0,0,0], [0,0,0,0], ['0', '0', '0', '0'] , ['2', '0', '2', '0']]
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
  }, [])

  console.log(aaa, 'up up up');
}

const countRight = () => {
  const arrays = makeSubArray();
// [['0', '2', '0', '0'], ['0', '0', '0', '0'] , ['0', '0', '0', '0'] , ['2', '0', '0', '0']]     0
// [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]     0
// [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]     


// [['0', '0', '0', '2'], ['0', '0', '0', '0'] , ['0', '0', '0', '0'] , ['0', '0', '0', '2']]     0

  const counted = arrays.reduce((initArray, subarray) => {
    console.log(subarray, 'elelelel')
    const newYYY = []
    const newCountedArray = subarray.reduceRight((prevVal, curVal, index) => {
      const prevValNum = Number(prevVal);
      const curValNaum =  Number(curVal);
      if(index === 0) {
        prevValNum === curValNaum;
        return;
      }
      if(prevValNum === curValNaum) {
        newYYY.push(prevValNum + curValNaum);
        val = 0;
      }  else {
        newYYY.push(prevValNum);
        newYYY.push(curValNaum);
      }
      if(prevValNum === 0) {
        
      }
    }, 0)
  }, [])

  console.log(counted, 'kdkd');

  const converted = convertSubArray(arrays);
}

const countLeft = () => {
  const arrays = makeSubArray(); 
}
  

function checkKey (e) {
  e = e || window.event;

  if (e.keyCode == '38') {
    e.preventDefault();
    countUp();
  }
  if (e.keyCode == '40') {
    e.preventDefault();
    console.log('down down down');
  }
  if (e.keyCode == '39') {
    e.preventDefault();
    countRight()
    console.log('right right right');
  }
  if (e.keyCode == '37') {
    e.preventDefault();
    console.log('left left left');
  }
}



document.onkeydown = checkKey;

btnNewGame.addEventListener('click', startGame);