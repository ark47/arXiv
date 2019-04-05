import React, { Component } from 'react';
import classes from './Articles.module.css';
import Article from '../../components/Article/Article';

class Articles extends Component {

    state = {
        title: '',
        authors: [],
        summary: '',
        showArticle: false
    }

    articleCloser = () => {
        this.setState({
            showArticle: false
        })
    }
    
    render() {

        /*______________________________________

            Populating UI w/ Articles:

            1. Established variable 'arts' with an initial value of 'Loading Articles...' giving the user some feedback in the case where articles haven't been loaded yet.

            2. We check to see if the articles array/prop that was passed on from the Main.js component is empty. If it's not, .map() its elements into a new array and update variable 'arts' equal to its return value(s).

            3. Each mapped element has an onClick function that sets the Articles' title, authors, and summary state equal to the elements respective values. The 'title' and 'summary' values are extracted as strings with the .innerHTML method. Because they aren't a potential set of elements, like 'authors,' there's no need to store/set them as an object or an array for future iteration.

            4. The Articles' state is passed on to the Article component below along with the articleCloser() method and showArticle state/prop.
            
        __________________________________________
        */

        let arts = 'Loading Articles...';

        if (this.props.articles.length > 0) {
            arts = this.props.articles.map(art => (
                <div
                    className={classes.article}
                    key={art.getElementsByTagName('id')[0].innerHTML}
                    onClick={() => this.setState({
                        /* Test to verify state is being set/updated. */
                        title: art.getElementsByTagName('title')[0].innerHTML + '.',
                        authors: art.getElementsByTagName('name'),
                        summary: art.getElementsByTagName('summary')[0].innerHTML,
                        showArticle: true
                    })}
                >
                    <h3>{art.getElementsByTagName('title')[0].innerHTML + '.'}</h3>
                </div>
            ))
        }

        return (
            <div className={classes.Articles}>
                {arts}
                {/* Test to make sure Article component has loaded even though it's not initially visible to the user. */}
                <Article
                    title={this.state.title}
                    authors={this.state.authors}
                    summary={this.state.summary}
                    show={this.state.showArticle}
                    close={this.articleCloser}
                    clicker={this.props.authorClick}
                />
            </div>
        )
    }

}

export default Articles;