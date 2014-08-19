class ProjectsController < ApplicationController
  def new
  	@project = Project.new
  end

  def index
  	@projects = Project.all
    respond_to do |format|
      format.html
      format.json { render json: @projects }
    end
  end

  def create
  	@project = Project.new(project_params)

  	if @project.save 
  		redirect_to projects_path
  	else
  		:new
  	end
  end

  def show
  	@project = Project.find(params[:id])
    @review = @project.reviews.build
  end

  def update
  end

  private

  def project_params
  	params.require(:project).permit(:name, :description, :link)
  end
end
