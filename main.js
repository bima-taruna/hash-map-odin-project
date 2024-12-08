import HashMap from "./hashmap.js";
let hashmap = new HashMap();
hashmap.set("apple", "red");
hashmap.set("banana", "yellow");
hashmap.set("durian", "green");
hashmap.remove("durian");
console.log(hashmap.length());
console.log(hashmap.printLoadFactor());
console.log(hashmap.entries());
