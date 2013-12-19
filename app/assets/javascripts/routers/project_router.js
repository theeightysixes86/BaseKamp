BaseKamp.Routers.ProjectRouter = Backbone.Router.extend({
  initialize: function($el) {
    this.$el = $el;
  },

  routes: {
    "": "project_index",
    "projects/:id": "project_detail"
  },

  project_index: function() {
    this.swap(new BaseKamp.Views.ProjectIndexView);

    // Brings up a detail view immediately for testing purposes:
    // this.project_detail(21);
  },

  project_detail: function(id) {
    var that = this;
    var project = BaseKamp.projects.get({id: id });

    project.fetch_associated_info(function() {
      var projectDetailView = new BaseKamp.Views.ProjectDetailView(project);
      that.swap(projectDetailView);
    });
  },

  // Swapping router to ensure we don't get zombie views.
  // Removes refernece to the old view when a new view is 'swapped' in
  // Each view's leave function is responsible for unbinding events.
  swap: function(newView) {
    var that = this;

    if (that.currentView && that.currentView.leave) {
      that.currentView.leave(function() {
        that.currentView = newView;
        that.$el.empty().append(newView.render().$el);
      });
    } else {
      that.currentView = newView;
      that.$el.empty().append(newView.render().$el);
    }
  },

  append: function(newView) {
    this.$el.append(newView.render().$el);
  }
})