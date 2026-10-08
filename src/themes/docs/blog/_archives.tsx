import { React } from '../../../../deps.ts';

import type { PagicLayout } from '../../../Pagic.ts';
import type { PagePropsBlog } from '../../../plugins/blog.tsx';
import { dateFormatter } from '../_utils.tsx';

type Pagination = NonNullable<PagePropsBlog['pagination']>;

const Pager = ({ config, pagination }: { config: any; pagination: Pagination }) => {
  const { currentPage, totalPages, root } = pagination;
  const pageLink = (pageNum: number) =>
    pageNum === 1 ? `${config.root}${root.slice(1)}` : `${config.root}${root.slice(1)}page/${pageNum}/`;

  const items: (number | 'ellipsis')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) items.push(i);
  } else {
    items.push(1);
    if (currentPage > 3) items.push('ellipsis');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      items.push(i);
    }
    if (currentPage < totalPages - 2) items.push('ellipsis');
    items.push(totalPages);
  }

  return (
    <nav className="main_pager" style={{ marginTop: '2rem', textAlign: 'center' }}>
      {currentPage > 1 && (
        <a href={pageLink(currentPage - 1)} style={{ margin: '0 0.5rem' }}>
          Previous
        </a>
      )}
      {items.map((item, idx) =>
        item === 'ellipsis' ? (
          <span key={`e${idx}`} style={{ margin: '0 0.25rem' }}>
            …
          </span>
        ) : item === currentPage ? (
          <span key={item} style={{ margin: '0 0.25rem', fontWeight: 'bold' }}>
            {item}
          </span>
        ) : (
          <a key={item} href={pageLink(item)} style={{ margin: '0 0.25rem' }}>
            {item}
          </a>
        ),
      )}
      {currentPage < totalPages && (
        <a href={pageLink(currentPage + 1)} style={{ margin: '0 0.5rem' }}>
          Next
        </a>
      )}
    </nav>
  );
};

const Archives: PagicLayout = (props) => {
  const { config, contentTitle, title, blog } = props;

  return (
    <section className="main">
      <div className="main_article">
        <article>
          {contentTitle ?? (title && <h1>{title}</h1>)}
          <ul className="main_archives">
            {blog?.posts.map(({ title, link, date }) => (
              <li key={link}>
                <time dateTime={date.toString()}>{dateFormatter['yyyy-MM-dd'](date)}</time>
                <div>
                  <a href={`${config.root}${link}`}>{title}</a>
                </div>
              </li>
            ))}
          </ul>
          {blog?.pagination && blog.pagination.totalPages > 1 && (
            <Pager config={config} pagination={blog.pagination} />
          )}
        </article>
      </div>
    </section>
  );
};

export default Archives;
