
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
		var _items = [];
		var self = this;
		$(this.el).find("." + this.config.item).each(function(){
			_items.push(new Item(self.fact, this));
		});
		return _items;
	}

	get isHover(){
		// console.log(this, this.fact.item);
		// TH1: 
		var item = this.fact.item;
		var xCount = 0, yCount = 0;
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

	sort(){
		var idEl = -1;
		// var self = this;
		$(this.el).attr("sort-from", idEl);
		// var heightOff = 0;
		for (var i = 0; i < this.items.length; i++){
			var item = this.items[i];
			if (this.fact.item.el.get(0) === item.el) continue;
			$(item.el).attr("style", "");
			if (item.isHover){
				idEl = i;
				var heightOff = $(item.el).outerHeight() * 1;
				$(this.el).attr("sort-from", idEl);
				var curGroupItems = $(this.el).find(".item");
				var curIdx = $(curGroupItems).index(item.el);
				var nextAllEl = curIdx - 1 < 0 ? $(this.el).find("." + this.config.item + ":not(." + "active" + ")")
					: $($(this.el).find(".item")[curIdx - 1]).nextAll("." + this.config.item + ":not(." + "active" + ")");
				$(nextAllEl).css({
					position: "relative",
					top: heightOff + "px"
				});
				break;
			}
		}
	}

}


class Item extends extendDrag{
	constructor(fact, el){
		super(el, fact);
		// this.fact = fact;
		this.oriX = 0;
		this.oriY = 0;
		this.offset = {
			left: $(this.el).css("left") ? $(this.el).css("left").match(/[-\d]+/g) * 1 || 0 : 0,
			top: $(this.el).css("top") ? $(this.el).css("top").match(/[-\d]+/g) * 1 || 0 : 0
		};
		
		this.obj = {
			idGroup: 0,
			isTransfer: false
		}
	}

	get item(){
		return this.el;
	}

	updateEl(){
		$(this.parent.el).removeClass(this.config.active);
		$(this.el).removeClass("active");
		if (this.obj.isTransfer){
			$(this.el).attr("style", "");
			var activeGroup = this.fact.groups[this.obj.idGroup].el;
			var items = $(activeGroup).find("." + this.config.item);
			var id = $(activeGroup).attr("sort-from") * 1;
			$(items).attr("style", "");
			$(activeGroup).removeClass(this.config.active);
			if (id < 0) return activeGroup.append(this.el);
			if (id === 0) return $(this.el).insertBefore(items[0]);
			if (id > 0) return $(this.el).insertAfter($(items[id - 1]));
		}
		else{
			$(this.el).attr("style", "");
		}
	}

	moveAt(x, y){
		$(this.el).css({ position: "relative", left: this.offset.left + x - this.oriX, top: this.offset.top + y - this.oriY});
		var groups = this.fact.groups;
		this.obj.isTransfer = false;
		for (var i = 0 ; i < groups.length; i++){
			$(groups[i].el).removeClass(this.config.active);
			if (groups[i].isHover){
				// console.log("here", groups[i])
				this.obj.isTransfer = true;
				this.obj.idGroup = i;
				$(groups[i].el).addClass(this.config.active);
				groups[i].sort()
			}
			else{
				$($(groups[i].el).find("." + this.config.item + ":not(." + "active" + ")" 	)).attr("style", "");
			}

		}
		// this.fact.groups.f
	}

	isMove(x, y){
		if ((x > this.left && x < this.right) && (y > this.top && y < this.bottom)){
			this.oriX = x;
			this.oriY = y;
			$(this.parent.el).addClass(this.config.active);
			return true;
		}
		return false;
	}

	get isHover(){
		// console.log(this, this.fact.item);
		// TH1: 
		var item = this.fact.item;
		var xCount = 0, yCount = 0;
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
			 	if (el.isMove(e.clientX, e.clientY)) {
			 		// console.log(el.parent, "parent here");
			 		self.el = el;
			 		$(self.el.item).addClass("active");
			 	};
			 })
	})

		$(window).mouseup(function(){
			self.el.updateEl();
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
