BaseKamp.Views.ProjectDetailView = Backbone.View.extend({
  initialize: function(project){
    var that = this;

    that.$el = $("<section class='group' id='project'>");
    that.model = project;
  },

  events: {
    "click .star": "flip_favorite",
    "dblclick h2": "edit_title",
    "keypress": "new_title",
    "click aside": "add_member_view",
    "click h2": "remove_member_view"
  },

  remove_member_view: function() {
    if (this.childView) {
      this.childView.leave(function() {
        $("#project").removeAttr('style');
        $("#project h2").removeClass('link');
      });
      this.childView = null;
    }
  },

  add_member_view: function(event) {
    var that = this;
    event.preventDefault();
    if (this.childView) { return; }

    this.childView = new BaseKamp.Views.AddMemberView;
    $("#project").append(this.childView.render().$el);
    $("#add_members").animate({ width: '770px', height: '400px'}, {
      complete: function() {
        that.childView.append_content();
        $("#project h2").addClass('link');
        $("#project").css({ background: 'rgb(249,249,249)', 'box-shadow': '0px 0px 0px', border: '1px solid rgb(230,230,230)'});
      },

      duration: 200
    })
  },

  new_title: function() {
    var $target = $(event.target);

    if ($target.is("#project-title") && event.charCode == 13) {
      var value = $target.val();
      this.model.set("title", value);
      $target.parent().prepend("<h2>" + value + "</h2>");
      $target.remove();
    }
  },

  edit_title: function() {
    var $target = $(event.target);
    $target.parent().prepend("<input id='project-title' value='" + this.model.get("title") + "'>");
    $("#project-title").focus();
    $target.remove();
  },

  flip_favorite: function(event) {
    var $target = $(event.currentTarget);
    var is_favorite = this.model.get("is_favorite");

    this.model.save({is_favorite: !is_favorite}, {
      success: function() {
        $target.toggleClass('empty');

        BaseKamp.projects.sort();
      }
    });
  },

  render: function() {
    this.$el.empty();
    var templateFn = JST["project_show"];

    var renderedContent = templateFn({ project: this.model });
    this.$el.append(renderedContent);

    return this;
  },

  leave: function(callback) {
    var that = this;

    if (that.childView) { that.childView.leave(); }
    var $project = $("#project");

    $project.css({ width: $project.width(), height: $project.height() });
    $project.empty();
    $project.animate({ width: 0, height: 0, padding: 0}, {
      complete: function() {
        if (typeof callback == "function") { callback(); }
        that.off();
        that.remove();
      },

      duration: 300
    });
  }
});