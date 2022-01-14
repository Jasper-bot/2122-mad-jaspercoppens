// returns true if array2 is a subset of array1
export function isSubset (array1, array2) {
    return array2.every(function (element) {
        return array1.includes(element);
    });
}

// returns array without leading or trailing whitespace.
export function removeWhitespaceFromArray(array){
    let newArray = [];
    array.forEach(X => {
        X = X.replace(/^\s+|\s+$/gm,'');
        newArray.push(X);
    });
    return newArray;
}

//returns string without leading or trailing whitespace.
export function removeWhitespaceFromString(string) {
    return string.replaceAll(/\s/g, "");
}

export function capitalsToLowercaseArray(array) {
    let newArray = [];
    array.forEach(X => {
        X = X.toLowerCase();
        newArray.push(X);
    });
    return newArray;
}

//converts string to array split by comma. Without capitals or leading/trailing whitespace.
export function stringToArrayByComma(string) {
    string = string.toLowerCase();
    let array = string.split(',');
    return removeWhitespaceFromArray(array);
}

// converts string to array split by 2 empty lines. Without capitals or leading/trailing whitespace.
export function stringToArrayByNewline(string) {
    string = string.toLowerCase();
    let array = string.split('\n\n');
    return removeWhitespaceFromArray(array);
}
//
// export interface Badges{
// Dessert: [], Veggie:[], Vis:[], Vlees:[]
// }
// export function toBadges(doc): Badges {
//     return{...doc.data()}
// }