using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Repository.Abstract;
using System;
using Microsoft.Extensions.Hosting;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListasController : ControllerBase
    {
        private readonly IListasRepository _listasRepository;
        private readonly IFileService _fileService;
        private readonly IWebHostEnvironment _environment; 

        public ListasController(IListasRepository listasRepository, IFileService fileService, IWebHostEnvironment environment)
        {
            _listasRepository = listasRepository;
            _fileService = fileService;
            _environment = environment; 
        }
        // GET: api/Listas
        [HttpGet]
        public ActionResult<IEnumerable<Listas>> Get()
        {
            var listas = _listasRepository.GetAllListas();
            return Ok(listas);
        }

        // GET: api/Listas/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<Listas> Get(int id)
        {
            var lista = _listasRepository.GetListasById(id);
            if (lista == null)
            {
                return NotFound();
            }
            return Ok(lista);
        }

        // GET: api/Listas/imagen/{nombreImagen}
        [HttpGet("imagen/{nombreImagen}")]
        public IActionResult GetImagen(string nombreImagen)
        {
            try
            {
                var contentPath = _environment.ContentRootPath;
                var path = Path.Combine(contentPath, "Uploads", nombreImagen);

                if (System.IO.File.Exists(path))
                {
                    var imageBytes = System.IO.File.ReadAllBytes(path);
                    return File(imageBytes, "image/jpeg"); // Cambia el tipo MIME según el tipo de imagen
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        // POST: api/Listas
        [HttpPost]
        public ActionResult Post([FromForm] Listas listaWithImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (listaWithImage.ImageFile != null && listaWithImage.ImageFile.Length > 0)
                {
                    var result = _fileService.SaveImage(listaWithImage.ImageFile);
                    if (result.Item1 == 1)
                    {
                        listaWithImage.Foto = result.Item2;
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, result.Item2);
                    }
                }

                if (_listasRepository.AddListas(listaWithImage))
                {
                    return CreatedAtAction(nameof(Get), new { id = listaWithImage.ID }, listaWithImage);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create the list.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        // PUT: api/Listas/5
        // PUT: api/Listas/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromForm] Listas listaWithImage)
        {
            if (id != listaWithImage.ID)
            {
                return BadRequest("ID del recurso y ID en los datos no coinciden.");
            }

            try
            {
                var existingListas = _listasRepository.GetListasById(id);
                if (existingListas == null)
                {
                    return NotFound($"Lista con ID {id} no encontrada.");
                }

                existingListas.Titulo = listaWithImage.Titulo; // Actualiza el título
                existingListas.Mensaje = listaWithImage.Mensaje; // Actualiza el mensaje
                existingListas.Completado = listaWithImage.Completado; // Actualiza el estado de completado

                // Actualiza la imagen si se proporciona una nueva
                if (listaWithImage.ImageFile != null && listaWithImage.ImageFile.Length > 0)
                {
                    var result = _fileService.SaveImage(listaWithImage.ImageFile);
                    if (result.Item1 == 1)
                    {
                        existingListas.Foto = result.Item2; // Actualiza la propiedad de la imagen
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, result.Item2);
                    }
                }

                // Aquí puedes actualizar otros campos según sea necesario

                if (_listasRepository.UpdateListas(existingListas))
                {
                    return NoContent();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error al intentar actualizar la lista.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error interno del servidor: {ex.Message}");
            }
        }


        // DELETE: api/Listas/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var lista = _listasRepository.GetListasById(id);
            if (lista == null)
            {
                return NotFound();
            }

            if (_listasRepository.DeleteListas(lista))
            {
                return NoContent();
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to delete the list.");
            }
        }
    }
}
