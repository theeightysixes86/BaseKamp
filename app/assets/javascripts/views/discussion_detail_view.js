BaseKamp.Views.DiscussionDetailView = Backbone.View.extend({
  // Abstracted several views into a 'generic popup view', which we leverage here.
  initialize: function() {
    this.generic_popup_view = new BaseKamp.Views.GenericPopupView({ id: "discussion_detail", jst: "discussion_detail" });
    this.$el = this.generic_popup_view.$el;
  },

  render: function() {
    this.generic_popup_view.render();
    this.rendered_height = this.generic_popup_view.rendered_height;

    return this;
  },

  append_content: function() {
    this.generic_popup_view.append_content();
  },

  leave: function(callback) {
    this.generic_popup_view.leave(callback);
  }
})