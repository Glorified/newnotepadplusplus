const givenArray = [1,3,6,43,4,677];

const doubleTheArray = (givenArray)=>{

    let newArray = new Array(...givenArray);
    for(let item of givenArray){
        newArray.push(item*2);
    }

    return shuffle(newArray);
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// console.log(doubleTheArray(givenArray));

function  reverse(array){
    const numMap = new Array();
    let sumNumMap;
    for(let items of array){
        if(items%1!=0){
            numMap.push(items*2)
            array.pop(items);
            array.pop(items*2);
            sumNumMap = sumNumMap+(items*2)
        }
    }
    const remainingLength = (array.length/2) - numMap.length;

    //find numbers in array which sums up to array.sum/3 - sumnumMap

    console.log(array.find((element)=>element == 33));
}
reverse(givenArray);
//3 4 8 16 => 3 4 8 16 6 8 16 32
//sum 31 => 93

//after /2 => 1.5 2 4 8 3 4 8 16