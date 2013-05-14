define(['models/choice'], function(ChoiceModel) {

	var dilemme = Parse.Object.extend({
		initialize : function() {
			
		},

		className : "Dilemme"
	});

	return dilemme;
})