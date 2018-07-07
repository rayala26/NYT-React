import axios from "axios";

const api = {
	//Query NYT API
	searchNYT: function(topic, startYear, endYear) {
		const authKey = "f6bdf8f299a9429a8b6b87f648a17e6f";
		const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
		authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date" + endYear + "0101";
		return axios.get(queryURL);
	},
	// Retrieves saved articles from the db
	getArticle: function() {
		return axios.get("/api/saved");
	},
	// Saves a new article to the db
	saveArticle: function(articleObj) {
		return axios.post("/api/saved", articleObj);
	},
	//Deletes an article from the db
	deleteArticle: function(id) {
		return axios.delete(`/api/saved/${id}`);
	}
};

export default api;