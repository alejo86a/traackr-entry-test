const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

console.time('process');

  
const fileName = 'coding-test-data3.txt'
const instream = fs.createReadStream(fileName);
const outstream = new stream();
const lineReader = readline.createInterface(instream, outstream);
let totalLines = 0;

const fullNames = []; // Array of string 'lastName, name'
const names = {}; // Dictionary of names {name: count}
const lastNames = {}; // Dictionary of last names {last: count}
const regExpAlphabet= /^[a-zA-Z]+$/i;
const maxOfNames = 25   // max of names to be considered

const insertIn = (arr, key)=>{
    let value = arr[key];
    if (typeof value!=='undefined') {
        return arr[key]+=1;
    } else {
        return arr[key]=1;
    }
}
const isValidFullName = nameSplited => !regExpAlphabet.test(nameSplited[0]) || !regExpAlphabet.test(nameSplited[1]);

const countBy = (arr) =>{
    return Object.keys(arr).length
}

const countByFullName= ()=>{
    return 1
}  

const orderBy=(arr)=>{
    return Object.entries(arr).sort((a,b)=>b[1]-a[1]).slice(0,10).map(x=>x[0]+' with '+x[1])
}

const getStep1=()=>{
    const a = [];
    for (let i = 0; i < fullNames.length; i++) {
        const auxNameSplited = fullNames[i].split(', ');
        if(a.length===maxOfNames) break;
        if(a.findIndex(x=>x.name===auxNameSplited[1])===-1 && a.findIndex(x=>x.lastName===auxNameSplited[0])===-1){
            a.push({name: auxNameSplited[1], lastName: auxNameSplited[0]})
        }
    }
    return a;
}

const getStep2=(step1)=>{
    if(step1.length<2) return 'It is not possible to create a step 2';
    return step1.map((x,i)=>{
        return {name: i===(step1.length-1)?step1[0].name:step1[(i+1)].name, lastName: x.lastName}
    });
}
  
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
  lineReader.on('close', () => {
    console.log('Cardinality by name: ' + countBy(names)+ ' Cardinality by lastName: ' + countBy(lastNames) +' Cardinality by full name: ' + fullNames.length);
    console.log('The ten most common last names sorted in descending order '+ orderBy(lastNames).join(', '));
    console.log('The ten most common first names sorted in descending order '+ orderBy(names).join(', '));
    const step1 = getStep1();
    console.log('step1',step1)
    console.log('step2',getStep2(step1))
    console.timeEnd('process')
  });