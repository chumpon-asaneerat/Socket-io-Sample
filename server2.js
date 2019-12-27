// Test get arguments from command line.
// Use NPM
// When execute below code
//
// PS D:..>npm start param1=1 param2=2
//
// The npm will execute the node with config in package.json
// so its will used main property to get the main js file to run node command
// for example if main is set to server.js the below command will execute.
//
// node server.js "parem1=1" "param2=2"
// so to access the arguments we can use process.argv to get list of
// arguments

console.log('test server.js')
console.log('args count:', process.argv.length)
let i = 0;
process.argv.forEach(arg => {
    console.log('arg[' + i.toString() + '] :', arg)
    let pairs = arg.split('=');
    console.log('  key:', pairs[0], 'value:', pairs[1])
    ++i;
})

let getargs = () => {
    let obj = {}
    process.argv.forEach(arg => {
        let pairs = arg.split('=')
        if (pairs.length === 2) {
            obj[pairs[0].toLowerCase()] = pairs[1]
        }
    })
    return obj;
}

let args = getargs();
console.log('Port:', args.port)
