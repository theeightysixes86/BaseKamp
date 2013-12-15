BaseKamp.Views.GenericPopupView = Backbone.View.extend({
  initialize: function(obj) {
    this.attrs = obj;
    this.$el = $("<div id='" + obj.id + "'></div>");
  },

  render: function() {
    this.$el.empty();

    var to_get_height = $("<div id='" + this.attrs.id + "' style='height: auto; width: 770px; position: absolute; top: 10000px;'></div>");
    var templateFn = JST[this.attrs.jst];
    var renderedContent = templateFn();


    to_get_height.append(renderedContent);
    $("body").append(to_get_height);

    this.rendered_height = to_get_height.height();
    to_get_height.remove();

    return this;
  },

  append_content: function() {
    var templateFn = JST[this.attrs.jst];
    var renderedContent = templateFn();

    $("#" + this.attrs.id).append(renderedContent);
  },

  leave: function(callback) {
    var $members = $("#" + this.attrs.id);
    var that = this;

    $members.css({ width: $members.width(), height: $members.height() });
    $members.empty();

    $("#" + this.attrs.id).animate({ width: 0, height: 0}, {
      complete: function() {
        that.remove();
        that.off();
        if (callback) { callback(); }
      },

      duration: 200
    });
  }
});