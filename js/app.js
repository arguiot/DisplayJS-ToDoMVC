// Defining DisplayJS
var $ = new DisplayJS(window);

var count = $.select(".todos").length;
var App = {
	complete: function() {
		$.all($.select(".toggle"), function(el) {
			$.on(el, "click", function() {
				$.toggleClass($.parent($.s(this),1), "completed");
			});
		})
	},
	destroy: function() {
		$.all($.select(".destroy"), function(el) {
			$.on(el, "click", function() {
				$.single(".todo-list").removeChild($.parent($.s(this),1)[0])
				count = $.select(".todos").length;
			});
		})
	},
	clear: function() {
		$.on($.select(".clear-completed"), "click", function () {
			$.all($.select(".completed"), function(el) {
				$.remove(el);
			})
			count = $.select(".todos").length;
		})
	},
	edit: function() {
		$.all($.select(".view > label"), function(el) {
			$.on(el, "dblclick", function() {
				$.hide($.parent($.s(this)))
				$.show([$.parent($.s(this),1)[0].children[1]])
				$.parent($.s(this),1)[0].children[1].value = $.parent($.s(this))[0].children[1].innerHTML
				$.on([$.parent($.s(this),1)[0].children[1]], "keypress", function(e) {
					if (e.which == 13 || event.keyCode == 13) {
				        $.text([this.parentNode.children[0].children[1]], this.value)
				        $.hide([this])
						$.show([this.parentNode.children[0]])
				    }
				});
			})
		})
	},
	toggle_all: function() {
		$.on($.select(".toggle-all"), "click", function() {
			if (this.checked == true) {
				$.all($.select(".toggle"), function(el) {
					el[0].checked = true
					$.addClass([el[0].parentNode.parentNode], "completed");
				})
			} else {
				$.all($.select(".toggle"), function(el) {
					el[0].checked = false
					$.removeClass([el[0].parentNode.parentNode], "completed");
				})
			}
		})
	},
	init: function() {
		if ($.single(".todo-list").hasChildNodes()) {
			$.show($.select(".main"))
			$.show($.select(".footer"))
		} else {
			$.hide($.select(".main"))
			$.hide($.select(".footer"))
		}
		var routes = {
			"/active": App.active,
			"/completed": App.completed,
			"/": App.all
		}
		var router = Router(routes);
		router.init();
	},
	new: function() {
		$.on($.select(".new-todo"), "keypress", function(e) {
			if (e.which == 13 || event.keyCode == 13) {
		        $.append($.select(".todo-list"), '<li class="todos"><div class="view"><input class="toggle" type="checkbox"><label>' + $.single(".new-todo").value +'</label><button class="destroy"></button></div><input class="edit" value="Rule the web"></li>')
		        $.valEmpty($.select(".new-todo"))
		        init()
		    }
		});
	},
	all: function() {
		$.all($.select(".todos"), function(el) {
			$.show(el)
		})
		$.all($.s(".filter"), function(el) {
			$.removeClass(el, "selected");
		})
		$.addClass([$.s(".filter")[0]], "selected")
	},
	completed: function() {
		$.all($.select(".todos"), function(el) {
			if (!$.hasClass(el, "completed")) {
				$.hide(el)
			} else {
				$.show(el)
			}
		})
		$.all($.s(".filter"), function(el) {
			$.removeClass(el, "selected");
		})
		$.addClass([$.s(".filter")[2]], "selected")
	},
	active: function() {
		$.all($.select(".todos"), function(el) {
			if ($.hasClass(el, "completed")) {
				$.hide(el)
			} else {
				$.show(el)
			}
		})
		$.all($.s(".filter"), function(el) {
			$.removeClass(el, "selected");
		})
		$.addClass([$.s(".filter")[1]], "selected")
	}
	
};
function init () {
	// recount the number of items.
	count = $.select(".todos").length;
	// invoke all the functions.
	App.complete();
	App.destroy();
	App.clear();
	App.edit();
	App.toggle_all();
	App.new();
	App.init();
}
// Rendering everything every 250 ms.
$.var(250);

init();