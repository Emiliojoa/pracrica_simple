import { useState, useEffect } from "react";

export const functionServices = () => {
  const [texts, setTexts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const enviarTextos = async (texto) => {
    try {
      const response = await fetch(`http://localhost:3000/send`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({texto}),
      });

      if (response.ok) {
        const newText = await response.json();
        setIsUpdated(true);
        return newText
      }

    } catch (error) {
      alert("Cometiste un error");
    }
  };

  const obtenerTextos = async () => {
    try {
      const response = await fetch("http://localhost:3000/textos", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setTexts(data);
      } else {
        console.log('Error al obtener los textos:');
      }
    } catch (error) {
      console.log('Error en la solicitud');
    }
  };

  useEffect(() => {
    if (isUpdated) {
      obtenerTextos(); 
      setIsUpdated(false);
    }
  }, [isUpdated]); 

  useEffect(() => {
    obtenerTextos();
  }, []);

  return { enviarTextos, texts };
};
