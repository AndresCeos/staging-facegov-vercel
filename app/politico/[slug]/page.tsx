import type { Metadata } from 'next';

import { getPoliticalFigureBySlug } from '@/api/political-figures';
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
    const product:Api.Response<Api.PoliticalFigure> = await getPoliticalFigureBySlug(slug);

    return {
      title: `${product?.results?.firstName} ${product?.results?.lastName} - FACESGOV`,
      openGraph: {
        images: [`${process.env.API_URL}/political-figures/${slug}/share-image`],
      },
    };
  } catch (error) {
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
