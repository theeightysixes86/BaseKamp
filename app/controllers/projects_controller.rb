class ProjectsController < ApplicationController
  def update
    @project = Project.find_by_id(params[:id])
    @project.update_attributes(params[:project])

    render json: @project
  end
end
