import { useIsSignedIn } from '@/api/authentication';
import ProfileUpdateForm from './ProfileUpdateForm';
import ProfileUpdateMedia from './ProfileUpdateMedia';

function ProfileEdit() {
  const isSignedIn = useIsSignedIn();
  if (!isSignedIn) {
    return null;
  }

  if (!isSignedIn.data?.data?.authenticated || isSignedIn.isLoading) {
    return null;
  }

  const initialUserInformation = {
    firstName: isSignedIn.data?.data?.user?.firstName ?? '',
    lastName: isSignedIn.data?.data?.user?.lastName ?? '',
  };

  const initialUserMediaInformation = {
    urlImage: isSignedIn.data?.data?.user?.urlImage ?? '',
  };
  return (
    <div>
      <h1 className="text-2xl font-bold my-10 text-center">Mi perfil</h1>
      <div className="w-full md:p-10 md:flex mb-10">
        <div className="md:p-5 md:w-1/2">
          <ProfileUpdateForm initialUserInformation={initialUserInformation} />
        </div>
        <div className="md:p-5 md:w-1/2">
          <ProfileUpdateMedia initialUserInformation={initialUserMediaInformation} />
        </div>
      </div>
    </div>

  );
}

export default ProfileEdit;
