import DrapDropGeneral from "./DrapDropGeneral";
import Container from "./Container";

export default class Group extends DrapDropGeneral {
  constructor(el, config) {
    super(el, config);
  }

  get containers() {
    var containers = [];
    $(".container").map((index, item) => {
      containers.push(new Container(item, this.config));
    });
    return containers;
  }
}
