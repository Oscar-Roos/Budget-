const { expenses, income } = require("./db.js");

const getElementById = (id, elementList) => {
    return elementList.find((element) => {
      return element.id === Number(id);
    });
  };
  
const getIndexById = (id, elementList) => {
    return elementList.findIndex((element) => {
      return element.id === Number(id);
    });
  };

const sumArr = (arr) => {
    if (Array.isArray(arr)) {
        const arrSum = arr.map(item => item.sum);
        let sum = 0;
        for (const el of arrSum) {
            sum += el;
        }
        return(sum);
    } else {
        console.log(arr + ' is not an array');
    }
}

const addToArr = (path, source, sum, counter, arr) => {
    counter ++;
        arr.push({id: counter, source: source, sum: sum});
}

const updateArr = (id, source, sum, list) => {
    let indexId = id-1;
    list[indexId] = {id: id, source: source, sum: sum};
    return list[indexId];
}

const removeFromArr = (id, arr) => {
    if (id<arr.length) {
    const indexToRemove = id-1;
    arr.splice(indexToRemove, 1);
    for (let i = indexToRemove; i < arr.length; i++) {
        arr[i].id--;
    } 
      return 204;
    } else {
      return 404;
    }
}

  module.exports = {getElementById ,getIndexById, sumArr, addToArr, removeFromArr, updateArr}