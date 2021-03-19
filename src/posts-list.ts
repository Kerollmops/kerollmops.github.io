import { endpoint } from '@octokit/endpoint';
import moment from 'moment';

export class PostsList {
  public readonly element: Promise<HTMLDivElement>;

  constructor() {
    const { url, ...options } = endpoint("GET /repos/:owner/:repo/issues", {
      owner: "Kerollmops",
      repo: "kerollmops.github.io",
      auth: 'd79a337d232e0b9cb86e615990126c71bfffc8c5'
    });

    this.element = fetch(url, options).then(result => {
      return result.json();
    }).then(result => {
      const posts = document.createElement('div');
      result.forEach(function (post: any) {
        const author = post.user.login;
        const title = post.title;
        const url = post.html_url;
        const created_at =  moment(post.created_at).fromNow();
        const element = document.createElement('div');
        element.className = "TimelineItem";
        element.innerHTML = `
        <div class="TimelineItem-badge">
          <!-- octicon("flame") -->
          <svg class="octicon octicon-flame" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"></path></svg>
        </div>

        <div class="TimelineItem-body">
          <a href="https://github.com/${author}" class="text-bold link-gray-dark mr-1">${author}</a> published
          <a href="${url}" class="text-bold link-gray-dark">${title}</a>
          ${created_at}
        </div>`
        posts.appendChild(element);
      });

      // Add a closing element
      if (result.length !== 0) {
        const element = document.createElement('div');
        element.className = "TimelineItem-break";
        posts.appendChild(element);
      }

      return posts;
    });
}
