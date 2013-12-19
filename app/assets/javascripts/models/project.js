BaseKamp.Models.Project = Backbone.Model.extend({

  // Grabs the project's associated discussions and todos,
  // then attaches them as attributes to them model.
  fetch_associated_info: function(callback) {
    var that = this;
    that.discussions = new BaseKamp.Collections.Discussions;
    that.todos = new BaseKamp.Collections.Todos;

    // JSON response of the form:
    // { discussions: [json, json, ...], todos: [json, json, ...], recents: [json, json, ...] }
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

        that.recents = data.recents;
        callback();
      }
    });
  }
})