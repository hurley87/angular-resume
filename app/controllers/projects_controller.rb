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

  def edit
    @project = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:id])

    if @project.update(project_params)
      redirect_to projects_path
    else
      :edit
    end
  end

  private

  def project_params
  	params.require(:project).permit(:name, :short, :description, :link, :finished, :angular, :start_date, :end_date)
  end
end
