class AddShortToProjects < ActiveRecord::Migration
  def change
  	add_column :projects, :short, :string
  end
end
