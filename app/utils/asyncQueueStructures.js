class Stack {
  constructor() {
    this.storage = [];
    this.size = 0;
  }
  push(val) {
    this.storage[this.size++] = val;
  }
  pop() {
    if (this.size) {
      return this.storage.splice(--this.size, 1)[0];
    }
  }
}

class Queue {
  constructor() {
    this.inbox = new Stack();
    this.outbox = new Stack();
  }
  enqueue(val) {
    this.inbox.push(val);
  }
  dequeue() {
    if (this.outbox.size === 0) {
      while (this.inbox.size) {
        this.outbox.push(this.inbox.pop());
      }
    }
    return this.outbox.pop();
  }
  getSize() {
    return this.inbox.size + this.outbox.size;
  }
}

class AsyncQueue {
  constructor() {
    this._queue = new Queue();
    this.active = false;
    this.size = 0;
  }
  add(action, delay, ...args) {
    this._queue.enqueue([action, delay, args]);
    this.size++;
    if (!this.active) {
      this.active = true;
      setTimeout(() => this.runQueue(), delay);
    }
    return this.size;
  }
  runQueue() {
    if (!this.size) {
      return false;
    } else {
      this.size--;
      let [action, delay, args] = this._queue.dequeue();
      if (this.size) {
        setTimeout(() => this.runQueue(), delay);
      } else {
        this.active = false;
      }
      action.apply(action, args);
    }
  }
}

export default AsyncQueue;