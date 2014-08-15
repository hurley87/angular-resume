json.project do
	json.name @project.name
	json.description @project.description
	json.link @project.link

	json.review @project.reviews do |review|
		json.stars review.stars
		json.body review.body
	end
end