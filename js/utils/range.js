export class Range {
  #value;

  constructor(min = 0, max = 100, step = 1, value) {
    this.min = min;
    this.max = max;
    this.step = step;
    this.#value = value || max;
  }

  increase() {
    this.#value = Math.min(this.#value + this.step, this.max);
  }

  decrease() {
    this.#value = Math.max(this.#value - this.step, this.min);
  }

  get value() {
    return this.#value;
  }
}
