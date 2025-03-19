import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { functionServices } from './services/services.js';

export const App = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { enviarTextos, texts } = functionServices();
  
  // Estado para controlar los estilos de los inputs
  const [styleIndex, setStyleIndex] = useState(0);

  // Lista con los estilos para alternar entre ellos
  const styles = [
    { backgroundColor: 'white', color: 'black' },  // Fondo blanco - texto negro
    { backgroundColor: 'black', color: 'white' },  // Fondo negro - texto blanco
    { backgroundColor: 'lightblue', color: 'red' } // Fondo celeste - texto rojo
  ];

  // Función para alternar el estilo
  const toggleStyle = () => {
    setStyleIndex((prevIndex) => (prevIndex + 1) % styles.length);
  };

  // Enviar los textos al backend
  const sendTexts = async (data) => {
    const {texto } = data;
    reset();
    return await enviarTextos(texto);
  };

  return (
    <div className='w-screen flex justify-center items-center h-screen gap-20'>
      <form 
        onSubmit={handleSubmit(sendTexts)} 
        className='flex flex-col p-6 rounded bg-amber-100 gap-4 border-2'>

        <label className='font-bold text-center' htmlFor="texto">Ingrese el texto</label>
        <input 
          {...register("texto", { required: "El texto es obligatorio" })} 
          className='p-2 border-1 border-blue-900 rounded' 
          type="text" 
          name='texto' 
          style={{
            backgroundColor: styles[styleIndex].backgroundColor,
            color: styles[styleIndex].color
          }}
        />
        {errors.texto && <p className="text-red-500">{errors.texto.message}</p>}


        <button 
          type='submit' 
          className='bg-red-700 text-white font-bold text-xl rounded p-2'>
          Enviar texto
        </button>
      </form>

      <article className='gap-10 flex flex-col-reverse bg-amber-200 p-6 rounded overflow-y-auto max-h-72 max-w-96'>
        {texts && texts.length > 0 ? (
          texts.map((text, index) => (
            <div key={index} className='max-w-96 flex flex-col gap-10'>
              <div className='flex flex-col gap-4 bg-white p-2 rounded'>
                <p className='break-words'>{text.texto}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay textos aún.</p>
        )}
      </article>

      {/* Botón para cambiar el estilo */}
      <button 
        onClick={toggleStyle} 
        className="mt-5 py-2 px-4 bg-blue-500 text-white rounded">
        Cambiar estilo de caja
      </button>
    </div>
  );
};
