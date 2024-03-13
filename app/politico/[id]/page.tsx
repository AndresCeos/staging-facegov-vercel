import type { Metadata } from 'next';

import { getPoliticalFigureById } from '@/api/political-figures';
import PoliticalFigureContent from '@/features/politicalFigures/PoliticalFigureContent';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const { id } = params;

  try {
    const politicalFigureId = Number(id);
    const product:Api.Response<Api.PoliticalFigure> = await getPoliticalFigureById(politicalFigureId);

    return {
      title: `${product?.results?.firstName} ${product?.results?.lastName} - FACESGOV`,
      openGraph: {
        images: [`${process.env.API_URL}/political-figures/${id}/share-image`],
      },
    };
  } catch (error) {
    return {
      title: 'FACESGOV',
      openGraph: {
        images: [`${process.env.API_URL}/political-figures/${id}/share-image`],
      },
    };
  }
}

function Page({ params }: Props) {
  const { id } = params;

  return (
    <main>
      <PoliticalFigureContent id={id} />
    </main>
  );
}

export default Page;
