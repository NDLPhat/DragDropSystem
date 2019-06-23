import Group from "./Group";
import Container from "./Container";

export default class DragDropFactory {
  constructor(config) {
    console.log(config, "config");
    this.config = config;
    this.x = null;
    this.y = null;
    // super("!", config);
  }

  init() {
    var self = this;

    this.group.containers.map((item) => {
      const { el } = item;
      console.log(item.el);
      $(el).on("mousedown", function (e) {
        console.log(e.clientX, "mousedown");
      })
      $(el).on("touchstart", function (e) {
        self.x = $(e.target).offset().left - el.left;
        self.y = $(e.target).offset().top - el.top;
        console.log($(e.target).offset().left, item.left, $(el), "start");
        // if ($(e.target))
        // const left = $(e.target).offset().left;
        // const right = $(e.target).offset().left + $(e.target).outerWidth();

        // const top = console.log("touchstart: ");
      });

      $(el).on("touchend", function (e) {

      });

      $(el).on("touchmove", function (e) {
        console.log($(e.target).offset().left, $(e.target).offset().top, "move");
        el.moveAt($(e.target).offset().left - self.x, $(e.target).offset().top - self.y);
        // console.log("touchmove: ", e.touches[0].clientX, e.touches[0].clientY);
      });
    });

    // $(document.body).on("mouseup", function(event) {
    //   console.log("mouseup:", event.clientX, event.clientY);
    // });
    // $(document.body).on("mousedown", function(event) {
    //   console.log("mousedown:", event.clientX, event.clientY);
    // });
    // $(document.body).on("mousemove", function(event) {
    //   console.log("mousemove:", event.clientX, event.clientY);
    // });
    // $(document.body).on("dragover", function(evt) {
    //   var x = evt.pageX;
    //   var y = evt.pageY;
    //   console.log(x, y);
    // });
  }

  get group() {
    const group = $(".group.active");
    console.log(group, "Group");
    return new Group(group, this.config);
  }

  container() {
    $(".active1");
  }
}
