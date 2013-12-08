BaseKamp.Collections.Projects = Backbone.Collection.extend({
  model: BaseKamp.Models.Project,
  url: "/projects",
  comparator: function(model) {
    return !model.get("is_favorite");
  }
})