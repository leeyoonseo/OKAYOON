export const isEmptyObj = obj => {
    if(obj.constructor === Object && Object.keys(obj).length === 0)  {
        return true;
    }
    
    return false;
}

export const shuffleArray = arr => {
    let temp = arr.map(v => {
        return cloneObject(v);
    });

    for(let i = temp.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    return temp;
};

export const cloneObject = obj => {
    let clone = {};

    for (var key in obj) {
        if (typeof obj[key] == 'object' && obj[key] != null) {
            clone[key] = cloneObject(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }

    return clone;
}