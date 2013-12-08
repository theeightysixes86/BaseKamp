class AddFavoriteToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :is_favorite, :boolean, default: false
  end
end
