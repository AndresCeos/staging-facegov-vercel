import type { Metadata } from 'next';

import axios from '@/api/axios';
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

  // fetch data
  const product:Api.Response<Api.PoliticalFigure> = await axios.get(`/political-figures/${id}`);

  return {
    title: `${product?.results?.firstName} ${product?.results?.lastName} - FACESGOV`,
    openGraph: {
      images: [`http://localhost:3000/political-figures/${id}/share-image`],
    },
  };
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
