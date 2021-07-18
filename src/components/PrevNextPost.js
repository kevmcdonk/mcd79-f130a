import React, { FunctionComponent, Fragment, useState, useEffect } from 'react';
import _ from 'lodash';
import {Image} from 'next';
import {htmlToReact, Link, withPrefix, getNextPage, getPrevPage, getPages} from '../utils';
import moment from 'moment-strftime';

export default class PrevNextPost extends React.Component {
    render() {
//_.keys(page)
    
    const posts = getPages(this.props.pages, '/posts');
    const nextPage = getNextPage(posts, this.props.page);
    const prevPage = getPrevPage(posts, this.props.page);

    return (
        <Fragment>
        <div>
            {nextPage!= null && (
            <article key="articleID" className="post">
                <header className="post-header">
                    <h2>Next post</h2>
                    <h3 className="post-title"><Link href={withPrefix(_.get(nextPage, '__metadata.urlPath', null))} rel="bookmark">{_.get(nextPage, 'frontmatter.title', null)}</Link></h3>
                    <div className="post-meta">
                    Published on <time className="published"
                        dateTime={moment(_.get(nextPage, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(nextPage, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                    </div>
                </header>
                <Link className="post-thumbnail" href={withPrefix(_.get(nextPage, '__metadata.urlPath', null))}>
                <Image className="thumbnail" src={withPrefix(_.get(nextPage, 'frontmatter.thumb_img_path', null))} alt={_.get(nextPage, 'frontmatter.thumb_img_alt', null)} />
                </Link>
                
                <div className="post-content">
                <p>{_.get(nextPage, 'frontmatter.excerpt', null)}</p>
                </div>
                <p className="read-more">
                <Link className="read-more-link" href={withPrefix(_.get(nextPage, '__metadata.urlPath', null))}>Link<span className="icon-arrow-right" aria-hidden="true" /></Link>
                </p>   
            </article>
            )}

            {prevPage != null && (
            <article key="articleID" className="post">
                <header className="post-header">
                    <h2>Previous post</h2>
                    <h3 className="post-title"><Link href={withPrefix(_.get(prevPage, '__metadata.urlPath', null))} rel="bookmark">{_.get(prevPage, 'frontmatter.title', null)}</Link></h3>
                    <div className="post-meta">
                    Published on <time className="published"
                        dateTime={moment(_.get(prevPage, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(prevPage, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                    </div>
                </header>
                <Link className="post-thumbnail" href={withPrefix(_.get(prevPage, '__metadata.urlPath', null))}>
                <Image className="thumbnail" src={withPrefix(_.get(prevPage, 'frontmatter.thumb_img_path', null))} alt={_.get(prevPage, 'frontmatter.thumb_img_alt', null)} />
                </Link>
                
                <div className="post-content">
                <p>{_.get(prevPage, 'frontmatter.excerpt', null)}</p>
                </div>
                <p className="read-more">
                <Link className="read-more-link" href={withPrefix(_.get(prevPage, '__metadata.urlPath', null))}>Link<span className="icon-arrow-right" aria-hidden="true" /></Link>
                </p>
                
            </article>
            )}
        </div>
        </Fragment>
    );
};
}
