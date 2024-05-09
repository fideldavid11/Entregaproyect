import React, { useState, useEffect } from 'react';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { Formik, Field, Form } from 'formik'; 
import ReactDOM from 'react-dom';

const ListaTable = () => {
  const [listas, setListas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewOption, setViewOption] = useState('all'); 

  useEffect(() => {
    fetchListas();
  }, []);

  const fetchListas = async () => {
    try {
      const response = await fetch('https://localhost:7206/api/Listas');
      if (!response.ok) {
        throw new Error('Error fetching listas');
      }
      const data = await response.json();
      // Ordenar imágenes para evitar desorden
      data.sort((a, b) => a.id - b.id);
      setListas(data);
    } catch (error) {
      console.error('Error fetching listas:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`https://localhost:7206/api/Listas/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del elemento');
      }
      const editedItem = await response.json();
      setEditingId(id);
      setEditData(editedItem);
      setSelectedImage(editedItem.foto);
      openEditModal(id);
    } catch (error) {
      console.error('Error al intentar editar:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los datos del elemento para editar.',
        icon: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrarlo'
      });

      if (result.isConfirmed) {
        const response = await fetch(`https://localhost:7206/api/Listas/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Error al intentar eliminar');
        }
        await fetchListas();
        Swal.fire({
          title: '¡Borrado!',
          text: 'Tu lista ha sido borrada con éxito.',
          icon: 'success'
        });
      }
    } catch (error) {
      console.error('Error al intentar eliminar:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el elemento.',
        icon: 'error'
      });
    }
  };

  const openEditModal = (id) => {
    if (!editData || Object.keys(editData).length === 0) {
      console.error('Error: No se encontraron datos para editar.');
      return;
    }
  
    const { titulo, mensaje, completado } = editData;
  
    const handleFormSubmit = async (values, { setSubmitting }) => {
      setSubmitting(true);
          
      try {
        const formData = new FormData();
        formData.append('ID', id);
        formData.append('Titulo', values.titulo);
        formData.append('Mensaje', values.mensaje);
        formData.append('Completado', values.completado ? 'true' : 'false');
        
        if (selectedImage) {
          formData.append('ImageFile', selectedImage);
        }
        const response = await fetch(`https://localhost:7206/api/Listas/${id}`, {
          method: 'PUT',
          body: formData,
        });
          
        if (!response.ok) {
          throw new Error('Error al actualizar el elemento: ' + response.statusText);
        }
          
        // Verificar si la respuesta no está vacía antes de analizarla como JSON
        const responseData = await response.text();
        const jsonResponse = responseData ? JSON.parse(responseData) : null;
          
        fetchListas();
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Tu elemento ha sido actualizado con éxito.',
          icon: 'success'
        });
        Swal.close();
      } catch (error) {
        console.error('Error al intentar actualizar:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el elemento: ' + error.message,
          icon: 'error'
        });
      } finally {
        setSubmitting(false);
      }
    };
    

    const initialValues = {
      titulo: titulo || '',
      mensaje: mensaje || '',
      completado: completado || false
    };
  
    const modalContent = (
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {(formikProps) => (
          <Form className="w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">Título</label>
              <Field
                type="text"
                name="titulo"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mensaje" className="block text-gray-700 font-bold mb-2">Mensaje</label>
              <Field
                type="text"
                name="mensaje"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="foto" className="block text-gray-700 font-bold mb-2">Foto</label>
              {selectedImage && typeof selectedImage === 'object' && <img src={URL.createObjectURL(selectedImage)} alt="Foto" className="h-20 w-20 rounded-full mx-auto mb-2" />}
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="completado" className="block text-gray-700 font-bold mb-2">Completado</label>
              <Field
                type="checkbox"
                name="completado"
                className="mr-2 leading-tight"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={formikProps.isSubmitting}
              >
                {formikProps.isSubmitting ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={() => Swal.close()}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  
    const modalContainer = document.createElement('div');
    ReactDOM.render(modalContent, modalContainer);
  
    Swal.fire({
      title: `Editar elemento - ID: ${id}`,
      html: modalContainer,
      didOpen: () => {
        const firstInput = document.querySelector('input[name="titulo"]');
        if (firstInput) firstInput.focus();
      },
    });
  };

  const filterListas = (lista) => {
    if (viewOption === 'completed') {
      return lista.completado;
    } else if (viewOption === 'incomplete') {
      return !lista.completado;
    }
    return true; 
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${viewOption === 'all' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => setViewOption('all')} disabled={viewOption === 'all'}>
          Todas
        </button>
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${viewOption === 'completed' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => setViewOption('completed')} disabled={viewOption === 'completed'}>
          Completadas
        </button>
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${viewOption === 'incomplete' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => setViewOption('incomplete')} disabled={viewOption === 'incomplete'}>
          No Completadas
        </button>
      </div>
      <table className="w-full divide-y divide-gray-200 shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th id="id-column" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th id="title-column" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Título</th>
            <th id="message-column" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensaje</th>
            <th id="photo-column" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
            <th id="completed-column" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listas.filter(filterListas).map((lista) => (
            <tr key={lista.id} className={`transition-all hover:bg-gray-100`}>
              <td className="px-6 py-4 whitespace-nowrap">{lista.id}</td>
              <td className="px-6 py-4 whitespace-nowrap font-bold">{lista.titulo}</td>
              <td className={`px-6 py-4 whitespace-nowrap ${lista.completado && typeof lista.mensaje === 'string' ? 'line-through' : ''}`}>{lista.mensaje}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lista.foto && <img src={`https://localhost:7206/api/Listas/imagen/${lista.foto}`} alt="Foto" className="h-20 w-20 rounded-full mx-auto" />}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap ${lista.completado && typeof lista.completado === 'string' ? 'line-through' : ''}`}>{lista.completado ? 'Sí' : 'No'}</td>
              <td className="px-6 py-4 whitespace-nowrap flex">
                <div className="flex">
                  <BsTrashFill className="text-white bg-red-500 rounded-full p-2 cursor-pointer hover:bg-red-600" style={{ width: '32px', height: '32px' }} onClick={() => handleDelete(lista.id)} />
                  <BsPencilSquare className="text-white bg-blue-500 rounded-full p-2 ml-2 cursor-pointer hover:bg-blue-600" style={{ width: '32px', height: '32px' }} onClick={() => handleEdit(lista.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaTable;