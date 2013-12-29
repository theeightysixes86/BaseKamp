BaseKamp.Views.ProjectDetailView = Backbone.View.extend({
  initialize: function(project){
    var that = this;

    that.$el = $("<section class='group' id='project'>");

    this.listenTo(that.model.discussions, "add", function() {
      that.remove_child_view();
      that.render.bind(that)();
    });
  },

  events: {
    "click .star": "flip_favorite",
    "dblclick h2": "edit_title",
    "keypress": "new_title",
    "click .existing-discussions": "add_child_view",
    "click aside": "add_child_view",
    "click h2": "remove_child_view",
    "click .message-btn": "add_child_view"
  },

  remove_child_view: function() {
    var that = this;

    // BUG BUG BUG BUG BUG
    // This needs to change the URL back to /projects/:id
    // preferrably without triggering the router or a page refresh?
    // if (this.childView) {
    //   this.childView.leave(function() {
    //     $("#project").removeAttr('style');
    //     $("#project h2").removeClass('link');
    //   });
    //   this.childView = null;
      Backbone.history.navigate("#/projects/" + this.model.get("id"));
    // }
  },

  add_child_view: function(e) {
    var $target = $(e.target);
    var that = this;

    // e may be either the JS event object, or a spoofed event object.
    // This seems like bad practice, I should remedy it.
    if (e.preventDefault) {
      e.preventDefault();
    }

    if (that.childView) { return; }

    // Anything with Backbone.history.navigate should just be made into links.
    if ($target.hasClass('add-members')) {
      Backbone.history.navigate("#/projects/21/members");
      that.childView = new BaseKamp.Views.AddMemberView;
    } else if ($target.hasClass('existing-discussions')) {
      Backbone.history.navigate("#/projects/21/discussions");
      that.childView = new BaseKamp.Views.DiscussionsIndexView;
    } else if ($target.hasClass('message-btn')) {
      Backbone.history.navigate("#/projects/21/discussion/new");
      that.childView = new BaseKamp.Views.NewDiscussionView({parent: this});
    } else if ($target.hasClass('discussion-detail')) {
      that.childView = new BaseKamp.Views.DiscussionDetailView({
        parent: this,
        model: this.model.discussions.get({ id: e.discussionId })
      });
    }

    // .render() for a childView should return an empty $("<div></div>") w/ css ID.
    $("#project").append(this.childView.render().$el);

    $("#" + this.childView.$el.attr("id")).animate({ width: '770px', height: that.childView.rendered_height + 'px'}, {
      complete: function() {
        // .append_content() for a childView should inject the rendered JST template.
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
      // this.model.set("title", value);
      this.model.save({title: value});
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

    var renderedContent = templateFn({ project: this.model, discussions: this.model.discussions, todos: this.model.todos, recents: this.model.recents });
    this.$el.append(renderedContent);

    return this;
  },

  leave: function(callback) {
    var that = this;
    that.remove_child_view();

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