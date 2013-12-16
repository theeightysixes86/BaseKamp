class Discussion < ActiveRecord::Base
  attr_accessible :project_id, :title

  belongs_to :project

  def as_json(opts)
    super(opts).merge(username: User.find(user_id).name)
  end
end
