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

    // Testing so I don't have to click a bunch of shit.
    // var testing_view = new BaseKamp.Views.ProjectDetailView(BaseKamp.projects.get({id: 21 }))
    // this.swap(testing_view);

    this.project_detail(20);

    // testing_view.add_member_view({ preventDefault: function() { }});
  },

  project_detail: function(id) {
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