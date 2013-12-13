class TodosController < ApplicationController
  def index
    @project = Project.find(params[:id])
    render json: @project.todos
  end
end
