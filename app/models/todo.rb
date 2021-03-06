class Todo < ActiveRecord::Base
  attr_accessible :project_id, :title

  belongs_to :project

  has_many :items
end
