import React from 'react';
import _ from 'lodash';

import {toStyleObj, withPrefix} from '../utils';
import Branding from './Branding';
import Navigation from './Navigation';

export default class Header extends React.Component {
    render() {
        return (
            <header id="masthead" className="site-header">
              {_.get(this.props, 'image', null) ? (
              <div id="header-bg" className="site-header-bg" style={toStyleObj('background-image:url(\'' + withPrefix(_.get(this.props, 'image', null)) + '\')')}/>
              ) : (_.get(this.props, 'site.data.config.header.background_img', null) && (
              <div id="header-bg" className="site-header-bg" style={toStyleObj('background-image:url(\'' + withPrefix(_.get(this.props, 'site.data.config.header.background_img', null)) + '\')')}/>
              ))}
              <div className="site-header-scroll">
                <div className="site-header-inside">
                  <div className="site-header-vertical">
                    <Branding {...this.props} />
                    <Navigation {...this.props} />
                  </div>
                </div>
              </div>
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156922990-1"></script>
              <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'UA-156922990-1');
              </script>

            </header>
        );
    }
}
