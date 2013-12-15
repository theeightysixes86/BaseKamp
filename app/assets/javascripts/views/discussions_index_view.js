BaseKamp.Views.DiscussionsIndexView = Backbone.View.extend({
  initialize: function() {
    this.generic_popup_view = new BaseKamp.Views.GenericPopupView({ id: "discussions", jst: "discussions_index" });
    this.$el = this.generic_popup_view.$el;

    // this.$el = $("<div id='discussions'></div>");
  },

  render: function() {
    this.generic_popup_view.render();

    this.rendered_height = this.generic_popup_view.rendered_height;
    return this;

    // this.$el.empty();
    //
    // var to_get_height = $("<div id='discussions' style='height: auto; width: 770px; position: absolute; top: 10000px;'></div>");
    // var templateFn = JST["discussions_index"];
    // var renderedContent = templateFn();
    //
    // to_get_height.append(renderedContent);
    // $("body").append(to_get_height);
    //
    // this.rendered_height = to_get_height.height();
    // to_get_height.remove();
    //
    // return this;
  },

  append_content: function() {
    this.generic_popup_view.append_content();
    // var templateFn = JST["discussions_index"];
    // var renderedContent = templateFn();
    //
    // $("#discussions").append(renderedContent);
  },

  leave: function(callback) {
    this.generic_popup_view.leave();
    // var $members = $("#discussions");
    // var that = this;
    //
    // $members.css({ width: $members.width(), height: $members.height() });
    // $members.empty();
    //
    // $("#discussions").animate({ width: 0, height: 0}, {
    //   complete: function() {
    //     that.remove();
    //     that.off();
    //     if (callback) { callback(); }
    //   },
    //
    //   duration: 200
    // });
  }
});