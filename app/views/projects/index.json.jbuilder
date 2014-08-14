json.projects @projects do |project|
	json.name project.name
	json.description project.description
	json.link project.link

	json.reviews project.reviews do |review|
		json.user review.user
		json.stars review.stars
		json.body review.body
	end
end