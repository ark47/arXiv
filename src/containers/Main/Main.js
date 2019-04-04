import React, { Component } from 'react';
import styles from './Main.module.css';
import Articles from '../../components/Articles/Articles';

class Main extends Component {
    state = {
        error: null,
        articles: null
    }

    componentDidMount() {
        fetch('http://export.arxiv.org/api/query?search_query=ti:psychiatry+OR+ti:therapy+OR+cat:cs.LG+OR+ti:data%20science&sortBy=submittedDate&sortOrder=descending&max_results=9')
        .then(res => res.text())
        .then((result) => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(result, "application/xml");
            this.setState({
                articles: doc.getElementsByTagName('entry')
            })
            // let test = this.state.articles.getElementsByTagName('entry')
            // console.log(test[0].getElementsByTagName('id'))
            // console.log(test[0].getElementsByTagName('title'))
            // console.log(test[0].getElementsByTagName('author'))
            // console.log(test[0].getElementsByTagName('summary'))
            // console.log(test);
        },
        (error) => {
            this.setState({
                error: true
            });
        })
    }

    render() {
        return (
            <div className={styles.Main}>
                <h1>arXiv.org</h1>
                <Articles articles={this.state.articles} />
            </div>
        )
    }
}

export default Main;