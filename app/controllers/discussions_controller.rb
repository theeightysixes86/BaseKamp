class DiscussionsController < ApplicationController
  def index
    @project = Project.find(params[:id])
    render json: @project.discussions
  end
end
