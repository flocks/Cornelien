define(function() {
	var view = Backbone.View.extend({
		initialize : function(options) {
			this.number = options.number;
			this.nbvote = options.nbvote;
			this.parent = options.parent;
		},
		template:_.template("<div class='choix' id='<%= idcss2 %>'><img id='<%= idcss %>' class='choixPic' src='<%= img %>' /> <h2 class='choixSentence'><span><%= text %></span></h2></div>"),
		render : function() {
			var obj = this.model.toJSON();
			obj['idcss'] = "img"+this.number;
			obj['idcss2'] = "choix"+this.number;

			this.$el.html(this.template(obj));

			return this;
		},
		events : {
			click : "vote"
		},
		vote : function() {
			this.parent.vote(this.number);
		}
	});

	return view;
});

