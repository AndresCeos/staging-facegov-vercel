export const GA_TRACKING_ID = 'G-EKBGM9074E';

type RatingEventProps = {
  politicalFigureId: number;
  name: string;
  rating: number;
};
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const sendRatingEvent = ({ politicalFigureId, name, rating }: RatingEventProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'rate_political_figure', {
      event_category: 'Rating-Comment',
      event_label: name,
      value: rating,
      politician_id: politicalFigureId,
    });
  }
};
