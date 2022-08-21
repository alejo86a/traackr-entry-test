var fs= require('fs'),
    es = require('event-stream');
let totalLines = 0;
let names = [];
let lastNames = [];

var s= fs
    .createReadStream('coding-test-data3.txt')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){
        totalLines++;
        let splited = line.match('([A-Za-z]+),\\s*([A-Za-z]+)n?');
        if(splited){
            let [fullName, name, lastName] = splited;
            insertIn(names, name, lastName);
            insertIn(lastNames, lastName, name)
        }

    })
    .on('error', function(err){
        console.log('Error: ' + err);
    }))
    .on('end', function(){
        console.log('Cardinality by name: ' + countByName()+ ' Cardinality by lastName: ' + countByLastName() +' Cardinality by full name: ' + countByFullName());
        console.log('The ten most common last names sorted in descending order '+ orderBy(lastNames).join(', '));
        console.log('The ten most common first names sorted in descending order '+ orderBy(names).join(', '));
        // let step1 = getStep1();
        // console.log('step1',step1)
        // console.log('step2',getStep2(step1,25))
        // console.log('Done',totalLines);
    });

function splitLine(line){
    // hacerlo con RegExp
    // validar que el nombre y apellido sean AZza
    let split = line.split(' ');
    return {name: split[0].slice(0,-1),lastName: split[1]};
}

function insertIn(arr, key, value){
    let i = arr.findIndex(x=>x.key===key);
    if (i===-1) {
        arr.push({key: key, value: (new Set()).add(value)})
    } else {
        arr[i].value.add(value)
    }
}

function countByName(){
    return names.length
}

function countByLastName(){
    return lastNames.length
}

function countByFullName(){
    return names.reduce((a,b)=>a+b.value.size,0)
}

function orderBy(arr){
    return arr.sort((a,b)=>b.value.size-a.value.size).slice(0,10).map(x=>x.key+': '+x.value.size)
}

function getStep1(){
    return names.reduce((a,b)=>{
        let aux = Array.from(b.value);
        let result = aux.filter(x => !(a.map(y=>y.value).includes(x)))
        if(result.length!==0){
            a.push({key: b.key, value: result[0]})
        }
        return a
    },[]);
}

function getStep2(step1,n){
    return step1.reduce((a,b)=>a.concat(step1.filter(x=>x.value.localeCompare(b.value)).map(x=>x.value+', '+b.key)),[]);
    // let a = [];
    // for(let i=0;i<n;i++){
    //     a.push(step1[i].key+', '+step1[(i+1)].value)
    // }
    // return a;

}