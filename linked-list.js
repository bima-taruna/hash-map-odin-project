import Node from "./node.js";

class LinkedList {
  constructor(value) {
    this.nodeHead = {
      value: value,
      next: null,
    };

    this.nodeTail = this.nodeHead;
    if (value !== null || value !== undefined) {
      this.length = 1;
    } else {
      this.length = 0;
    }
  }

  append(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.nodeHead = newNode;
      this.nodeTail = newNode;
      this.length++;
    } else {
      this.nodeTail.next = newNode;
      this.nodeTail = newNode;
      this.length++;
    }
  }

  prepend(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.nodeHead = newNode;
      this.nodeTail = newNode;
      this.length++;
    } else {
      newNode.next = this.nodeHead;
      this.nodeHead = newNode;
      this.length++;
    }
  }

  pop() {
    if (this.length > 1) {
      let targetNode = this.at(this.length - 2);
      targetNode.next = null;
      this.nodeTail = targetNode;
      this.length--;
    } else {
      this.nodeHead = null;
      this.nodeTail = null;
      this.length--;
    }
  }

  at(index) {
    let counter = 0;
    let currentNode = this.nodeHead;
    while (index !== counter) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  contains(value) {
    let currentNode = this.nodeHead;
    let counter = 0;
    while (counter !== this.length - 1) {
      if (currentNode.value !== value) {
        currentNode = currentNode.next;
        counter++;
      } else if (currentNode.value === value) {
        return true;
      }
    }
    return false;
  }

  find(value) {
    let currentNode = this.nodeHead;
    let counter = 0;
    while (counter !== this.length - 1) {
      if (currentNode.value !== value) {
        currentNode = currentNode.next;
        counter++;
      } else if (currentNode.value === value) {
        return counter;
      }
    }
    return null;
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
    }
    if (index === this.length - 1) {
      this.append(value);
    } else {
      const newNode = new Node(value);
      const before = this.at(index - 1);
      const target = before.next;
      newNode.next = target;
      before.next = newNode;
    }
    this.length++;
  }

  removeAt(index) {
    if (index === this.length - 1) {
      this.pop();
    }
    if (index === 0) {
      let newHead = this.nodeHead.next;
      this.nodeHead = newHead;
    } else {
      const beforeNode = this.at(index - 1);
      const targetNode = this.at(index);
      beforeNode.next = targetNode.next;
    }
    this.length--;
  }

  size() {
    return this.length;
  }

  head() {
    return this.nodeHead;
  }

  tail() {
    return this.nodeTail;
  }

  toString() {
    const arr = [];
    let currentNode = this.nodeHead;
    while (currentNode !== null) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    if (this.length === 0) {
      return "linked list is empty";
    }
    return arr.map((item) => `( ${item} ) ->`).join(" ") + " null";
  }
}

export default LinkedList;
