function NewsCard({ news }: { news: Api.News }) {
  return (
    <div className="ticker-card">
      <div className="ticker-symbol">
        <a href={news.url} target="_blank" rel="noopener noreferrer">
          {news.title}
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
