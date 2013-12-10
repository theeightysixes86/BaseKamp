BaseKamp.Views.AddMemberView = Backbone.View.extend({
  initialize: function() {
    this.$el = $("<div id='add_members'></div>");
  },

  render: function() {
    this.$el.empty();

    return this;
  },

  append_content: function() {
    var templateFn = JST["add_members"];
    var renderedContent = templateFn();
    $("#add_members").append(renderedContent);
  },

  leave: function(callback) {
    var $members = $("#add_members");
    var that = this;

    $members.css({ width: $members.width(), height: $members.height() });
    $members.empty();

    $("#add_members").animate({ width: 0, height: 0}, {
      complete: function() {
        that.remove();
        that.off();
        if (callback) { callback(); }
      },

      duration: 200
    });
  }
})