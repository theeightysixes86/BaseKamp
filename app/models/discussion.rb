class Discussion < ActiveRecord::Base
  attr_accessible :project_id, :title, :body

  belongs_to :project
  belongs_to :user

  def as_json(opts)
    super(opts).merge(username: User.find(user_id).name)
  end
end
