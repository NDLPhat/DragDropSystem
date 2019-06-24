import DrapDropGeneral from "./DrapDropGeneral";
import Group from './Group';

export default class Item extends DrapDropGeneral {
  constructor(el, config) {
    super(el, config);
  }

  moveAt(x, y) {
    $(this.el).css({ "position": "relative", "top": y, left: x });
  }

  get groups() {
    var groups = [];
    $(".group").map((index, item) => {
      groups.push(new Group(item, this.config));
    });
    return groups;
  }

  makeNewGroup() {
    this.groups.map(group => {
      console.log(group, "group here");
      // if (this.el.left > item.)
    })
  }

}
