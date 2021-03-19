import { PostsList } from './posts-list';

// const list = await PostsList().element;

// document.querySelector('div#posts-list')!
//   .replaceWith(list);

const foo = async () => {
  const list = await new PostsList().element;
  document.querySelector('div#posts-list')!
      .replaceWith(list);
};

foo()
