class ProjectsController < ApplicationController
  def update
    @project = Project.find_by_id(params[:id])
    @project.update_attributes(params[:project])

    render json: @project
  end

  def create
    @project = current_user.projects.new(params[:project])
    if current_user.save
      render json: @project
    else
      render json: nil, status: :unprocessable_entity
    end
  end

  def associated_info
    @project = Project.includes(:discussions, :todos).find_by_id(params[:id])
    @discussions = @project.discussions.order("created_at ASC")
    @todos = @project.todos.order("created_at ASC")

    @recents = (@discussions + @todos).sort_by { |obj| obj.created_at }.reverse.take(3)

    render json: { discussions: @discussions, todos: @todos, recents: @recents }
  end
end