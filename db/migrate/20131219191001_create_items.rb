class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :todo_id
      t.integer :user_id
      t.text :body

      t.timestamps
    end
  end
end
