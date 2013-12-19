BaseKamp.Views.NewDiscussionView = Backbone.View.extend({
  // We leverage generic popup view here.
  initialize: function(options) {
    this.parent = options.parent;
    this.generic_popup_view = new BaseKamp.Views.GenericPopupView({ id: "add_discussion", jst: "add_discussion" });
    this.$el = this.generic_popup_view.$el;

  },

  events: {
    // Bold, italic, underline, bullet list item clicks
    "mousedown li": "formatDiv",
    // Removes the view
    "click .cancel": "leave_via_parent",
    // Submits discussion for creation
    "click button": "submit_form",
    // Update the display of the bold/italic/underline buttons when text is selected in the
    // content-editable div.
    "click #msg": "format_controls",
    // Same as previous but also respond to keypresses.
    "keyup #msg": "format_controls"
  },

  format_controls: function(event) {
    // Need this since bold/italic/underline text can be nested.
    var select_1 = document.getSelection().anchorNode.parentNode.localName;
    var select_2 = document.getSelection().anchorNode.parentNode.parentNode.localName;
    var select_3 = document.getSelection().anchorNode.parentNode.parentNode.parentNode.localName;

    var $boldLi = $("li[data-view=bold]");
    var $italLi = $("li[data-view=italic]");
    var $undrLi = $("li[data-view=underline]");

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

  toggle_controls: function(formatting) {
    var tag = formatting.slice(0,1);
    var $li = $("li[data-view=" + formatting + "]");

    var selection = document.getSelection();
    var select_1 = document.getSelection().anchorNode.parentNode.localName;
    var select_2 = document.getSelection().anchorNode.parentNode.parentNode.localName;
    var select_3 = document.getSelection().anchorNode.parentNode.parentNode.parentNode.localName;

    console.log(selection);

    if ((select_1 == tag) || (select_2 == tag) || (select_3 == tag)) {
      if (selection.type == "Range") {
        $li.addClass('selected');
      } else {
        $li.removeClass('selected');
      }
    } else if ((select_1 == "div") || (select_2 == "div") || (select_3 == "div")) {
      if (selection.type == "Range") {
        $li.removeClass('selected');
      } else {
        if ($li.hasClass('selected')) {
          $li.removeClass('selected');
        } else {
          $li.addClass('selected');
        }
      }
    }
  },

  formatDiv: function(event) {
    var formatting = $(event.currentTarget).attr('data-view');

    document.execCommand(formatting, false, null);
    this.toggle_controls(formatting);

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