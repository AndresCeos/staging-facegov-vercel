import axios from 'axios';
import type { Metadata } from 'next';

import PoliticalFigureContent from '@/features/politicalFigures/PoliticalFigureContent';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(context: any): Promise<Metadata> {
  const { slug } = context.params;

  const commentId = context?.searchParams?.comment;

  try {
    const politicalFigure = await axios.get(`${process.env.API_URL}/political-figures/${slug}`);

    console.log('politicalFigure:', {
      title: `${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName} - FACESGOV`,
      openGraph: {
        images: [`${process.env.API_URL}/political-figures/${slug}/share-image`],
      },
    });

    return {
      title: `${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName} - FACESGOV`,
      openGraph: {
        images: [`${process.env.API_URL}/political-figures/${slug}/share-image`],
      },
    };
  } catch (error) {
    console.error('Error getting political figure:', error);
    return {
      title: 'FACESGOV',
      openGraph: {
        images: [
          commentId ? `${process.env.API_URL}/political-figures/${slug}/comments/${commentId}/share-image` : `${process.env.API_URL}/political-figures/${slug}/share-image`,
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
