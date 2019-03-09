import toRegex from 'to-regex';

const getImageImportPaths = animals => {
    let req = require.context('./images', true, /.*\.jpg$/);
    let filteredKeys = [];

    for (let i = 0; i < animals.length; i++) {
        const regex = toRegex(`./${animals[i].name}.jpg`);
        const filteredKeysTemp = req.keys().filter(key => key.match(regex));
        filteredKeys.push(filteredKeysTemp[0]);
    }
    //console.log(animals);
    //console.log(filteredKeys);
    const imagePaths = filteredKeys.map(key => req(key));
    //console.log(imagePaths);
    return imagePaths;
};

export default getImageImportPaths;

/*https://webpack.js.org/guides/dependency-management/
require.context() function takes 3 args
1. a directory to search
2. a flag whether subdirectories should be searched
3. a regular expression to match files against

A context module exports a (require) function that takes one argument: the request.
The exported function has 3 properties: resolve, keys, id
    // console.log(typeof req);
    // console.log(req);
    // console.log(req.keys);
    // //pass the key back into require to get the import
    // console.log(req(req.keys()[0]));
    // req.keys().forEach(function(key){
    //     req(key);
    //     console.log(req(key));
    // });

    once we have all import paths we can filter based
    on a RegExp and build the DOM img elements
*/
