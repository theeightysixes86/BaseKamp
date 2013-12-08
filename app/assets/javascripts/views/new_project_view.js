BaseKamp.Views.NewProjectView = Backbone.View.extend({
  initialize: function() {
    this.$el = $("<div class='darken'></div>");
  },

  events: {

  },

  render: function() {
    this.$el.empty();
    var templateFn = JST["new_project"];
    var renderedContent = templateFn({ projects: BaseKamp.projects });
    this.$el.append(renderedContent);

    return this;
  },

  leave: function() {
    this.off();
    this.remove();
  }
})