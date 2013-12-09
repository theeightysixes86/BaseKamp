BaseKamp.Views.ProjectIndexView = Backbone.View.extend({
  initialize: function(){
    var that = this;

    that.$el = $("<div class='group'>");
    that.listenTo(BaseKamp.projects, 'add', function() {
      BaseKamp.projects_router.swap(new BaseKamp.Views.ProjectIndexView)
    });
  },

  events: {
    "click .star": "flip_favorite",
    "click #new_project_box": "new_project"
  },

  new_project: function() {
    var newProjectView = new BaseKamp.Views.NewProjectView();
    BaseKamp.projects_router.append(newProjectView);
  },

  flip_favorite: function(event) {
    var $target = $(event.currentTarget);
    var project_id = event.currentTarget.id
    var project = BaseKamp.projects.findWhere({id: parseInt(project_id)});
    var is_favorite = project.get("is_favorite");

    project.save({is_favorite: !is_favorite}, {
      success: function() {
        $target.toggleClass('empty');

        BaseKamp.projects.sort();
        BaseKamp.projects_router.swap(new BaseKamp.Views.ProjectIndexView);
      }
    });
  },

  render: function() {
    this.$el.empty();
    var templateFn = JST["projects_index"];
    var renderedContent = templateFn({ projects: BaseKamp.projects });
    this.$el.append(renderedContent);

    return this;
  },

  leave: function() {
    this.off();
    this.remove();
  }
})