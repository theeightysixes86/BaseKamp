BaseKamp.Views.NewProjectView = Backbone.View.extend({
  initialize: function() {
    this.$el = $("<div class='darken'></div>");
  },

  events: {
    "click #close_pane": "leave",
    "focus .member": "member_focus",
    "blur .member": "member_blur",
    "click #new-member": "add_new_member",
    "click .remove-member": "remove_member"
  },

  render: function() {
    this.$el.empty();
    var templateFn = JST["new_project"];
    var renderedContent = templateFn({ projects: BaseKamp.projects });
    this.$el.append(renderedContent);

    return this;
  },

  remove_member: function() {
    $(event.target).parent().remove();
  },

  add_new_member: function() {
    $("#team-members").append(JST['project_user_view']());
  },

  member_blur: function() {
    $(".member").each(function(index, element){
      var $input = $(element);
      if ($input.val() == "") {

        $input.siblings('.member-icon').removeClass('green-icon warning-icon');
      } else {
        $.ajax({
          type: "POST",
          url: "/user_exists",
          data: { name: $input.val() },
          error: function() {
            $input.siblings('.member-icon').addClass('warning-icon');
          },
          success: function() {
            $input.siblings('.member-icon').removeClass('warning-icon');
          }
        });
      }
    })
  },

  member_focus: function() {
    $(document.activeElement).siblings('.member-icon').addClass('green-icon');
  },

  leave: function() {
    $("#project_pane").animate({ width: 0, height: 0, padding: 0 }, {
        complete: function() {
          $(this).remove();

          $(".darken").fadeOut(200, function() {
            $(".darken").remove();
          });
        },
        duration: 300
    });

    this.off();
  }
})