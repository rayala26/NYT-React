import React, { Component } from "react";
import Results from "../Results/Results";
import Saved from "../Saved/Saved";
import Search from "../Search/Search";
import API from "../utils/api";

class Main extends Component {
    state =  {
        topic: "",
        startYear: "",
        endYear: "",
        articles: [],
        saved: []
    };

    //When the component mounts, get a list of all saved articles nad update the.state.saved
    componentDidMount() {
        this.getSavedArticles()
    }

    //Method for getting saved articles (all articles) from the db
    getSavedArticles = () => {
        API.getArticle()
        .then((res) => {
            this.setState({ saved: res.data });
        });
    }

    //calls in the result component to render each article recieved in the query
    renderArticles = () => {
        return this.state.articles.map(article =>(
            <Results
                _id={article._id}
                key={article._id}
                title={article.headline.main}
                date={article.pub_date}
                url={article.web_url}
                handleSaveButton={this.handleSaveButton}
                getSavedArticle={this.getSavedArticles}
            />
        ));
    }

    //Calls in the saved component to render each article that has been saved by the user
    renderSaved = () => {
        return this.state.saved.map(save => (
            <Saved
                _id={save._id}
                key={save._id}
                title={save.headline.main}
                date={save.pub_date}
                url={save.web_url}
                handleDeleteButton={this.handleSaveButton}
                getSavedArticle={this.getSavedArticles}
            />
        ));
    }

    //records user input into the topic field
    handleTopicChange = (event) => {
        this.setState({topic:event.target.value});
    }

    //records user input into the start year field
    handleStartYearChange = (event) => {
        this.setState({startYear:event.target.value});
    }

    //record user input into the end year field
    handleEndYearChange = (event) => {
        this.setState({endYear: event.target.value });
    }

    // When the search form submits, perfomr NYT api search with user input
    handleFormSubmit = (event) => {
        event.preventDefault();
        API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
        .then((res) => {
            //populates the articles array in the state object with the search results, from which we'll then render in the DOM 
            this.setState({articles: res.data.response.docs});
        });
    }

    //upon the save article button is lcicked, aadd article to the db
    handleSaveButton = (id) => {
        const findArticleByID = this.state.articles.find((el) => el._id === id);
        const newSave = {title:findArticleByID.headline.main, date:findArticleByID.pub_date, url: findArticleByID.web_url};
        API.saveArticle(newSave)
        .then(this.getSavedArticles());
    }

    //remove article from the db upon the delete button being pressed
    handleDeleteButton = (id) => {
        API.deleteArticle(id)
        .then(this.getSavedArticles());
    }

    render() {
        return(

            <div className="main-container">
                <div className="container">

                    <div className="jumbotron">
                        <h1 className="text-center"><strong>New York Times React.js Article Serach</strong></h1>
                        <h2 className="text-cneter">Search for and save articles you want</h2>
                    </div>

                    <Search
                    handleTopicChange={this.handleTopicChange}
                    handleStartYearChange={this.handleStartYearChange}
                    handleEndYearChange={this.handleEndYearChange}
                    handleFormSubmit={this.handleFormSubmit}
                    renderArticles={this.renderArticles}
                    />

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-primary">

                                    <div className="panel-heading">
                                        <h3 className="panel-heading">
                                            <strong>
                                            Saved Articles
                                            </strong>
                                        </h3>
                                    </div>

                                    <div className="panel-body">
                                        <ul className="list-group">
                                            {this.renderSaved()}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div> 
            </div>
            );
    }
}

export default Main;