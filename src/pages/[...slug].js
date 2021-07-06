import React from 'react';
import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import {redirectToLowercase} from '../utils';
import pageLayouts from '../layouts';

import { useEffect } from 'react'
import { useRouter, withRouter } from 'next/router'
import Error from 'next/error'


class Page extends React.Component {
    render() {
        // every page can have different layout, pick the layout based
        // on the model of the page (_type in Sanity CMS)
        console.log('Slug hit - render');
        //const router = useRouter();
        //redirectIfSpacesInUrl(router.asPath, router);
        const componentName = _.get(this.props, 'page.__metadata.modelName');
        //console.log(this.props);
        const PageLayout = pageLayouts[componentName];
        
        

        


        //return <Error statusCode={404} />
        console.log('Returning page layout');
        return <PageLayout {...this.props}/>;
    }
}

export async function getStaticPaths() {
    console.log('Page [...slug].js getStaticPaths');
    // filter out the root page as it has its own page file `src/pages/index.js`
    const paths = await sourcebitDataClient.getStaticPaths();
    return { paths: _.reject(paths, path => path === '/'), fallback: true };
}

export async function getStaticProps({ params }) {
    console.log('Page [...slug].js getStaticProps, params: ', params);
    let pagePath = '/' + params.slug.join('/');
    console.log(pagePath);
    if (pagePath != pagePath.toLowerCase()) {
        pagePath = pagePath.toLowerCase();
        return {
            redirect: {
              destination: '/About',
              permanent: true,
            },
          }
    }
    const props = await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);

    return { props };
}

export function ResolveRoute() {
    console.log('Started resolve route');
    const router = useRouter();
    
          useEffect(() => {
            //return <Error statusCode={403} />
            //console.log('Checking the route');
            //console.log(router.pathname);
            if (router.pathname === router.asPath.toLowerCase()) {
              // Route is already lowercase but matched catch all
              // page not found, display 404
              return <Error statusCode={404} />
            } else {
                router.push(router.pathname.toLowerCase())
                //return <Error statusCode={402} />
            }
          },[router]);
  
          return <p>Redirecting...</p>;
    //return <Error statusCode={401} />
  }

export default withRemoteDataUpdates(Page);

