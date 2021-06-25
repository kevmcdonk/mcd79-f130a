import React from 'react';
import { sourcebitDataClient } from 'sourcebit-target-next';
import generateRssFeed from './createFeed'

/**
 * In next.js we can't use `src/pages/[...slug].js` for root site page `/`.
 * Instead, we import and export the [...slug].js while overriding its getStaticProps.
 */

import Page from './[...slug]';


export async function getStaticProps({ params }) {
    console.log('Page [index] getStaticProps, params: ', params);
    await generateRssFeed();
    const props = await sourcebitDataClient.getStaticPropsForPageAtPath('/');
    return { props };
}

export default Page;
