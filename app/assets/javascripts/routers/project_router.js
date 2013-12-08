BaseKamp.Routers.ProjectRouter = Backbone.Router.extend({
  initialize: function($el) {
    this.$el = $el;
  },

  swap: function(newView) {
    if (this.currentView && this.currentView.leave) {
      this.currentView.leave();
    }

    this.currentView = newView;
    this.$el.empty().append(newView.render().$el);
  },

  append: function(newView) {
    this.$el.append(newView.render().$el);
  }
})