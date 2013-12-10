BaseKamp.Views.AddMemberView = Backbone.View.extend({
  initialize: function() {
    this.$el = $("<div id='add_members'></div>");
  },

  render: function() {
    this.$el.empty();
    var templateFn = JST["add_members"];
    var renderedContent = templateFn();
    this.$el.append(renderedContent);

    return this;
  },

  leave: function(callback) {
    var that = this;

    $("#add_members").animate({ width: 0, height: 0}, {
      complete: function() {
        that.remove();
        that.off();
        callback();
      }
    });
  }
})