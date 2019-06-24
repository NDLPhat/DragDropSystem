export default class DrapDropGeneral {
  constructor(el, config) {
    this.config = config;
    console.log(el, " el");
    this.el = el;
    this.x = null;
    this.y = null;
    this.start = false;
    // this.owner = owner;
  }



  get left() {
    return $(this.el).offset().left;
  }

  get top() {
    return $(this.el).offset().top;
  }

  get right() {
    return $(this.el).offset().left + $(this.el).outerWidth();
  }

  get bottom() {
    return $(this.el).offset().top + $(this.el).outerHeight();
  }

  get isStartMove() {
    return this.start;
  }

  curX(x) {
    this.x = x;
  }

  curY(y) {
    this.y = y;
  }

  startMove(flag) {
    this.start = flag;
  }
}
