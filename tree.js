// IMPORT

import Node from './node.js'

// TREE CLASS

export default class Tree{
    constructor(array){
        this.root = this.buildTree(array)
    }
    
    // SORTS THE GIVEN ARRAY
    
    sortArray(array){
        let sortedArray = [...new Set(array)].sort((a,b) => a - b)
        return sortedArray
    }
    
    
    // BUILD THE TREE USING THE GIVEN ARRAY
    
    buildTree(array){
        
        let sortedArray = this.sortArray(array)
        let length = sortedArray.length
        if (length === 0) return null;
        
        let middle = Math.floor(length/2)
        const root = new Node(
            
            sortedArray[middle],
            this.buildTree(sortedArray.slice(0, middle)),
            this.buildTree(sortedArray.slice(middle + 1,length))
        )
            
        return root;
        
    }
    
    // MIN VALUE
    
    minValue(root) {
        let value = root.data;
        while (root.left != null) {
            value = root.left.data;
            root = root.left;
        }
        return value;
    }  
    
    // INSERT VALUES INTO THE TREE
    
    insert(value, root = this.root){
        if (root === null) {
            root = new Node(value);
            return root;
        }
        value < root.data 
            ? root.left = this.insert(value, root.left) 
            : root.right = this.insert(value, root.right);
        return root;
    }
    
    // DELETE VALUES FROM THE TREE
    
    delete(value, root = this.root){
        if (root === null) return root;
        if (value < root.data) root.left = this.delete(value, root.left)    
        else if(value > root.data)  root.right = this.delete(value, root.right) 
        else{
            if (root.left === null){
                return root.right

            }
            else if (root.right === null){
                return root.left
            }
            root.data = this.minValue(root.right)
            root.right = this.delete(value, root.right)
        }
        return root;
    }
    
    
    // FIND VALUE 
    
    find(value, root = this.root){
        
        if (root === null) return null;
        if (value !== root.data){
         return (root.data > value) ? this.find(value, root.left) : this.find(value, root.right)     
        }
        return root;
    }
    
    // LEVEL ORDER
    
    levelOrder(root = this.root){
        if (root === null) return [];
        let queue = [root]
        let result = []

        while (queue.length){
            result.push(queue.map(node => node.data))
            
            for (let i = 0; i < queue.length; i++){
                const node = queue.shift()
                if (node.left) queue.push(node.left)
                if (node.right) queue.push(node.right)   
            }
        }
        return result;
    }  
    
    
    // PREORDER
    
    preOrder(callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const results = [];
        while (stack.length) {
            const node = stack.pop();
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
            if (callback) callback(node);
            results.push(node.data);
        }
        if (!callback) return results;
    }
    
    // POSTORDER
    
    postOrder(callback) {
        
        if (!this.root) return [];
        const stack = [this.root];
        const results = [];
        while (stack.length) {
        const node = stack.pop();
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
        if (callback) callback(node);
        results.push(node.data);
        }
        if (!callback) return results.reverse();
    }
    
    // INORDER
    
    inOrder(node = this.root, callback, result = []) {
        if (!this.root) return [];
        if (node === null) return;
        this.inOrder(node.left, callback, result);
        callback ? callback(node) : result.push(node.data);
        this.inOrder(node.right, callback, result);
        if (result) return result;
    }

    
    // HEIGHT OF A NODE
    
    height(root = this.root){
        if (root === null) return -1;
        const leftNodeHeight = this.height(root.left)
        const rightNodeHeight = this.height(root.right)
        return Math.max(leftNodeHeight, rightNodeHeight) + 1;
    }
    
    // DEPTH OF A NODE
    
    depth(node, root = this.root, edgeCount = 0) {
        if (node === null) return null;
        if (root === null) return 0;
        if (root.data === node.data) return edgeCount;
        let count = this.depth(node, root.left, edgeCount + 1);
        if (count !== 0) return count;
        return this.depth(node, root.right, edgeCount + 1);
    }
    
    
    // IS BALANCED?
    
    isBalanced(root = this.root){
        if (root === null){
            return true;
        }
        let heightDifference = Math.abs(this.height(root.left) - this.height(root.right));
        return (
            heightDifference <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right)
        )
    }
    
    // REBALANCE
    
    rebalance(){
        if (this.root === null) return;
        const sortedArray = [...new Set(this.inOrder().sort((a, b) => a - b))];
        this.root = this.buildTree(sortedArray);
    }
         
}
         
// END OF CODE