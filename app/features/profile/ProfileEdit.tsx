import { useIsSignedIn } from '@/api/authentication';
import ProfileUpdateForm from './ProfileUpdateForm';

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
  return (
    <div className="max-w-80 p-10">
      <ProfileUpdateForm initialUserInformation={initialUserInformation} />
    </div>
  );
}

export default ProfileEdit;
