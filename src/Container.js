import DrapDropGeneral from "./DrapDropGeneral";

export default class Container extends DrapDropGeneral {
  constructor(el, config) {
    super(el, config);
  }

  moveAt(x, y) {
    $(this.el).css({ "position": "relative", "top": y, left: x });
  }

}
