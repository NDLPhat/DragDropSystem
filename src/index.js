import DragDropFactory from "./DragDropFactory";
window.$ = jQuery = $;

const factory = new DragDropFactory({ container: "container" });
factory.init();
