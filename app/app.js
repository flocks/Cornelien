define(["router", "collections/dilemmes", 'views/loaderView'], function(router, DilemmeCollection, loader) {
  return {
    init: function() {
      Parse.initialize("Y3TSixAP6vUPmX5OlPCIKjbb4DkbpXZaeMzQmfx5", "Y2Du5zzTK3aDnsWQHqHZqjrQAKit6LirfyWUy75m");
      var compteur = 1;
      var appRouter = new router();
      Backbone.history.start();
      var collection = new DilemmeCollection(); 
      $('#loading').show();
      collection.fetch({success : function() {
      		 var idD = collection.models[0].id;
     		 appRouter.navigate('/dilemme/'+idD, {trigger : true});
      }}); 

      Backbone.on('change_dilemme', function(msg) {
      	if (collection.models.length == 0) {

      		collection.fetch({success : function() {
      			 var idD = collection.models[0].id;
     		 	appRouter.navigate('/dilemme/'+idD, {trigger : true});
      		}});
      	} 
      	if (_.isUndefined(collection.models[compteur])) {
      		compteur = 0;
      	}
      	var idDilemme = collection.models[compteur].id;
      	appRouter.navigate('/dilemme/'+idDilemme, {trigger: true}); 
      	compteur++;
      }, this);


    }
  };
});