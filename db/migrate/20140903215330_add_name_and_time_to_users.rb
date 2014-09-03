class AddNameAndTimeToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :name, :string
  	add_column :users, :time, :string
  end
end
