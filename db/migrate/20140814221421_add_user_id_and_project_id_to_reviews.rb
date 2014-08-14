class AddUserIdAndProjectIdToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :user_id, :integer
    add_column :reviews, :project_id, :integer
  end
end
