import React from 'react';
import classes from './Article.module.css';

const article = (props) => {

    /*______________________________________

        Populating Article UI:

        1. Define an empty array(auths) that we'll insert all the elements from the 'authors' state/prop that was passed on the from Articles component via a for-loop. We do this for the same reason we encountered with the articles object we receive from the initial API call; .map() isn't able to iterate over it.

        2. Then .map() each element from the 'auths' array in an <li> and set auths' value equal to it.

        3. Define variable 'show' and set its initial value to '-99'. This variable will be used to set the value of the Article component's CSS z-index's value.

        4. Pass on all props recieved from the Articles component into the HTML tags inside the return().
            
    __________________________________________
    */

    let auths = [];
    for (let i = 0; i < props.authors.length; i++) {
        auths.push(props.authors[i].innerHTML);
    }
    auths = auths.map(auth => {
        return <li className={classes.author} key={auth}>{auth}</li>;
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
                    <li className={classes.auth}>Authors</li>
                    {auths}
                </ul>
            </div>
        </div>
    )
}

export default article;