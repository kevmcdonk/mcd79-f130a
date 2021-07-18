import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {Image} from 'next';

import {Layout} from '../components/index';
import Header from '../components/Header';
import {getPages, Link, withPrefix} from '../utils';

import ReactPaginate from 'react-paginate';
import Footer from '../components/Footer';

export default class Home extends React.Component {
    render() {
      let query = this.props.router.query;
      const postsPerPage = 10;
      let pageNumber = query.page || 1; //if page empty we request the first page
      
        let allPosts = getPages(this.props.pages, '/2021');
        allPosts = _.orderBy(allPosts, 'frontmatter.date', 'desc');
        let skip = (pageNumber-1) * pageNumber;
        let posts = allPosts.slice(skip, skip+postsPerPage);
         
        let posts_count = _.size(posts);

        const limit = 10;
        const calculateRange = (length) => Array.from({ length }, (v, k) => k + 1);
        const rangeLimit = Math.ceil(posts_count / limit);
        const range = calculateRange(rangeLimit);
        

        
        
        const totalCount = _.size(allPosts);
        const pageCount = _.size(posts);
        const currentPage = pageNumber;
        const perPage = postsPerPage;
    
        const paginationHandler = (page) => {
          const currentPath = this.props.router.pathname;
          const currentQuery = this.props.router.query;
          currentQuery.page = page.selected + 1;
  
          pageNumber = currentQuery.page || 1; //if page empty we request the first page

          skip = (pageNumber-1) * pageNumber;
          posts = allPosts.slice(skip, skip+postsPerPage);
          this.props.router.push({
              pathname: currentPath,
              query: currentQuery,
          });

          window.scrollTo({
            top: 0,
            left: 0, behavior: 'smooth'
            }); 
  
      };

        return (
            <Layout {...this.props}>
              <Header {...this.props} site={this.props} page={this.props.page} image={_.get(this.props, 'data.config.header.background_img', null)} />
              <div id="content" className="site-content">
                <main id="main" className="site-main inner">
                  <div className="post-feed">
                    {(posts_count > 0) && ((() => {
                        let posts_sorted = _.orderBy(posts, 'frontmatter.date', 'desc');
                        return (
                          _.map(posts_sorted, (post, post_idx) => (
                          <article key={post_idx} className="post">
                            <header className="post-header">
                              <h2 className="post-title"><Link href={withPrefix(_.get(post, '__metadata.urlPath', null))} rel="bookmark">{_.get(post, 'frontmatter.title', null)}</Link></h2>
                              <div className="post-meta">
                                Published on <time className="published"
                                  dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                              </div>
                            </header>
                            {_.get(post, 'frontmatter.thumb_img_path', null) && (
                            <Link className="post-thumbnail" href={withPrefix(_.get(post, '__metadata.urlPath', null))}>
                              <Image className="thumbnail" src={withPrefix(_.get(post, 'frontmatter.thumb_img_path', null))} alt={_.get(post, 'frontmatter.thumb_img_alt', null)} />
                            </Link>
                            )}
                            <div className="post-content">
                              <p>{_.get(post, 'frontmatter.excerpt', null)}</p>
                            </div>
                            {((_.get(this.props, 'page.frontmatter.has_more_link', null) === true) && _.get(this.props, 'page.frontmatter.more_link_text', null)) && (
                            <p className="read-more">
                              <Link className="read-more-link" href={withPrefix(_.get(post, '__metadata.urlPath', null))}>{_.get(this.props, 'page.frontmatter.more_link_text', null)} <span className="icon-arrow-right" aria-hidden="true" /></Link>
                            </p>
                            )}
                          </article>
                          ))
                        );
                    })())}
                  </div>
                  <div className="pagination">
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        activeClassName={'active'}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
        
                        initialPage={this.props.currentPage - 1}
                        pageCount={this.props.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={paginationHandler}
                    />
                  </div>
                  </main>
                <Footer {...this.props} site={this.props} page={this.props.page} image={_.get(this.props, 'data.config.header.background_img', null)} />
              </div>
            </Layout>
        );
    }
}
