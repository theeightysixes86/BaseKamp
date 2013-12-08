class SessionsController < ApplicationController
  layout "sessions"

  def new
  end

  def create
    @user = User.find_by_name(params[:user][:name])
    if @user.has_password?(params[:user][:password])
      session[:token] = @user.token
      redirect_to static_pages_url
    else
      redirect_to new_session_url
    end
  end
end