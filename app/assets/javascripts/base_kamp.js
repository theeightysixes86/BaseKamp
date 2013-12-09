window.BaseKamp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var projects_json = JSON.parse($("#projects").html())
    BaseKamp.projects = new BaseKamp.Collections.Projects(projects_json);

    BaseKamp.projects_router = new BaseKamp.Routers.ProjectRouter($("#main"));
    Backbone.history.start();

    var projects_index_view = new BaseKamp.Views.ProjectIndexView();
    BaseKamp.projects_router.swap(projects_index_view);
  }
};

$(document).ready(function(){
  BaseKamp.initialize();
});
