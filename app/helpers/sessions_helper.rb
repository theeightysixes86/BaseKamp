module SessionsHelper
  def current_user
    return nil if session[:token].nil?
    @current_user ||= User.find_by_token(session[:token])
  end
end