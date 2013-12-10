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
  },

  project_detail: function(id) {
    this.swap(new BaseKamp.Views.ProjectDetailView(BaseKamp.projects.get({id: id })));
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