import React, { Component } from 'react';
import classes from './Articles.module.css';
import Article from '../../components/Article/Article';

class Articles extends Component {
    state = {
        title: '',
        authors: [],
        summary: ''
    }

    
    render() {
        let arts = 'Loading Articles...';
        if (this.props.articles.length > 0) {
            arts = this.props.articles.map(art => (
                <div
                    className={classes.article}
                    key={art.getElementsByTagName('id')[0].innerHTML}
                    onClick={() => this.setState({
                        title: art.getElementsByTagName('title')[0].innerHTML + '.',
                        authors: art.getElementsByTagName('author'),
                        summary: art.getElementsByTagName('summary')[0].innerHTML
                    })}
                >
                    <h3>{art.getElementsByTagName('title')[0].innerHTML + '.'}</h3>
                </div>
            ))
        }
        return (
            <div className={classes.Articles}>
                {arts}
                <Article
                    title={this.state.title}
                    authors={this.state.authors}
                    summary={this.state.summary}
                />
            </div>
        )
    }

}

export default Articles;