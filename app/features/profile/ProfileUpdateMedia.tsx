/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiOutlineUpload } from 'react-icons/hi';

import { mutateDeleteUserImageProfile, mutateUserImageProfile } from '@/api/users';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

type ProfileUpdateFormProps = {
  initialUserInformation: {
    urlImage?: string;
  };
};

function ProfileUpdateMedia({ initialUserInformation }: ProfileUpdateFormProps) {
  const mutateImage = mutateUserImageProfile();
  const mutateDeleteImage = mutateDeleteUserImageProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleUploadImage = (fileToUpload: File) => {
    console.log(fileToUpload);
    if (!fileToUpload) {
      setMessage('No se ha seleccionado una Imagen');
      setIsModalOpen(true);
      return;
    }

    if (fileToUpload.size > 1048576) {
      setMessage('El archivo es demasiado grande');
      setIsModalOpen(true);
      return;
    }
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
    multiple: false,
  });
  const handleRemoveImage = () => {
    mutateDeleteImage.mutate({});
  };

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
        <div className="col-span-2 flex flex-col mt-5 justify-center items-center">
          <div className="flex justify-between p-6">
            <h2 className="text-2xl text-bold">Imagen de Perfil</h2>
          </div>
          <div className="flex flex-col justify-center">
            <img
              src={initialUserInformation.urlImage ?? ''}
              alt="profile"
              className="w-10 md:w-20 h-10 md:h-20 rounded-full border-2 border-gray-300"
            />
          </div>
          <div>
            <Button
              type="button"
              onClick={() => handleRemoveImage()}
              className="mt-3"
            >
              Eliminar Imagen
            </Button>
          </div>
        </div>
      )}
      {isModalOpen && <Modal title="Ups! Ocurrio un error" type="error" button="Cerrar" message={message} closeModal={() => { setIsModalOpen(false); }} />}
    </div>
  );
}

export default ProfileUpdateMedia;
