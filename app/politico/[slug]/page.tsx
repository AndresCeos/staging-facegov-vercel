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

  const commentId = context?.searchParams?.comment;

  try {
    const politicalFigure = await axios.get(url(`/political-figures/${slug}`, 'api'));

    console.log('politicalFigure:', {
      title: `${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName} - FACESGOV`,
      openGraph: {
        images: [url(`/political-figures/${slug}/share-image`, 'api')],
      },
    });

    return {
      title: `${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName} - FACESGOV`,
      openGraph: {
        images: [url(`/political-figures/${slug}/share-image`, 'api')],
      },
    };
  } catch (error) {
    console.error('Error getting political figure:', error);
    return {
      title: 'FACESGOV',
      openGraph: {
        images: [
          commentId ? url(`/political-figures/${slug}/comments/${commentId}/share-image`, 'api') : url(`/political-figures/${slug}/share-image`, 'api'),
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
