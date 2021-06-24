import _ from 'lodash';

/**
 * Get the page at the provided `urlPath`.
 *
 * @param {Array} pages Array of page objects. All pages must have '__metadata.urlPath' field.
 * @param {string} urlPath The url path to find the page by
 * @return {Object}
 */
 export default function getPrevPage(pages, currentPage) {
    
    const matchedCurrentPages = _.filter(pages, page => {
        return _.isEqual(page.__metadata.urlPath, currentPage.__metadata.urlPath);
    });
    const currentPageIndex = _.indexOf(pages,matchedCurrentPages[0],0);
    


    // return null if last page
    if (currentPageIndex === 0) {
        return null;
    }
    // Otherwise return next page
    return pages[currentPageIndex -1];
}
