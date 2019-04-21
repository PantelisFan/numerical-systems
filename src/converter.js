const arabToRomanConverter = (param) => {
    let result = '';
    const arabicDecimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    // iterate the numbers of the array
    for (let i = 0; i <= arabicDecimal.length; i++) {
        // devide the same number until it won't fit anymore 
        while (param % arabicDecimal[i] < param) {
            result += roman[i];
            // add the matching roman number to our result string
            param -= arabicDecimal[i];
            // remove the decimal value of the roman number from our number
        }
    }
    return result;
}

const romanToArabConverter = (param) => {
    let mapper = { I: 1, IV: 4, V: 5, IX: 9, X: 10, XL: 40, L: 50, XC: 90, C: 100, CD: 400, D: 500, CM: 900, M: 1000 }
    let first = 0,
        arabic = 0;
        //loop through the string
    for (let i = 0; i < param.length; i++) {
        //assign the character's value
        first = mapper[param[i]];
        //check if it is the last chaaracter and if it is bigger to add or substract 
        if ((i < param.length - 1) && first < mapper[param[i + 1]])
            arabic -= first;
        else
            arabic += first;
    }
    return arabic
}

module.exports= {
    arabToRomanConverter: arabToRomanConverter,
    romanToArabConverter: romanToArabConverter
}

/**
 *         //https://www.mathsisfun.com/roman-numerals.html
 */