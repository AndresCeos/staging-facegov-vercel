type RatingEventProps = {
  politicalFigureId: number;
  name: string;
  rating: number;
};

export default ({ politicalFigureId, name, rating }: RatingEventProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'rate_political_figure', {
      event_category: 'Rating-Comment',
      event_label: name,
      value: rating,
      politician_id: politicalFigureId,
    });
  }
};
