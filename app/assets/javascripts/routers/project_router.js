BaseKamp.Routers.ProjectRouter = Backbone.Router.extend({
  initialize: function($el) {
    this.$el = $el;
  },

  routes: {
    "": "project_index",
    "projects/:id": "project_detail"
  },

  project_index: function() {
    // this.swap(new BaseKamp.Views.ProjectIndexView);

    // Testing

    this.project_detail(21);
  },

  project_detail: function(id) {
    var that = this;
    var project = BaseKamp.projects.get({id: id });
    // project.fetch_associated_info(function() {
    //   var projectDetailView = new BaseKamp.Views.ProjectDetailView(project);
    //   that.swap(projectDetailView);
    //
    // });
    var projectDetailView = new BaseKamp.Views.ProjectDetailView(BaseKamp.projects.get({id: id }));
    projectDetailView.fetch_project_info(this.swap.bind(this, projectDetailView))
    // this.swap(projectDetailView);
  },

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