BaseKamp.Models.Project = Backbone.Model.extend({
  fetch_associated_info: function(callback) {
    var that = this;
    that.discussions = new BaseKamp.Collections.Discussions;
    that.todos = new BaseKamp.Collections.Todos;

    $.ajax({
      type: "GET",
      url: "/projects/" + that.get("id") + "/associations",
      success: function(data) {
        data.discussions.forEach(function(datum) {
          that.discussions.add(new BaseKamp.Models.Discussion(datum));
        });

        data.todos.forEach(function(datum) {
          that.todos.add(new BaseKamp.Models.Todo(datum));
        });

        callback();
      }
    });
  }
})