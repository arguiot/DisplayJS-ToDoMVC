// Defining DisplayJS
const $ = new DisplayJS(window);

let count = $.s(".todos").length;
const App = {
	complete() {
		$.all($.s(".toggle"), el => {
			$.on(el, "click", function() {
				$.toggleClass($.parent($.toNodeList(this),1), "completed");
			});
		})
	},
	destroy() {
		$.all($.s(".destroy"), el => {
			$.on(el, "click", function() {
				$.single(".todo-list").removeChild($.parent($.toNodeList(this),1)[0])
				count = $.s(".todos").length;
			});
		})
	},
	clear() {
		$.on($.s(".clear-completed"), "click", () => {
			$.all($.s(".completed"), el => {
				$.remove(el);
			})
			count = $.s(".todos").length;
		})
	},
	edit() {
		$.all($.s(".view > label"), el => {
			$.on(el, "dblclick", function() {
				$.hide($.parent($.s(this)))
				$.show([$.parent($.s(this),1)[0].children[1]])
				$.parent($.s(this),1)[0].children[1].value = $.parent($.s(this))[0].children[1].innerHTML
				$.on([$.parent($.s(this),1)[0].children[1]], "keypress", function(e) {
					if (e.which == 13 || event.keyCode == 13) {
				        $.text($.toNodeList(this.parentNode.children[0].children[1]), this.value)
				        $.hide($.toNodeList(this))
						$.show($.toNodeList(this.parentNode.children[0]))
				    }
				});
			})
		})
	},
	toggle_all() {
		$.on($.s(".toggle-all"), "click", function() {
			if (this.checked == true) {
				$.all($.s(".toggle"), el => {
					el[0].checked = true
					$.addClass($.toNodeList(el[0].parentNode.parentNode), "completed");
				})
			} else {
				$.all($.s(".toggle"), el => {
					el[0].checked = false
					$.removeClass($.toNodeList(el[0].parentNode.parentNode), "completed");
				})
			}
		})
	},
	init() {
		if ($.single(".todo-list").hasChildNodes()) {
			$.show($.s(".main"))
			$.show($.s(".footer"))
		} else {
			$.hide($.s(".main"))
			$.hide($.s(".footer"))
		}
		const routes = {
			"/active": App.active,
			"/completed": App.completed,
			"/": App.all
		};
		const router = Router(routes);
		router.init();
	},
	new() {
		$.on($.s(".new-todo"), "keypress", e => {
			if (e.which == 13 || event.keyCode == 13) {
		        $.append($.s(".todo-list"), `<li class="todos"><div class="view"><input class="toggle" type="checkbox"><label>${$.single(".new-todo").value}</label><button class="destroy"></button></div><input class="edit" value="Rule the web"></li>`)
		        $.valEmpty($.s(".new-todo"))
		        init()
		    }
		});
	},
	all() {
		$.all($.s(".todos"), el => {
			$.show(el)
		})
		$.all($.s(".filter"), el => {
			$.removeClass(el, "selected");
		})
		$.addClass($.toNodeList($.s(".filter")[0]), "selected")
	},
	completed() {
		$.all($.s(".todos"), el => {
			if (!$.hasClass(el, "completed")) {
				$.hide(el)
			} else {
				$.show(el)
			}
		})
		$.all($.s(".filter"), el => {
			$.removeClass(el, "selected");
		})
		$.addClass($.toNodeList($.s(".filter")[2]), "selected")
	},
	active() {
		$.all($.s(".todos"), el => {
			if ($.hasClass(el, "completed")) {
				$.hide(el)
			} else {
				$.show(el)
			}
		})
		$.all($.s(".filter"), el => {
			$.removeClass(el, "selected");
		})
		$.addClass($.toNodeList($.s(".filter")[1]), "selected")
	}
	
};
function init () {
	// recount the number of items.
	count = $.s(".todos").length;
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
