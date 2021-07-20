class BinaryHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  leftChild(idx) {
    return idx * 2 + 1;
  }
  rightChild(idx) {
    return idx * 2 + 2;
  }
  insert(val) {
    this.heap.push(val);
    this.shiftUp();
  }
  empty() {
    return this.size() === 0;
  }
  shiftUp() {
    let idx = this.size() - 1;
    while (idx > 0) {
      let element = this.heap[idx],
        parentIdx = Math.floor((idx - 1) / 2),
        parent = this.heap[parentIdx];

      if (parent[0] >= element[0]) break;
      this.heap[idx] = parent;
      this.heap[parentIdx] = element;
      idx = parentIdx;
    }
  }

  extractMax() {
    const max = this.heap[0];
    const tmp = this.heap.pop();
    if (!this.empty()) {
      this.heap[0] = tmp;
      this.sinkDown(0);
    }
    return max;
  }

  sinkDown(idx) {
    let left = this.leftChild(idx),
      right = this.rightChild(idx),
      largest = idx;
    const length = this.size();

    if (left < length && this.heap[left][0] > this.heap[largest][0]) {
      largest = left;
    }
    if (right < length && this.heap[right][0] > this.heap[largest][0]) {
      largest = right;
    }
    if (largest !== idx) {
      let temp = this.heap[largest];
      this.heap[largest] = this.heap[idx];
      this.heap[idx] = temp;
      this.sinkDown(largest);
    }
  }
}
