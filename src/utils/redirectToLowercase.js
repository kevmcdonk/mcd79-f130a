import _ from 'lodash';
import getPage from './getPage';

export default function redirectIfSpacesInUrl(path, router) {
    if (typeof window == 'undefined') return // to ensure it does not break SSR
    if (path.includes('%20')) {
      var split = path.split('/')
      var hyphenatedName = split[split.length - 1].replace(/%20/g, '-').toLowerCase()
      router.replace('/path-name/[slug]', `/path-name/${hyphenatedName}`)
    }
}
