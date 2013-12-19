class Item < ActiveRecord::Base
  attr_accessible :body, :user_id, :todo_id

  belongs_to :todo
  belongs_to :user
end
