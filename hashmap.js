import LinkedList from "./linked-list.js";

class HashMap {
  constructor() {
    this.bucketSize = 16;
    this.bucket = new Array(this.bucketSize);
    this.loadFactor = 0;
    this.mapLength = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  set(key, value) {
    if ((this.mapLength + 1) / this.bucketSize > 0.75) {
      this.increaseCapacity();
    }
    const hashedKey = this.hash(key) % this.bucketSize;
    if (hashedKey < 0 || hashedKey >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (!this.bucket[hashedKey]) {
      this.bucket[hashedKey] = new LinkedList([key, value]);
      this.mapLength++;
      this.loadFactor = this.mapLength / this.bucketSize;
      return;
    }
    let currentNode = this.bucket[hashedKey].nodeHead;
    while (currentNode !== null) {
      if (currentNode.value[0] === key) {
        currentNode.value[1] = value;
        return;
      }
      currentNode = currentNode.next;
    }
    this.bucket[hashedKey].append([key, value]);
    this.mapLength++;
    this.loadFactor = this.mapLength / this.bucketSize;
  }

  get(key) {
    const hashedKey = this.hash(key) % this.bucketSize;
    if (hashedKey < 0 || hashedKey >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.bucket[hashedKey]) {
      let currentNode = this.bucket[hashedKey].nodeHead;
      while (currentNode.value !== null) {
        if (currentNode.value[0] === key) {
          return currentNode.value[1];
        }
        currentNode = currentNode.next;
      }
    }
    return null;
  }

  has(key) {
    const hashedKey = this.hash(key) % this.bucketSize;
    if (this.bucket[hashedKey]) {
      let currentNode = this.bucket[hashedKey].nodeHead;
      while (currentNode.value !== null) {
        if (currentNode.value[0] === key) {
          return true;
        }
        currentNode = currentNode.next;
      }
    }
    return false;
  }

  remove(key) {
    const hashedKey = this.hash(key) % this.bucketSize;

    if (!this.bucket[hashedKey]) {
      return false;
    }

    const linkedList = this.bucket[hashedKey];
    let currentNode = linkedList.nodeHead;
    let index = 0;

    if (currentNode && currentNode.value[0] === key) {
      linkedList.removeAt(0);

      if (linkedList.length === 0) {
        this.bucket[hashedKey] = undefined;
      }

      this.mapLength--;
      this.loadFactor = this.mapLength / this.bucketSize;
      return true;
    }

    while (currentNode && currentNode.next) {
      if (currentNode.next.value[0] === key) {
        linkedList.removeAt(index + 1);

        if (linkedList.length === 0) {
          this.bucket[hashedKey] = undefined;
        }

        this.mapLength--;
        this.loadFactor = this.mapLength / this.bucketSize;
        return true;
      }
      currentNode = currentNode.next;
      index++;
    }

    return false;
  }

  entries() {
    const values = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] && this.bucket[i].nodeHead) {
        let currentNode = this.bucket[i].nodeHead;
        while (currentNode !== null) {
          if (currentNode.value !== null) {
            values.push([currentNode.value[0], currentNode.value[1]]);
          }
          currentNode = currentNode.next;
        }
      }
    }
    return values;
  }

  clear() {
    this.bucket = new Array(this.bucketSize);
    this.mapLength = 0;
    this.loadFactor = 0;
  }

  keys() {
    const result = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] && this.bucket[i].nodeHead) {
        let currentNode = this.bucket[i].nodeHead;
        while (currentNode !== null) {
          if (currentNode.value !== null) {
            result.push(currentNode.value[0]);
          }
          currentNode = currentNode.next;
        }
      }
    }
    return result;
  }

  values() {
    const result = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] && this.bucket[i].nodeHead) {
        let currentNode = this.bucket[i].nodeHead;
        while (currentNode !== null) {
          if (currentNode.value !== null) {
            result.push(currentNode.value[1]);
          }
          currentNode = currentNode.next;
        }
      }
    }
    return result;
  }

  length() {
    return this.mapLength;
  }

  printLoadFactor() {
    return this.loadFactor;
  }

  printByIndex(index) {
    return this.bucket[index];
  }

  increaseCapacity() {
    const entries = this.entries();
    this.bucketSize *= 2;
    this.clear();
    for (const [key, value] of entries) {
      this.set(key, value);
    }
  }
}

export default HashMap;
