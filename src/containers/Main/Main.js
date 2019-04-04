import React, { Component } from 'react';
import classes from './Main.module.css';
import Articles from '../Articles/Articles';

class Main extends Component {
    state = {
        error: null,
        articles: []
    }

    componentDidMount() {
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
            // console.log(test[0].getElementsByTagName('author'))
            // console.log(test[0].getElementsByTagName('summary'))

        },
        (error) => {
            this.setState({
                error: true
            });
        })
    }

    render() {

        return (
            <div className={classes.Main}>
                <h1>arXiv.org</h1>
                <Articles articles={this.state.articles} />
            </div>
        )
    }
}

export default Main;