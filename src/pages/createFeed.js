const Feed = require('feed').Feed;
const markdown = require('markdown').markdown;
const fs = require('fs');
const config = require('../../content/data/config.json');
const path = require('path');
import matter from 'gray-matter';

import { getPages } from '../utils';

async function generateRssFeed() {
  console.log('Generating feed');
  /*if (process.env.NODE_ENV === 'development') {
    return;
  }*/

  const baseUrl = config.domain;
  const date = new Date();
  const author = {
    name: config.author,
    link: config.authorTwitter
  };

  const feed = new Feed({
    title: config.header.title,
    description: config.header.tagline,
    id: config.domain,
    link: config.domain,
    language: 'en',
    image: `${config.domain}/{config.header.logo_img}`,
    favicon: `${config.domain}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Kevin McDonnell`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    ttl: 60,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`
    },
    author
  });

  //const posts = getPages(this.props.posts, '/posts');

  const DIR = path.join(process.cwd(), "content", "pages", "posts");
  const files = fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".md"));

  const META = /export\s+const\s+meta\s+=\s+(\{(\n|.)*?\n\})/;
  const postsData = files.map((file) => {
    // grab the metadata
    const name = path.join(DIR, file);
    const contents = fs.readFileSync(name, "utf8");
    const matterResult = matter(contents);
  
    return {
      name,
      title: matterResult.data.title,
      description: matterResult.data.description,
      date: matterResult.data.date,
      content: matterResult.content,
    };
  });

  postsData.forEach((post) => {
    const url = `${baseUrl}/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: markdown.toHTML(post.content),
      author: 'Kevin McDonnell',
      contributor: 'Kevin McDonnell',
      date: new Date(post.date)
    });
  });

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
  console.log('generated feed');
    }

export default generateRssFeed;