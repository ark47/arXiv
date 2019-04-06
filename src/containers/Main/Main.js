import React, { Component } from 'react';
import classes from './Main.module.css';
import Articles from '../Articles/Articles';

class Main extends Component {
    state = {
        articles: [],
        header: 'arXiv.org'
    }

    /*______________________________________

        API Call & Search Query:
        1. Psychiatry, Therapy, and Data Science do not have a designated category in the API.
        Originally, I did an 'all:[category]' but that called articles that simply mentioned the category
        once. So, I changed it to 'ti:[category]' in the search-query so it only retrieved articles containing those parameters in the article title.

        2. Machine Learning was the only category with its own category designation(cs.LG).
        
        3. +OR+ was used to search for articles that included any of the above search parameters, opposed to an all-or-nothing approach with +AND+.

        4. The data is retrieved by submission date and in descending order from newest to oldest.
        There's also a maximum number of retreived articles; set to nine. I chose this for a less crowded UI and easier-to-navigate UX.

        5. Because the retrieved data is in XML, I converted it to a string then used DOMParser() to convert into an HTML Document. I created a new variable(entries) that selected all <entry> tags from the HTML document as an object.

        6. Because React wouldn't allow me to use .map() on an object(entries), I created a new empty array(fetched), and pushed each <entry> from entries into it. Then set the empty articles state equal to it.
    __________________________________________
    */

    componentDidMount() {
        fetch('https://export.arxiv.org/api/query?search_query=ti:psychiatry+OR+ti:therapy+OR+cat:cs.LG+OR+ti:data%20science&sortBy=submittedDate&sortOrder=descending&max_results=9')
        .then(res => res.text())
        .then((result) => {
            const fetchedArticles = [];
            let parser = new DOMParser();
            let doc = parser.parseFromString(result, "application/xml");
            let entries = doc.getElementsByTagName('entry');
            for (let i = 0; i < entries.length; i++) {
                fetchedArticles.push(entries[i]);
            }
            /* Add test here to verify state is being set/updated. */
            this.setState({ articles: fetchedArticles })
        },
        (error) => {
            console.log(error);
        })
    }

    authorClickHandler = author => {
        author = author.replace(/\s/g, '+');
        fetch(`http://export.arxiv.org/api/query?search_query=au:${author}&max_results=100`)
        .then(res => res.text())
        .then((result) => {
            const fetchedAuthorArticles = [];
            let parser = new DOMParser();
            let doc = parser.parseFromString(result, "application/xml");
            let entries = doc.getElementsByTagName('entry');
            author = author.replace(/[++]/g, ' ');

            /*______________________________________
                Check to see if an article is older than thirty days:

                1. Establish today's date with the new Date() object.

                2. Parse today's date into milliseconds and subtract 2592000000(30 days in milliseconds) from it.

                3. When iterating through the <entry> object, parse the <publish> date to milliseconds and see if it's greater than the dayInMilliseconds variable. If true, it's not 30 days old and can be pushed into the fetchedAuthorArticles array.

                4. Set authorArticles to the fetchedAuthorArticles array.
            __________________________________________ 
            */

            const date = new Date();
            const dayInMilliseconds = Date.parse(date) - 2592000000;
            let artPubDate;
            
            for (let i = 0; i < entries.length; i++) {;
                artPubDate = Date.parse(entries[i].getElementsByTagName('published')[0].textContent);
                if (artPubDate > dayInMilliseconds) {          
                    fetchedAuthorArticles.push(entries[i]);
                }
            }

            this.setState({
                articles: fetchedAuthorArticles,
                header: author
            });
        },
            (error) => {
                console.log(error);
            })
    }  

    render() {

        return (
            <div className={classes.Main}>
                <h1>{this.state.header}</h1>
                {/* Passed articles state/property and authorClickHandler to the Articles component. */}
                <Articles articles={this.state.articles} authorClick={this.authorClickHandler} />
            </div>
        )
    }
}

export default Main;