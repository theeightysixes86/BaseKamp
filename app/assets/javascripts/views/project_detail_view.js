BaseKamp.Views.ProjectDetailView = Backbone.View.extend({
  initialize: function(project){
    var that = this;

    that.$el = $("<section class='group' id='project'>");
    that.model = project;
  },

  render: function() {
    this.$el.empty();
    var templateFn = JST["project_show"];

    var renderedContent = templateFn({ project: this.model });
    this.$el.append(renderedContent);

    return this;
  },

  leave: function() {
    this.off();
    this.remove();
  }
});