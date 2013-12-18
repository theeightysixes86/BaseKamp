BaseKamp.Views.NewDiscussionView = Backbone.View.extend({
  initialize: function(options) {
    this.parent = options.parent;
    this.generic_popup_view = new BaseKamp.Views.GenericPopupView({ id: "add_discussion", jst: "add_discussion" });
    this.$el = this.generic_popup_view.$el;

  },

  events: {
    "mousedown li": "formatDiv",
    "click .cancel": "leave_via_parent"
  },

  leave_via_parent: function() {
    event.preventDefault();
    this.parent.remove_child_view();
  },

  formatDiv: function(event) {
    var formatting = $(event.currentTarget).attr('data-view');

    document.execCommand(formatting, false, null);
    return false;
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