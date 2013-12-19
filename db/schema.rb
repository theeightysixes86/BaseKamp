# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131219191001) do

  create_table "comments", :force => true do |t|
    t.integer  "discussion_id"
    t.integer  "user_id"
    t.text     "body"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "discussions", :force => true do |t|
    t.integer  "project_id"
    t.integer  "user_id"
    t.string   "title"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.text     "body"
  end

  create_table "items", :force => true do |t|
    t.integer  "todo_id"
    t.integer  "user_id"
    t.text     "body"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "projects", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.boolean  "is_favorite", :default => false
  end

  create_table "todos", :force => true do |t|
    t.integer  "project_id"
    t.integer  "user_id"
    t.string   "title"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "user_projects", :force => true do |t|
    t.integer  "user_id"
    t.integer  "project_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "user_projects", ["project_id"], :name => "index_user_projects_on_project_id"
  add_index "user_projects", ["user_id"], :name => "index_user_projects_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "token"
    t.string   "password_digest"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
