define(['models/dilemme', 'models/choice', 'views/dilemmeView', 'collections/dilemmes', 'views/loaderView'],function(DilemmeModel, ChoiceModel, DilemmeView,DilemmeCollection, loader) {
	var router = Backbone.Router.extend({
		routes : {
			"" : "home",
			"home" : "home",
			"choices" : "listChoices",
			"dilemme/:idDilemme" : "dilemme"
		},
		initialize : function() {
			this.dilemmeView = {};
			//var load = new loader({el : 'body'});

		},

		home : function() {
			console.log("HOME");


			
		},
		listChoices : function() {
			console.log("liste des choices");
		},
		dilemme : function(idDilemme) {
			var dilemme = new DilemmeModel({id : idDilemme});
			var query = new Parse.Query("Dilemme");
			query.include("choix1");
			query.include("choix2");

			$('#loading').show();
			query.get(idDilemme).then(function(objDilemme) {
				dilemme = objDilemme;
				this.dilemmeView = new DilemmeView({model : dilemme});
							$('#loading').hide();


			},
			function(error) {
				console.log(error);
			});
		}
	});

	return router;
});