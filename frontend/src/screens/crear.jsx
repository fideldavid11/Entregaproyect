import React, { useState } from 'react';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const CrearListaForm = () => {
  const initialValues = {
    titulo: '',
    mensaje: '',
    foto: '',
    completado: false,
    imageFile: null,
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let inputValue;
    if (type === 'file') {
      inputValue = files && files.length > 0 ? files[0] : null;
    } else {
      inputValue = type === 'checkbox' ? checked : value;
    }
  
    setValues({
      ...values,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar el formulario
    const validationSchema = Yup.object().shape({
      titulo: Yup.string().required('El título es requerido'),
      mensaje: Yup.string().required('El mensaje es requerido'),
    });
  
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      return;
    }
  
    // Si el formulario es valido, proceder con el envio
    const formData = new FormData();
    formData.append('Titulo', values.titulo);
    formData.append('Mensaje', values.mensaje);
    formData.append('Foto', values.foto);
    formData.append('Completado', values.completado);
    formData.append('ImageFile', values.imageFile);
  
    try {
      const response = await fetch('https://localhost:7206/api/Listas', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error al crear lista');
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Lista creada exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
      setValues(initialValues); // Limpiar las casillas después de enviar el formulario
    } catch (error) {
      console.error('Error al crear lista:', error);
      alert('Error al crear lista');
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl form-container">
      <h2 className="text-2xl font-bold mb-4">Crear Nueva Lista</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-semibold mb-1">Título:</label>
          <input
            type="text"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
            required // Campo requerido
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mensaje" className="block text-sm font-semibold mb-1">Mensaje:</label>
          <input
            type="text"
            name="mensaje"
            value={values.mensaje}
            onChange={handleChange}
            required // Campo requerido
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="foto" className="block text-sm font-semibold mb-1">Foto:</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
          //campo no requerido
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="completado" className="block text-sm font-semibold mb-1">Completado:</label>
          <input
            type="checkbox"
            name="completado"
            checked={values.completado}
            onChange={handleChange}
            className="mr-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Crear Lista
        </button>
      </form>
    </div>
  );
};

export default CrearListaForm;
