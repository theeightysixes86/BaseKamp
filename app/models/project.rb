class Project < ActiveRecord::Base
  attr_accessible :title, :description, :is_favorite, :user_ids

  has_many :user_projects
  has_many :users, through: :user_projects, source: :user
end