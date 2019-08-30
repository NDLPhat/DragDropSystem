
class extendDrag{
	constructor(el, fact){
		this.el = el;
		this.config = fact.config;
		this.fact = fact;
	}

	get left(){
		return $(this.el).offset().left;
	}

	get right(){
		return this.left + this.width;
	}

	get top(){
		return $(this.el).offset().top;
	}

	get bottom(){
		return this.top + this.height;
	}

	get width(){
		return $(this.el).outerWidth();
	}

	get height(){
		return $(this.el).outerHeight();
	}

	get parent(){
		var parent = (function checkParent(el){
			var parent = $(el).parent();
			if (parent.get(0) === document.body) return false;
			if (!parent.is("." + this.config.group)) return checkParent(parent);
			return $(parent);
		}.bind(this))(this.el)
		// console.log("parent: ", parent)
		if (parent) return new Group(this.fact, parent);
	}

}

class Group extends extendDrag{
	constructor(fact, el){
		// console.log("group: ", el);
		super(el, fact);
	}

	get items(){
		return $(this.el).find("." + this.config.item);
	}

	get isHover(){
		// console.log(this, this.fact.item);
		// TH1: 
		var item = this.fact.item;
		var xCount = 0, yCount = 0;
		console.log(item, this);
		if (item.right > this.left && item.right < this.right) xCount++;

		if (item.left < this.right && item.left > this.left) xCount++;

		if (item.left > this.left && item.right < this.right) xCount++;

		if (item.bottom > this.top && item.bottom < this.bottom) yCount++;

		if (item.top < this.bottom && item.top > this.top) yCount++;

		if (item.top > this.top && item.bottom < this.bottom) yCount++;

		// console.log("xCount yCount: ", xCount, yCount);
		// $(".text").text(xCount + " - " + yCount);
		if (xCount >= 1 && yCount >= 1) {return true}
		return false;
	}

}


class Item extends extendDrag{
	constructor(fact, el){
		super(el, fact);
		// this.fact = fact;
		this.oriX = 0;
		this.oriY = 0;
		this.offset = {
			left: $(this.el).css("left").replace("px", "") * 1 || 0,
			top: $(this.el).css("top").replace("px", "") * 1 || 0
		};
		
		this.obj = {
			idGroup: 0,
			isTransfer: false
		}

		// this.addEventListenner("out");

	}

	get item(){
		return this.el;
	}

	addEventListenner(event){
		switch(event){
			case "out":
				$(this.el).on("out", function(){
					$(this.parent.el).removeClass(this.config.active);
					$(this.el).removeClass("active");
					if (this.obj.isTransfer){
						$(this.el).attr("style", "");
						$(this.fact.groups[this.obj.idGroup].el).append(this.el);
						$(this.fact.groups[this.obj.idGroup].el).removeClass(this.config.active);
					}
					else{
						$(this.el).attr("style", "");
					}
				}.bind(this));
			break;
		}
	}

	removeListennerEvent(event){
		$(this.el).off(event);
	}

	moveAt(x, y){
		$(this.el).css({ position: "relative", left: this.offset.left + x - this.oriX, top: this.offset.top + y - this.oriY});
		var groups = this.fact.groups;
		this.obj.isTransfer = false;
		for (var i = 0 ; i < groups.length; i++){
			$(groups[i].el).removeClass(this.config.active);
			if (groups[i].isHover){
				this.obj.isTransfer = true;
				this.obj.idGroup = i;
				$(groups[i].el).addClass(this.config.active);
			}
		}
		// this.fact.groups.f
	}

	isHover(x, y){
		if ((x > this.left && x < this.right) && (y > this.top && y < this.bottom)){
			this.oriX = x;
			this.oriY = y;
			$(this.parent.el).addClass(this.config.active);
			return true;
		}
		return false;
	}
}

class factory{
	constructor(fact, config){
		this.config = config;
		this.fact = fact;
		this.el = "";
	}

	get item(){
		return new Item(self, $(".active"));
	}

	get groups(){
		var groups = [];
		var self = this;
		$(".group").each(function(){
			groups.push(new Group(self, this));
		})
		return groups;
	}

	init(){
		var self = this;

		$(window).mousemove(function(e){
			if (self.el){
				self.el.moveAt(e.clientX, e.clientY);
				// console.log(self.el.parent.isHover(1,2));
			}
		})

		$(window).mousedown(function(e){
			 $(".item").each(function(){
			 	var el = new Item(self, this);
			 	if (el.isHover(e.clientX, e.clientY)) {
			 		// console.log(el.parent, "parent here");
			 		self.el = el;
			 		$(self.el.item).addClass("active");
			 	};
			 })
	})

		$(window).mouseup(function(){
			self.el.addEventListenner("out");
			$(self.el.item).trigger("out");
			self.el.removeListennerEvent("out");
			self.el = "";
		})
	}
}

class Interface {
	constructor(config){
		this.config = config;
	}

	get factory(){
		return new factory(this, this.config);
	}

	init(){
		this.factory.init();
	}

	get item(){
		this.factory;
	}
}

var a = new Interface({item: "item", group: "group", active: "active-color", deactive: "deactive-color"});
a.init()
