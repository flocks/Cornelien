define(function() {
	var view = Backbone.View.extend({
		initialize : function(options) {
			this.render();
		},
		template : _.template("<img src='app/images/loader.gif'  class='loading'/>"),
		render : function() {
			this.$el.append(this.template());
			return this;
		}
	});

	return view;
});

