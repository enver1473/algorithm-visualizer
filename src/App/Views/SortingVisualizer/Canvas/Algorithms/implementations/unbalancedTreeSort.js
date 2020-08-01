import { elements } from '../../Canvas';
import { pushNewState, pushLastState } from '../helperFunctions';
import { addElement } from '../../Canvas';

const traverse = (tree, newArr) => {
  if (!tree || tree.empty()) return;

  traverse(tree.leftTree, newArr);

  pushNewState([newArr.length === 0 ? 0 : newArr.length - 1]);

  newArr.push(tree.root);
  addElement(newArr.length - 1, tree.root.getValue());
  
  traverse(tree.rightTree, newArr);
};

export const unbalancedTreeSort = () => {
  let tree = new BST(elements);
  let newArr = [];
  traverse(tree, newArr);
  elements.push(2);
  pushLastState();
};

class BST {
  constructor(arr) {
    this.root = null;
    this.leftTree = null;
    this.rightTree = null;
    this.nodes = 0;

    if (!arr) return;

    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i].copy());
    }
  }

  insert = (item) => {
    this.nodes++;
    if (this.empty()) {
      this.root = item;
      return;
    }

    if (item.getValue() >= this.root.getValue()) {
      if (this.rightTree === null) {
        this.rightTree = new BST();
      }

      this.rightTree.insert(item);
    } else {
      if (this.leftTree === null) {
        this.leftTree = new BST();
      }

      this.leftTree.insert(item);
    }
  };

  empty = () => this.root === null;
}
