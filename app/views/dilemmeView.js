define(['views/choiceView'],function(choiceView) {

	var choice = Backbone.View.extend({
		tagName : "div",
		el : $('#dilemme'),
		
		initialize : function() {
			this.choix1View = new choiceView({model : this.model.get('choix1'),number : "1", nbvote: this.model.get('nbvote1'), parent : this});
			this.choix2View = new choiceView({model : this.model.get('choix2'), number : "2", nbvote: this.model.get('nbvote2'), parent : this});
			
			 this.listenTo(this.model, 'change', this.render);	
			 this.render();	
		},
			template : _.template("<div id='score1'><%= nbvote1 %> votes</div><div id='score2'><%= nbvote2 %> votes</div>")
		,
		render : function() {
			this.$el.empty();

			this.choix1View.render();
			this.choix2View.render();

			this.$el.append(this.choix1View.$el);
			this.$el.append(this.choix2View.$el);

			this.$el.append(this.template({nbvote1 : this.model.get('nbvote1'), nbvote2 : this.model.get('nbvote2')}));

			return this;
		},
		clean : function() {
			this.choix1View.remove();
			this.choix2View.remove();
		},
		vote : function(number) {
			var attr = 'nbvote'+number;
			this.model.set(attr, this.model.get(attr) +1);
			this.model.save();
			var self = this;
			setTimeout(function() {
					Backbone.trigger('change_dilemme', {});
					self.destroyView();
			}, 500	);
		
		},
		destroyView: function() {
			this.choix1View.remove();
			this.choix2View.remove();
			this.$el.empty();
		}
	


	});

	

  return choice;
}); 