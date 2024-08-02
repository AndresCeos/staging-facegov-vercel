'use client';

import { useState } from 'react';

function Page() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO send data to the server
    const data = {
      name,
      phone,
      email,
      message,
      role,
    };
    console.log(data);
  };

  const handleRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };
  return (
    <div className="flex flex-col justify-center items-center p-5 my-14">
      <h1 className="text-3xl font-bold">Contáctanos</h1>
      <form onSubmit={handleSubmit} className="w-full md:w-[900px]">
        <div className="my-3 ">
          <p>Nombre</p>
          <input className=" w-full border-2 border-gray-600 rounded-2xl px-3" type="text" id="name" name={name} onChange={(e) => { setName(e.target.value); }} required />
        </div>
        <div className="my-3">
          <p>Teléfono</p>
          <input className="w-full border-2 border-gray-600 rounded-2xl px-3" type="tel" id="phone" name={phone} onChange={(e) => { setPhone(e.target.value); }} required />
        </div>
        <div className="my-3">
          <p>Correo Electrónico</p>
          <input className="w-full border-2 border-gray-600 rounded-2xl px-3" type="email" id="email" name={email} onChange={(e) => { setEmail(e.target.value); }} required />
        </div>
        <div className="my-3">
          <p>Mensaje</p>
          <textarea className="w-full border-2 border-gray-600 rounded-2xl px-3" id="message" name={message} rows={6} onChange={(e) => { setMessage(e.target.value); }} required />
        </div>
        <div className="my-3">
          <p>Perfil</p>
        </div>

        <div className="flex my-3">
          <div className="px-5">
            <input type="radio" id="user" name="role" value="user" onChange={handleRole} />
            <p>Usuario</p>
          </div>

          <div className="px-5">
            <input type="radio" id="political" name="role" value="political" onChange={handleRole} />
            <p>Político</p>
          </div>
        </div>

        <button className=" text-bold w-full border-2 rounded-2xl bg-red-500 px-10 py-3 hover:bg-black text-white hover:transition duration-500 ease-in" type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Page;
