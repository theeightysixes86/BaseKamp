BaseKamp.Views.NewProjectView = Backbone.View.extend({
  initialize: function() {
    this.$el = $("<div class='darken'></div>");
  },

  events: {
    "click #close_pane": "leave",
    "focus .member": "member_focus",
    "blur .member": "member_blur",
    "click #new-member": "add_new_member",
    "click .remove-member": "remove_member",
    "click input[type=submit]": "create_new_member"
  },

  render: function() {
    this.$el.empty();
    var templateFn = JST["new_project"];
    var renderedContent = templateFn({ projects: BaseKamp.projects });
    this.$el.append(renderedContent);

    return this;
  },

  create_new_member: function() {
    var that = this;
    event.preventDefault();
    var $form = $("form");

    $.ajax({
      type: $form.attr("method"),
      url: $form.attr("action"),
      data: $form.serializeJSON(),
      success: function(data) {
        var project = new BaseKamp.Models.Project(data);

        that.leave(function() {
          BaseKamp.projects.add(project);
        });
      }
    })

  },

  remove_member: function() {
    $(event.target).parent().slideUp(300, function() {
      $(this).remove();
    });
  },

  add_new_member: function() {
    $("#team-members").append(JST['project_user_view']());
  },

  member_blur: function() {
    $blurred = $(event.srcElement);

    if ($blurred.val() == "") {
      $blurred.siblings('.member-icon').removeClass('green-icon warning-icon');
    } else {
      $.ajax({
        type: "POST",
        url: "/user_exists",
        data: { name: $blurred.val() },
        error: function() {
          $blurred.siblings('.member-icon').addClass('warning-icon');
        },
        success: function(data) {
          $blurred.siblings('input[type=hidden]').remove();
          $blurred.parent().append("<input type='hidden' value='" + data.id + "' name=project[user_ids][]>");
          $blurred.siblings('.member-icon').removeClass('warning-icon');
        }
      });
    }
  },

  member_focus: function() {
    $(document.activeElement).siblings('.member-icon').addClass('green-icon');
  },

  leave: function(callback) {
    $("#project_pane").animate({ width: 0, height: 0, padding: 0 }, {
        complete: function() {
          $(this).remove();

          $(".darken").fadeOut(200, function() {
            $(".darken").remove();
            // Why is a jQuery event sometimes being provided to this function?
            if (typeof callback == "function") { callback(); }
          })
        },
        duration: 300
    });

    this.off();
  }
})