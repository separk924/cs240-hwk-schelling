/**
 * Schelling's Model simulator
 * @author Seung Park
 */

//makes a table
const table = document.querySelector('#board');
//gets the input tag for the dimensions
let dims = document.querySelector('#dimension');
//gets the ratio for population 1
let popRatio = document.querySelector('#popRatio');
//gets the ratio for vacant cells
let vacantRatio = document.querySelector('#vacantRatio');
//gets the similarity threshold for algorithm
let threshold = document.querySelector('#threshold');
//gets the randomize button
let randomize = document.querySelector("#randomize");
//gets the runstop button
let runstop = document.querySelector("#runstop");
//gets the color boxes for population 1 & population 2
let pop1 = document.querySelector("#popXcolor");
let pop2 = document.querySelector("#popYcolor");
//the dimension value
var val = dims.value;

/**
 * This function calculates the vacant spots
 * @returns vacant The calculated number
 */
function calculateV(){
    let area = (dims.value)*(dims.value);
    let vacant = area*vacantRatio.value;
    return Math.floor(vacant);
}

/**
 * This function calculates the spots that Population 1 takes up
 * @returns pop1 The calculated number
 */
function calculatePop1(){
    let area = (dims.value)*(dims.value);
    area = area - calculateV();
    let pop1 = area*popRatio.value;
    return Math.floor(pop1);
}

/**
 * This function calculates the spots that Population 2 takes up
 * @returns pop1 The calculated number
 */
function calculatePop2(){
    let area = (dims.value)*(dims.value);
    let pop2 = area-(calculateV()+calculatePop1());
    return Math.floor(pop2);
}

/**
 * This function creates the grid for the population
 * @param {*} dim This is the int that creates the dimensions for the grid
 * @returns The grid
 */
function createGrid(dim){
    let table = document.createElement('table');
        for (let i=0;i<dim;i++){
            var row = document.createElement('tr');
            for(let j=0;j<dim;j++){
                var cell = document.createElement('td');
                row.appendChild(cell);
                }
            table.appendChild(row);
            }
            return table;
}
table.appendChild(createGrid(dims.value));

/**
 * This function sets the colors into place on the grid
 */
function setColors(){
    let randNum;
    let randNum0;
    var thePlace;
    var vCount = 0;
    var pop1Count = 0;
    var pop2Count = 0;
    // finds random spots for population 1
    while(pop1Count != calculatePop1()){
        randNum = Math.floor(Math.random() * (dims.value));
        randNum0 = Math.floor(Math.random() * (dims.value));
        thePlace = table.children[0].children[randNum].children[randNum0];
        if(thePlace.innerHTML != "1"){
            thePlace.style.backgroundColor = popXcolor.value;
            thePlace.innerHTML = "1";
            thePlace.style.color = popXcolor.value;
            thePlace.style.fontSize = '5px';
            pop1Count++;
        }
    }
    // finds random spots for population 2
    while(pop2Count != calculatePop2()){
        randNum = Math.floor(Math.random() * (dims.value));
        randNum0 = Math.floor(Math.random() * (dims.value));
        thePlace = table.children[0].children[randNum].children[randNum0];
        if(thePlace.innerHTML != "1" && thePlace.innerHTML != "2"){
            thePlace.style.backgroundColor = popYcolor.value;
            thePlace.innerHTML = "2";
            thePlace.style.color = popYcolor.value;
            thePlace.style.fontSize = '5px';
            pop2Count++;
        }
    }
    // finds vacant spots & only sets them in spots that have not been filled
    // by population 2
    while(vCount != calculateV()){
        randNum = Math.floor(Math.random() * (dims.value));
        randNum0 = Math.floor(Math.random() * (dims.value));
        thePlace = table.children[0].children[randNum].children[randNum0];
        if(thePlace.innerHTML != "1" && thePlace.innerHTML != "2" && thePlace.innerHTML != "0"){
            thePlace.style.backgroundColor = "#FFFFFF";
            thePlace.innerHTML = "0";
            thePlace.style.color = "#FFFFFF";
            thePlace.style.fontSize = '5px';
            vCount++;
        }
     }
}
setColors();

/**
 * Function to find whether the spaces around the particular cell has the
 * specified percentage of the same color surrounding it
 */
function isCorrectPercentage(){
    let x = table.children[0];
    let theSpot;
    let leftD, leftM, leftU, upM, rightU, rightM, rightD, downM;
    for(let i=0; i<val; i++){
        for(let j=0; j<val; j++){
            let totalX = 0;
            let totalY = 0;
            theSpot = x.children[i].children[j];
            if(i!=0 && j!=0){
                leftD = x.children[i-1].children[j-1];
            }if(i!=0){
                leftM = x.children[i-1].children[j];
            }if(i!=0 && j<val-1){
                leftU = x.children[i-1].children[j+1];
            }if(j<val-1){
                upM = x.children[i].children[j+1];
            }if(i<val-1 && j!=0){
                rightU = x.children[i+1].children[j+1];
            }if(i<val-1){
                rightM = x.children[i+1].children[j];
            }if(i<val-1 && j!=0){
                rightD = x.children[i+1].children[j-1];
            }if(i!=0){
                downM = x.children[i].children[j-1];
            }
            if(theSpot.innerHTML == "1"){
                if(typeof(leftD) != "undefined"){
                    if(leftD.innerHTML == "1"){
                    totalX++;
                }}if(typeof(leftM) != "undefined"){
                    if(leftM.innerHTML == "1"){
                    totalX++;
                }}if(typeof(leftU) != "undefined"){
                    if(leftU.innerHTML == "1"){
                    totalX++;
                }}if(typeof(upM) != "undefined"){
                    if(upM.innerHTML == "1"){
                    totalX++;
                }}if(typeof(rightU) != "undefined"){
                    if(rightU.innerHTML == "1"){
                    totalX++;
                }}if(typeof(rightM) != "undefined"){
                    if(rightM.innerHTML == "1"){
                    totalX++;
                }}if(typeof(rightD) != "undefined"){
                    if(rightD.innerHTML == "1"){
                    totalX++;
                }}if(typeof(downM) != "undefined"){
                    if(downM.innerHTML == "1"){
                    totalX++;
                }}
            }if(theSpot.innerHTML == "2"){
                if(typeof(leftD) != "undefined"){
                    if(leftD.innerHTML == "2"){
                    totalY++;
                }}if(typeof(leftM) != "undefined"){
                    if(leftM.innerHTML == "2"){
                    totalY++;
                }}if(typeof(leftU) != "undefined"){
                    if(leftU.innerHTML == "2"){
                    totalY++;
                }}if(typeof(upM) != "undefined"){
                    if(upM.innerHTML == "2"){
                    totalY++;
                }}if(typeof(rightU) != "undefined"){
                    if(rightU.innerHTML == "2"){
                    totalY++;
                }}if(typeof(rightM) != "undefined"){
                    if(rightM.innerHTML == "2"){
                    totalY++;
                }}if(typeof(rightD) != "undefined"){
                    if(rightD.innerHTML == "2"){
                    totalY++;
                }}if(typeof(downM) != "undefined"){
                    if(downM.innerHTML == "2"){
                    totalY++;
                }}
            }
            console.log(totalX);
            console.log(totalY);
            if(totalX<(threshold.value*8)){
                theSpot.style.backgroundColor = "#ffffff";
                theSpot.innerHTML = "0";
                changeLocation(popXcolor.value);
            }if(totalY<(threshold.value*8)){
                theSpot.style.backgroundColor = "#ffffff";
                theSpot.innerHTML = "0";
                changeLocation(popYcolor.value);
            }
        }
     }
     /**
     * This function changes the location of the population to a vacant spot
     * @param {*} color 
     */
    function changeLocation(color){
        let x = table.children[0];
        let theSpot;
        for (let i=0;i<val;i++){
            for(let j=0;j<val;j++){
                theSpot = x.children[i].children[j];
                if(theSpot.innerHTML == "0"){
                    theSpot.style.backgroundColor = color;
                    thePlace.style.color = "#FFFFFF";
                    break;
                }
            }
        }
    }
}

/**
 * Every time the Randomize button is clicked, the spots on the grid are 
 * randomized
 */
randomize.addEventListener("click", function(){
    table.removeChild(table.firstElementChild);
    table.appendChild(createGrid(dims.value));
    setColors();
});

/**
 * Every time the user inputs the dimensions, the board's dimensions are 
 * changed
 */
dims.addEventListener("input", function(){
    table.removeChild(table.firstElementChild);
    table.appendChild(createGrid(dims.value));
    setColors();
});

/**
 * Every time the user inputs the Population Split, the ratio of the
 * population changes
 */
popRatio.addEventListener("input", function(){
    table.removeChild(table.firstElementChild);
    table.appendChild(createGrid(dims.value));
    setColors();
});

/**
 * Every time the user inputs a different color for population 1, the colors
 * change on the board
 */
pop1.addEventListener("input", function(){
    let x = table.children[0];
    let theSpot;
    for (let i=0;i<val;i++){
        for(let j=0;j<val;j++){
            theSpot = x.children[i].children[j];
            if(theSpot.innerHTML == "1"){
                theSpot.style.backgroundColor = popXcolor.value;
                theSpot.style.color = popXcolor.value;
            }
            }
        }
});

/**
 * Every time the user inputs a different color for population 2, the colors
 * change on the board
 */
 pop2.addEventListener("input", function(){
    let x = table.children[0];
    let theSpot;
    for (let i=0;i<val;i++){
        for(let j=0;j<val;j++){
            theSpot = x.children[i].children[j];
            if(theSpot.innerHTML == "2"){
                theSpot.style.backgroundColor = popYcolor.value;
                theSpot.style.color = popYcolor.value;
            }
            }
        }
});

/**
 * Every time the vacant ratio is changed on the board, the vacancy ratio is
 * added onto the board
 */
vacantRatio.addEventListener("input", function(){
    table.removeChild(table.firstElementChild);
    table.appendChild(createGrid(dims.value));
    setColors();
});

/**
 * Every time the button is clicked it switches its functions between "Run"
 * and "Stop".
 * When it runs, it shows the changes on the board for the generations of change
 * When it stops, it pauses the board
 */
runstop.addEventListener("click", function(){
    if(runstop.innerHTML == "Run"){
        runstop.innerHTML = "Stop";
        isCorrectPercentage();
    }else {
        runstop.innerHTML = "Run";
    }
});