/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiOutlineUpload } from 'react-icons/hi';

import { mutateUserImageProfile } from '@/api/users';
import getMediaUrl from '@/utils/media';

type ProfileUpdateFormProps = {
  initialUserInformation: {
    urlImage?: string;
  };
};

function ProfileUpdateMedia({ initialUserInformation }: ProfileUpdateFormProps) {
  const mutateImage = mutateUserImageProfile();

  const handleUploadImage = (fileToUpload: File) => {
    console.log(fileToUpload);
    if (!fileToUpload) return;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    mutateImage.mutate(formData);
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleUploadImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      mimeType: ['image/*'],
      extensions: ['png', 'jpg', 'jpeg', 'gif'],
    },
  });

  return (
    <div>
      {initialUserInformation.urlImage === '' ? (
        <form className="col-span-2 flex flex-col mt-5" encType="multipart/form-data" method="post">
          <div className="flex justify-between p-6">
            <h2 className="text-2xl text-bold">Imagen de Perfil</h2>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-col p-6">
              <div>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <HiOutlineUpload className="text-3xl text-gray-500" />
                  <p>
                    <span className="font-semibold">Click para subir</span>
                    {' '}
                    o arrastre la imagen aquí
                  </p>
                </div>
              </div>
              <p className="text-sm italic">* Tamaño máximo 1 MB</p>
              <p className="text-sm italic">* Formato de preferencia .webp</p>
            </div>
          </div>
        </form>
      ) : (
        <div className="col-span-2 flex flex-col mt-5">
          <div className="flex justify-between p-6">
            <h2 className="text-2xl text-bold">Imagen de Perfil</h2>
          </div>
          <div className="flex flex-col justify-center">

            <img
              src={getMediaUrl(initialUserInformation.urlImage ?? '')}
              alt="profile"
              className="w-10 md:w-20 h-10 md:h-20 rounded-full"
            />

          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileUpdateMedia;
