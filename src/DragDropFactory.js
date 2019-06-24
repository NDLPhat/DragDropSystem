import Group from "./Group";
import Container from "./Container";

export default class DragDropFactory {
  constructor(config) {
    this.config = config;
    this.offsetX = null;
    this.offsetY = null;
    this.curX = null;
    this.curY = null;

    // super("!", config);
  }

  init() {
    var self = this;

    this.containers.map((item) => {
      const curContainer = item;
      const curItem = item.items;
      const curGroup = item.group;
      console.log("ok: ", curItem.makeNewGroup())
      $(curContainer.el).on("mousemove", function (e) {
        if (curItem.isStartMove) curItem.moveAt(e.clientX - self.curX, e.clientY - self.curY);
        console.log(e.clientX, self.curX, e.clientY, self.curY);
      })

      $(curContainer.el).on("mouseup", function (e) {
        curItem.startMove(false);
        $(curItem.el).removeClass("active1");
        $(curGroup.el).removeClass("active");
        self.curX = null;
        self.curY = null;
        self.offsetX = null;
        self.offsetY = null;

        console.log(e.clientX, e.clientY, "mouseup");
      })

      $(curContainer.el).on("mousedown", function (e) {
        $(curItem.el).addClass("active1");
        $(curGroup.el).addClass("active");
        curItem.startMove(true);
        self.curX = e.clientX + $(curContainer.el).offset().left - curItem.left;
        self.curY = e.clientY + $(curContainer.el).offset().top - curItem.top;
        console.log(self.curX, $(curContainer.el).offset().left, curItem.left, "mouseup");
      })
    });
  }

  get group() {
    var groups = [];
    $(".group").map((index, item) => {
      groups.push(new Group(item, this.config));
    });
    return groups;
  }

  get containers() {
    var containers = [];
    $(".container").map((index, item) => {
      containers.push(new Container(item, this.config));
    });
    return containers;
  }
}
