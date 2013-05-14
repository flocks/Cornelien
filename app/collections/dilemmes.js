define(['../models/dilemme'], function(dilemme) {
	var dilemmes = Parse.Collection.extend({
		model : dilemme
	});

	return dilemmes;
});