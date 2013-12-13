class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.integer :project_id
      t.integer :user_id
      t.string :title

      t.timestamps
    end
  end
end
