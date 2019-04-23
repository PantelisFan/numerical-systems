const mongodbCtrl = require('./mongodb');
const _ = require('lodash')
const collections = require('./mongodb').collections;
const converter = require('./converter');



const arabToRoman = (param) => {
    return new Promise((resolve, reject) => {
        // console.log(`Convert ${param} to roman.`);
        //1. Check if param is num
        if (Number(param)) {
            //2. Check if param exists in db
            // const isInDb = collections.numbers.find(, );
            collections.numbers.findOne({ arabic: param }, function (err, result) {

                if (!err) {
                    // console.log('results: ', result, err);
                    if (result) {
                        let ret = {
                            "inputValue": result.arabic,
                            "convertedValue": result.roman
                        }
                        resolve(ret);
                    }
                    else {
                        //3. convert
                        const converted = converter.arabToRomanConverter(param);
                        //4. save both values
                        collections.numbers.save({ arabic: param, roman: converted }, {}, (error, object) => {
                            if (!error) {
                                //5. return both values 

                                let ret = {
                                    "inputValue": Number(param),
                                    "convertedValue": converted
                                }
                                resolve(ret);
                            }
                        })
                    }

                }
                else {
                    //todo return mongodb error and handle it in server.js
                }
            });

        } else {
            //If not return 400
            reject(400);
            // console.log('Not a number');
        }
    });

}

const romanToArab = (param) => {
    return new Promise((resolve, reject) => {
        //1. Validate the param against the regular expression
        const romanRegex = new RegExp('^M*(CM)?(D)?(CD)?(CCC|CC|C)?(XC)?(L)?(XL)?(XXX|XX|X)?(IX)?(V)?(IV)?(III|II|I)?$')
        let regResult = romanRegex.exec(param)
        if (regResult && regResult[0] === param) {
            collections.numbers.findOne({ roman: param }, function (err, result) {
                if (!err) {
                    if (result) {
                        ret = {
                            "inputValue": param,
                            "convertedValue": result.arabic
                        }
                        resolve(ret);
                    } else {
                        const converted = converter.romanToArabConverter(param)
                        collections.numbers.save({ roman: param, arabic: converted }, {}, (error, object) => {
                            // if (!error) {
                            //5. return both values 

                            let ret = {
                                "inputValue": param,
                                "convertedValue": converted
                            }
                            resolve(ret);
                            // }
                        })
                    }
                }
                else {
                    //todo return mongodb error and handle it in server.js
                    reject(err);
                }
            })
        } else {
            reject(400);
        }
    })
}

//GET all
const getAll = (param) => {
    return new Promise((resolve, reject) => {
        if (param === "arabic") {
            collections.numbers.find({}, { projection: { _id: 0, arabic: 1 } })
                .toArray((err, result) => {
                    if (err) {
                        reject(err)
                    }
                    // resolve(result)
                    resolve(_.map(result, o => { return Number(o.arabic) }).sort());

                })
        } else if (param === "roman") {
            collections.numbers.find({}, { projection: { _id: 0, roman: 1 } })
                .toArray((err, result) => {
                    if (!err) {
                        resolve(_.map(result, o => { return o.roman; }).sort());
                    }
                })
        } else {
            reject('Wrong numerical system');
        }
    })

}

const deleteAll = () => {
    return new Promise((resolve, reject) => {
        collections.numbers.deleteMany({}, (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    }
    );
}

module.exports = {
    arabToRoman: arabToRoman,
    romanToArab: romanToArab,
    getAll: getAll,
    deleteAll: deleteAll
}

/**
 * do not repeat V L D
 *
 *  IV
    IX
    XL
    XC
    CD
    CM	I
    M*(CM)?(D)?(CD)?(CCC|CC|C)?(XC)?(L)?(XL)?(XXX|XX|X)?(IX)?(V)?(IV)?(III|II|I)?
    http://sierra.nmsu.edu/morandi/coursematerials/RomanNumerals.html
 */
