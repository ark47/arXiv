import React, { Component } from 'react';
import classes from './Main.module.css';
import Articles from '../Articles/Articles';

class Main extends Component {
    state = {
        articles: []
    }

    componentDidMount() {

        /*______________________________________

            API Call & Search Query:
            1. Psychiatry, Therapy, and Data Science do not have a designated category in the API.
            Originally, I did an 'all:[category]' but that called articles that simply mentioned the category
            once. So, I changed it to 'ti:[category]' in the search-query so it only retrieved articles containing those parameters in the article title.

            2. Machine Learning was the only category with its own category designation(cs.LG).
            
            3. +OR+ was used to search for articles that included any of the above search parameters, opposed to an all-or-nothing approach with +AND+.

            4. The data is retrieved by submission data and in descending order from newest to oldest.
            There's also a maximum number of retreived articles; set to nine. I chose this for a less crowded UI and easier-to-navigate UX.

            5. Because the retrieved data is in XML, I converted it to a string then used DOMParser() to convert into an HTML Document. I created a new variable(entries) that selected all <entry> tags from the HTML document as an object.

            6. Because React wouldn't allow me to use .map() on an object(entries), I created a new empty array(fetched), and pushed each <entry> from entries into it. Then set the empty articles state equal to it.
        __________________________________________
        */

        fetch('http://export.arxiv.org/api/query?search_query=ti:psychiatry+OR+ti:therapy+OR+cat:cs.LG+OR+ti:data%20science&sortBy=submittedDate&sortOrder=descending&max_results=9')
        .then(res => res.text())
        .then((result) => {
            const fetchedArticles = [];
            let parser = new DOMParser();
            let doc = parser.parseFromString(result, "application/xml");
            let entries = doc.getElementsByTagName('entry');
            for (let i = 0; i < entries.length; i++) {
                fetchedArticles.push(entries[i]);
            }
            this.setState({ articles: fetchedArticles })
        },
        (error) => {
            console.log(error);
        })
    }

    render() {

        return (
            <div className={classes.Main}>
                <h1>arXiv.org</h1>
                {/* Passed articles state/property to the Articles component. */}
                <Articles articles={this.state.articles} />
            </div>
        )
    }
}

export default Main;