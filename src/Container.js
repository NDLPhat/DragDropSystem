import DrapDropGeneral from "./DrapDropGeneral";
import Group from "./Group";
import Item from "./Item"

export default class Container extends DrapDropGeneral {
    constructor(el, config) {
        super(el, config);
    }

    get items() {
        return new Item($(this.el).find(".item").get(0), this.config);
    }

    get group() {
        if ($(this.el).parent().is(".group")) return new Group($(this.el).parent().get(0), this.config);
    }

}
