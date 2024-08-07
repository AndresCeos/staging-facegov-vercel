/* eslint-disable max-len */

'use client';

import cx from 'classnames';
import { useState } from 'react';

import { useIsSignedIn } from '@/api/authentication';
import { useUserComments } from '@/api/users';
import ProfileCommentsList from '@/features/profile/ProfileCommentsList';
import ProfileEdit from '@/features/profile/ProfileEdit';
import profileAcronym from '@/utils/profileAcronym';

function ProfilePage() {
  const isSignedIn = useIsSignedIn();
  const [view, setView] = useState<'comments' | 'utilities' | 'profile'>('comments');
  const comments = useUserComments({ offset: 0, limit: 10 });

  if (!isSignedIn.data?.data?.authenticated || isSignedIn.isLoading) {
    return null;
  }

  return (
    <main>
      <div>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center mb-5 mx-auto md:border-r-2 md:border-gray-50 w-full max-w-[13rem] md:min-h-64">
            <img
              src={`https://placehold.co/80?text=${profileAcronym(isSignedIn.data?.data?.user.firstName, isSignedIn.data?.data?.user.lastName)}`}
              alt="profile"
              className="w-10 md:w-20 h-10 md:h-20 rounded-full"
            />
            <p className="text-gray-900 font-bold md:mt-5">
              {`${isSignedIn.data?.data?.user?.firstName} ${isSignedIn.data?.data?.user?.lastName}`}
            </p>
            <span className="text-sm text-gray-500 my-8">
              {comments.data?.results?.length === 0 ? 'Sin comentarios' : `${comments.data?.results?.length} comentarios`}
            </span>
            <ul>
              <li>
                <button
                  type="button"
                  onClick={() => setView('comments')}
                  className={cx(
                    'p-2 hover:bg-black hover:bg-opacity-10 block w-full text-left',
                    view === 'comments' && 'font-bold',
                  )}
                >
                  Mis comentarios
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setView('profile')}
                  className={cx(
                    'p-2 hover:bg-black hover:bg-opacity-10 block w-full text-left',
                    view === 'profile' && 'font-bold',
                  )}
                >
                  Editar perfil
                </button>
              </li>
            </ul>
          </div>
          <div className="flex flex-col pl-10 w-full">
            {view === 'comments' && <ProfileCommentsList />}
            {view === 'profile' && <ProfileEdit />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
