BaseKamp.Collections.Projects = Backbone.Collection.extend({
  model: BaseKamp.Models.Project,
  url: "/projects",

  // Order by starred projects.
  comparator: function(model) {
    return !model.get("is_favorite");
  }
})