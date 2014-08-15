class ReviewsController < ApplicationController
	before_filter :load_project

  def create
  	@review = @project.reviews.build(review_params)
  	@review.user = current_user
  	respond_to do |format|
      if @review.save
        format.html { redirect_to @project, notice: 'Review created successfully' }
        format.json { render json: @project.reviews }
      else
        format.html {render 'projects/show', notice: 'There was an error'}
        format.js {}
      end
    end
  end

  def show
  end

  private

  def review_params
  	params.require(:review).permit(:stars, :user_id, :project_id, :body)
  end

  def load_project
  	@project = Project.find(params[:project_id])
  end
end
