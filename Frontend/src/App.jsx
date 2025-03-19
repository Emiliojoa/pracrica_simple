import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { functionServices } from './services/services.js';

export const App = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { enviarTextos, texts } = functionServices();
  
  const [styleIndex, setStyleIndex] = useState(0);

  const styles = [
    { backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0)', name: 'Light' },
    { backgroundColor: 'rgb(17, 24, 39)', color: 'rgb(255, 255, 255)', name: 'Dark' },
    { backgroundColor: 'rgb(219, 234, 254)', color: 'rgb(30, 58, 138)', name: 'Blue' },
    { backgroundColor: 'rgb(255, 243, 205)', color: 'rgb(185, 28, 28)', name: 'Yellow' },
    { backgroundColor: 'rgb(243, 244, 246)', color: 'rgb(75, 85, 99)', name: 'Gray' },
    { backgroundColor: 'rgb(255, 229, 100)', color: 'rgb(34, 34, 34)', name: 'Gold' },
    { backgroundColor: 'rgb(255, 245, 247)', color: 'rgb(214, 61, 92)', name: 'Pink' },
    { backgroundColor: 'rgb(243, 247, 243)', color: 'rgb(0, 128, 0)', name: 'Green' },
    { backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 255)', name: 'Facebook' },
    { backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(29, 161, 242)', name: 'Twitter' },
    { backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(234, 67, 53)', name: 'Google' },
    { backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0)', name: 'Black' },
    { backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)', name: 'White' },
  ];

  const toggleStyle = () => {
    setStyleIndex((prevIndex) => (prevIndex + 1) % styles.length);
  };

  const sendTexts = async (data) => {
    const { texto } = data;
    reset();
    return await enviarTextos(texto);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Panel de Mensajes Interactivo
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit(sendTexts)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="texto">
                  Ingrese su mensaje
                </label>
                <div className="relative">
                  <input
                    {...register("texto", { required: "El mensaje es obligatorio" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
                    type="text"
                    name="texto"
                    placeholder="Escriba su mensaje aquí..."
                    style={{
                      backgroundColor: styles[styleIndex].backgroundColor,
                      color: styles[styleIndex].color
                    }}
                  />
                </div>
                {errors.texto && (
                  <p className="mt-2 text-sm text-red-600">{errors.texto.message}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ease-in-out"
                >
                  Enviar Mensaje
                </button>
                
                <button
                  type="button"
                  onClick={toggleStyle}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-200 ease-in-out"
                >
                  {styles[styleIndex].name}
                </button>
              </div>
            </form>
          </div>

          {/* Messages Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mensajes</h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
              {texts && texts.length > 0 ? (
                texts.map((text, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-gray-100"
                  >
                    <p className="text-gray-700 break-words">{text.texto}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay mensajes aún. ¡Sé el primero en enviar uno!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;