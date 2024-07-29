/* eslint-disable max-len */
import ProfileUpdateForm from '../ProfileUpdateForm';

type ProfileSetupModalProps = {
  initialUserInformation: {
    firstName: string;
    lastName: string;
  };
  className: string;
};

function ProfileSetupModal({ initialUserInformation, className = '' }: ProfileSetupModalProps) {
  return (
    <div className={className}>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* body */}
            <div className="relative p-6 flex-auto w-full max-w-[34rem] px-16">
              <h1 className="w-full text-3xl font-light text-center">FACESGOV</h1>
              <p className="text-gray-500 my-9 mb-4 text-center">Aenean consectetur odio in condimentum tristique. Nam hendrerit urna ex, non pretium erat pellentesque eget. Sed ut risus nec augue sagittis convallis.</p>
              <ProfileUpdateForm initialUserInformation={initialUserInformation} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </div>
  );
}

export default ProfileSetupModal;
