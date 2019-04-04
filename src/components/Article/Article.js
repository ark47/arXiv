import React from 'react';
import classes from './Article.module.css';

const article = (props) => {
    let auths = []
    for (let i = 0; i < props.authors.length; i++) {
        auths.push(props.authors[i].innerHTML);
    }
    auths = auths.map(auth => {
        return <li className={classes.author} key={auth}>{auth}</li>
    })

    let show = '-99';
    if (props.show) {
        show = '10';
    } else if (!props.show) {
        show = '-99';
    }

    return (        
        <div className={classes.Article} style={{zIndex: show}} >
            <div className={classes.art} >
            <div className={classes.close} onClick={props.close}></div>
                <h3>{props.title}</h3>
                <p>{props.summary}</p>
                <ul>
                    <li style={{fontWeight: '700', color: 'darkgray'}}>Authors</li>
                    {auths}
                </ul>
            </div>
        </div>
    )
}

export default article;