class UsersController < ApplicationController

  def user_exists
    @user = User.find_by_name(params[:name])
    if @user
      render json: @user
    else
      render json: nil, status: :unprocessable_entity
    end
  end
end
