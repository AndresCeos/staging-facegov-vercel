'use client';

import { useEffect, useMemo, useState } from 'react';

import { usePoliticalFigures } from '@/api/political-figures';
import useTickers from '@/api/ticker';

import '../../../globals.css';
import NewsCard from './NewsCard';
import PoliticalFigureCard from './PoliticalFigureCard';

interface PoliticalFigureInfo {
  firstName: string;
  lastName: string;
  slug: string;
  rating: number;
}

function TickerHome() {
  const { data: tickers, isLoading: isLoadingTickers, isError: isErrorTickers } = useTickers();
  const { data: politicalFiguresData, isLoading: isLoadingPF, isError: isErrorPF } = usePoliticalFigures({ offset: 0, limit: 1000 });
  const politicalFigures = politicalFiguresData?.results;

  const [politicalFiguresInfo, setPoliticalFiguresInfo] = useState<PoliticalFigureInfo[]>([]);
  const [newsData, setNewsData] = useState<Api.News[]>([]);

  useEffect(() => {
    if (tickers && tickers.length > 0 && politicalFigures) {
      const allNews = tickers.flatMap((ticker) => ticker.news || []);
      const allPoliticalFigureIds = Array.from(new Set(tickers.flatMap((ticker) => ticker.politicalFiguresIds || [])));

      if (allPoliticalFigureIds.length > 0) {
        const matchedFigures = politicalFigures
          .filter((pf: Api.PoliticalFigure) => allPoliticalFigureIds.includes(pf.id))
          .map((pf: Api.PoliticalFigure) => ({
            firstName: pf.firstName,
            lastName: pf.lastName,
            slug: pf.slug,
            rating: pf.rating,
          }));

        setPoliticalFiguresInfo(matchedFigures);
      }

      if (allNews.length > 0) {
        setNewsData(allNews);
      }
    }
  }, [tickers, politicalFigures]);

  const combinedData = useMemo(() => {
    const figureItems = politicalFiguresInfo.map((figure) => ({
      type: 'figure' as const,
      data: figure,
      id: `pf-${figure.firstName}-${figure.lastName}`,
    }));
    const newsItems = newsData.map((news) => ({
      type: 'news' as const,
      data: news,
      id: `news-${news.title}`,
    }));
    return [...figureItems, ...newsItems];
  }, [politicalFiguresInfo, newsData]);

  const extendedData = [...combinedData];
  const isLoading = isLoadingTickers || isLoadingPF;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isErrorTickers || isErrorPF) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="ticker-container">
      <div
        className="ticker-track"
      >
        {extendedData.map((item, index) => {
          const key = `${item.id}-${index}`;
          if (item.type === 'figure') {
            return <PoliticalFigureCard key={key} figure={item.data} />;
          }
          return <NewsCard key={key} news={item.data} />;
        })}
      </div>
    </div>
  );
}

export default TickerHome;
