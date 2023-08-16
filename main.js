// IMPORT

import Tree from "./tree.js"
import prettyPrint from "./prettyPrint.js"

// CREATES A RANDOM ARRAY

function createArray(){
    let randomArray = [];
    for (let i = 0; i < 10; i++){
        randomArray.push(Math.floor(Math.random() * 100) + 1)
    }
    return randomArray;
}

// RANDOM ARRAY

const array = createArray()

// TESTS

// TEST 1

console.log('TEST 1.')

const tree = new Tree(array)
console.log('IS BALANCED? :', tree.isBalanced())

// TEST 2

console.log('TEST 2.')

console.log('LEVEL ORDER :', tree.levelOrder())
console.log('PRE ORDER :', tree.preOrder())
console.log('POST ORDER :',tree.postOrder())
console.log('IN ORDER :', tree.inOrder())

// TEST 3

tree.insert(101)
tree.insert(201)
tree.insert(301)
console.log('IS BALANCED? :', tree.isBalanced())

console.log('BALANCING TREE....')
tree.reBalance()
console.log('IS BALANCED? :', tree.isBalanced())

console.log('LEVEL ORDER :', tree.levelOrder())
console.log('PRE ORDER :', tree.preOrder())
console.log('POST ORDER :',tree.postOrder())
console.log('IN ORDER :', tree.inOrder())

// END OF CODE
