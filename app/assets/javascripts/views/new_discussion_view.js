BaseKamp.Views.NewDiscussionView = Backbone.View.extend({
  initialize: function(options) {
    this.parent = options.parent;
    this.generic_popup_view = new BaseKamp.Views.GenericPopupView({ id: "add_discussion", jst: "add_discussion" });
    this.$el = this.generic_popup_view.$el;

  },

  events: {
    "mousedown li": "formatDiv",
    "click .cancel": "leave_via_parent",
    "click button": "submit_form",
    "click #msg": "format_controls",
    "keyup #msg": "format_controls"
  },

  format_controls: function(event) {
    var select_1 = document.getSelection().anchorNode.parentNode.localName;
    var select_2 = document.getSelection().anchorNode.parentNode.parentNode.localName;
    var select_3 = document.getSelection().anchorNode.parentNode.parentNode.parentNode.localName;

    var $boldLi = $("li[data-view=bold]");
    var $italLi = $("li[data-view=italic]");
    var $undrLi = $("li[data-view=underline]");

    // This and the similar function used in formatDiv need to be abstracted.

    if ((select_1 == "b") || (select_2 == "b") || (select_3 == "b")) {
      $boldLi.addClass('selected');
    } else if ((select_1 == "div") || (select_2 == "div") || (select_3 == "div")) {
      $boldLi.removeClass('selected');
    }

    if ((select_1 == "i") || (select_2 == "i") || (select_3 == "i")) {
      $italLi.addClass('selected');
    } else if ((select_1 == "div") || (select_2 == "div") || (select_3 == "div")) {
      $italLi.removeClass('selected');
    }

    if ((select_1 == "u") || (select_2 == "u") || (select_3 == "u")) {
      $undrLi.addClass('selected');
    } else if ((select_1 == "div") || (select_2 == "div") || (select_3 == "div")) {
      $undrLi.removeClass('selected');
    }

    // console.log(document.getSelection().anchorNode.parentElement.localName);
  },

  submit_form: function(event) {
    event.preventDefault();
    var that = this;

    var project = this.parent.model;

    var title = $("input[name=title]").val();
    var body = $("#msg").html();
    var data = { discussion: { title: title, body: body } }

    var discussion = new BaseKamp.Models.Discussion({ title: title, body: body, project_id: project.get("id") });

    discussion.save({}, {
      success: function() {
        project.discussions.add(discussion);
        // that.leave_via_parent();
      }
    });
  },

  leave_via_parent: function() {
    event.preventDefault();
    this.parent.remove_child_view();
  },

  formatDiv: function(event) {
    var formatting = $(event.currentTarget).attr('data-view');

    console.log(document.getSelection().anchorNode.parentElement.localName);

    document.execCommand(formatting, false, null);

    // Terribly wet, also a little buggy.
    var select_1 = document.getSelection().anchorNode.parentNode.localName;
    var select_2 = document.getSelection().anchorNode.parentNode.parentNode.localName;
    var select_3 = document.getSelection().anchorNode.parentNode.parentNode.parentNode.localName;

    var $boldLi = $("li[data-view=bold]");
    var $italLi = $("li[data-view=italic]");
    var $undrLi = $("li[data-view=underline]");

    if (formatting == "bold") {
      if ((select_1 == "b") || (select_2 == "b") || (select_3 == "b")) {
        $boldLi.removeClass('selected');
      } else if ((select_1 == "div") || (select_2 == "div") || (select_3 == "div")) {
        $boldLi.addClass('selected');
      }
    }

    if (formatting == "italic") {
      if ((select_1 == "i") || (select_2 == "i") || (select_3 == "i")) {
        $italLi.removeClass('selected');
      } else if ((select_1 == "div") || (select_2 == "div") || (select_3 == "div")) {
        $italLi.addClass('selected');
      }
    }

    if (formatting == "underline") {
      if ((select_1 == "u") || (select_2 == "u") || (select_3 == "u")) {
        $undrLi.removeClass('selected');
      } else if ((select_1 == "div") || (select_2 == "div") || (select_3 == "div")) {
        $undrLi.addClass('selected');
      }
    }

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