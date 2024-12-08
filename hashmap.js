import LinkedList from "./linked-list.js";

class HashMap {
  constructor() {
    this.bucketSize = 16;
    this.bucket = new Array(this.bucketSize);
    this.loadFactor = (Math.round(0 * 100) / 100).toFixed(2);
    this.capacity = this.bucket.length;
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
    const hashedKey = this.hash(key) % this.bucketSize;
    if (hashedKey < 0 || hashedKey >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (!this.bucket[hashedKey]) {
      this.bucket[hashedKey] = new LinkedList([key, value]);
      this.mapLength++;
      this.loadFactor = (
        Math.round((this.mapLength / this.bucketSize) * 100) / 100
      ).toFixed(2);
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
    this.loadFactor = (
      Math.round((this.mapLength / this.bucketSize) * 100) / 100
    ).toFixed(2);
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
      this.loadFactor = (
        Math.round((this.mapLength / this.bucketSize) * 100) / 100
      ).toFixed(2);
      return true;
    }

    while (currentNode && currentNode.next) {
      if (currentNode.next.value[0] === key) {
        linkedList.removeAt(index + 1);

        if (linkedList.length === 0) {
          this.bucket[hashedKey] = undefined;
        }

        this.mapLength--;
        this.loadFactor = (
          Math.round((this.mapLength / this.bucketSize) * 100) / 100
        ).toFixed(2);
        return true;
      }
      currentNode = currentNode.next;
      index++;
    }

    return false;
  }

  entries() {
    return this.bucket;
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

  increaseCapacity() {}
}

export default HashMap;
