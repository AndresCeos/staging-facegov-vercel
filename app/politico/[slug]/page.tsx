import axios from 'axios';
import type { Metadata } from 'next';

import PoliticalFigureContent from '@/features/politicalFigures/PoliticalFigureContent';
import url from '@/utils/url';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(context: any): Promise<Metadata> {
  const { slug } = context.params;

  const { comment } = context.searchParams;

  try {
    const politicalFigure = await axios.get(url(`/political-figures/${slug}`, 'api'));

    if (comment) {
      console.log('comment:', comment);
      console.log('image:', `https://media.aquiestaelmenu.com/${slug}/comment/${comment}/comment.jpeg`);
      return {
        title: `${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName} - FACEGOV`,
        openGraph: {
          images: [`https://media.aquiestaelmenu.com/${slug}/comment/${comment}/comment.jpeg`],
        },
      };
    }

    console.log('image:', `https://media.aquiestaelmenu.com/${slug}/share/desktop.jpeg`);
    return {
      title: `${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName} - FACEGOV`,
      openGraph: {
        images: [`https://media.aquiestaelmenu.com/${slug}/share/desktop.jpeg`],
      },
    };
  } catch (error) {
    console.error('Error getting political figure:', error);
    return {
      title: 'FACEGOV',
      openGraph: {
        images: [
          comment ? `https://media.aquiestaelmenu.com/${slug}/comment/${comment}/comment.jpeg` : `https://media.aquiestaelmenu.com/${slug}/share/desktop.jpeg`,
        ],
      },
    };
  }
}

function Page({ params }: Props) {
  const { slug } = params;

  return (
    <main>
      <PoliticalFigureContent slug={slug} />
    </main>
  );
}

export default Page;
