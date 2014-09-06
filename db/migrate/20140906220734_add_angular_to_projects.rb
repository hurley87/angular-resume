class AddAngularToProjects < ActiveRecord::Migration
  def change
  	add_column :projects, :angular, :boolean
  end
end
