import React from 'react';
import classes from './Articles.module.css';

const articles = (props) => {
    let arts = 'Loading Articles...';
    if (props.articles.length > 0) {
        arts = props.articles.map(art => (
            <div key={art.getElementsByTagName('id')[0].innerHTML}>
                <h3>{art.getElementsByTagName('title')[0].innerHTML}</h3>
            </div>
        ))
    }

    return (
        <div className={classes.Articles}>
            {arts}
        </div>
    )
}

export default articles;