const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

console.time('process');

  
const fileName = 'files/coding-test-data.txt'
const maxOfNames = 25   // max of names to be considered


const instream = fs.createReadStream(fileName);
const outstream = new stream();
const lineReader = readline.createInterface(instream, outstream);

const fullNames = []; // Array of string 'lastName, name'
const names = {}; // Dictionary of names {name: count}
const lastNames = {}; // Dictionary of last names {last: count}
const regExpAlphabet= /^[a-zA-Z]+$/i;
let totalLines = 0;

// defines if the name already exists in our temporary data structure to know if it increases the occurrence counter or starts it
const insertIn = (arr, key)=>{
    let value = arr[key];
    if (typeof value!=='undefined') {
        return arr[key]+=1;
    } else {
        return arr[key]=1;
    }
}

// defines through a regular expression if a full name is valid or not to be processed
const isValidFullName = nameSplited => !regExpAlphabet.test(nameSplited[0]) || !regExpAlphabet.test(nameSplited[1]);

// count the number of keys in our data structure to find out the number of elements. By the way it is agnostic to whether it is the array of names or surnames
const countBy = (arr) =>{
    return Object.keys(arr).length
}

// returns the first 10 elements with the most occurrences. By the way it is agnostic to whether it is the array of names or surnames
const orderBy=(arr)=>{
    return Object.entries(arr).sort((a,b)=>b[1]-a[1]).slice(0,10).map(x=>x[0]+' with '+x[1])
}

// iterates through the above data structure to find the first occurrence of each first and last name by inserting the full name without repeats into the resulting array up to the given limit
const getStep1=(arr)=>{
    const a = [];
    for (let i = 0; i < arr.length; i++) {
        const auxNameSplited = arr[i].split(', ');
        if(a.length===maxOfNames) break;
        if(a.findIndex(x=>x.name===auxNameSplited[1])===-1 && a.findIndex(x=>x.lastName===auxNameSplited[0])===-1){
            a.push({name: auxNameSplited[1], lastName: auxNameSplited[0]})
        }
    }
    return a;
}

// in the given array it keeps the position of the surnames and makes a slight displacement of the names to generate a completely new array of full names
const getStep2=(step1)=>{
    if(step1.length<2) return 'It is not possible to create a step 2';
    return step1.map((x,i)=>{
        return {name: i===(step1.length-1)?step1[0].name:step1[(i+1)].name, lastName: x.lastName}
    });
}

// reads the file line by line, checks if that line is valid, formats it and then stores it in our temporary data structure
lineReader.on('line', line => {
    totalLines = (totalLines + 1)%2;
    if(totalLines===1){
        const fullName = line.split(' -- ')[0];
        const nameSplited = fullName.split(', ');
        if (nameSplited.length !== 2 || isValidFullName(nameSplited)) {
            return;
          }

        const lastName = nameSplited[0];
        const firstName = nameSplited[1];


        fullNames.push(fullName);

        lastNames[lastName] = insertIn(lastNames, lastName);
        names[firstName] = insertIn(names, firstName);

    }
});

// From the data stored in our data structure, it calls the functions that process them and continues printing the information required by the test in the console.
lineReader.on('close', () => {
    console.log('Cardinality by name: ' + countBy(names)+ ' Cardinality by lastName: ' + countBy(lastNames) +' Cardinality by full name: ' + fullNames.length);
    console.log('The ten most common last names sorted in descending order '+ orderBy(lastNames).join(', '));
    console.log('The ten most common first names sorted in descending order '+ orderBy(names).join(', '));
    const step1 = getStep1(fullNames);
    console.log('step1',step1)
    console.log('step2',getStep2(step1))
    console.timeEnd('process')
});

// export the functions of the application so that they can be tested in another file
module.exports = {
    insertIn,
    isValidFullName,
    countBy,
    orderBy,
    getStep1,
    getStep2
};