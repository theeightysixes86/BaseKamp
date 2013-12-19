class DiscussionsController < ApplicationController
  def index
    @project = Project.find(params[:id])
    render json: @project.discussions
  end

  def create
    @discussion = current_user.discussions.new(params[:discussion])
    @discussion.save

    render json: @discussion
  end
end
