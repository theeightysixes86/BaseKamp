class User < ActiveRecord::Base
  attr_accessible :name, :password
  after_initialize :ensure_token

  has_many :user_projects
  has_many :projects, through: :user_projects, source: :project

  def password=(pw_string)
    self.password_digest = BCrypt::Password.create(pw_string)
  end

  def reset_session_token!
    self.update_attributes(session_token: SecureRandom.urlsafe_base64)
  end

  def has_password?(pass)
    BCrypt::Password.new(self.password_digest).is_password?(pass)
  end

  private

    def ensure_token
      self.token ||= SecureRandom.urlsafe_base64
    end
end
