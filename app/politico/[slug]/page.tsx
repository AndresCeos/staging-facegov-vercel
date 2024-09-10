import axios from 'axios';
import type { Metadata } from 'next';

import { Md5 } from 'ts-md5';

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
  const md5CommentId = commentId ? Md5.hashStr(commentId) : '';

  try {
    const politicalFigure = await axios.get(url(`/political-figures/${slug}`, 'api'));

    console.log('politicalFigure:', {
      title: `${politicalFigure?.data?.results?.firstName} ${politicalFigure?.data?.results?.lastName} - FACEGOV`,
      openGraph: {
        images: [`https://media.aquiestaelmenu.com/${slug}/share/desktop.jpeg`],
      },
    });

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
          commentId ? `https://media.aquiestaelmenu.com/${slug}/comment/${md5CommentId}/comment.jpeg` : `https://media.aquiestaelmenu.com/${slug}/share/desktop.jpeg`,
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
