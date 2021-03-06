BaseKamp.Routers.ProjectRouter = Backbone.Router.extend({
  initialize: function($el) {
    this.$el = $el;
  },

  routes: {
    "": "project_index",
    "projects/:id/discussions/:discussion_id": "discussion_detail",
    "projects/:id": "project_detail"
  },

  project_index: function() {
    this.swap(new BaseKamp.Views.ProjectIndexView);

    // Brings up a detail view immediately for testing purposes:
    // this.project_detail(21);
  },

  discussion_detail: function(id, discussion_id) {
    if (this.currentView) {
      // Spoof the JavaScript event object.
      // add_child_view sometimes responds to click events
      // but I want it to respond to backbone router URL changes as well.
      this.currentView.add_child_view({
        target: ".discussion-detail",
        preventDefault: function() { },
        discussionId: discussion_id
      });
    } else {
      window.location.href = "#/projects/" + id;
    }
  },

  project_detail: function(id) {
    if (this.currentView && this.currentView.childView) {
      this.currentView.childView.leave(function() {
        $("#project").removeAttr('style');
        $("#project h2").removeClass('link');
      });
      this.currentView.childView = null;
    } else {
      var that = this;
      var project = BaseKamp.projects.get({id: id });

      project.fetch_associated_info(function() {
        var projectDetailView = new BaseKamp.Views.ProjectDetailView({ model: project });
        that.swap(projectDetailView);
      });
    }
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