using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Listas
    {
        public int ID { get; set; }
        public string? Titulo { get; set; }
        public string? Mensaje { get; set; }
        public string? Foto { get; set; }
        public bool Completado { get; set; } // Propiedad para indicar si la lista está completada o no

        [NotMapped]
        public IFormFile? ImageFile { get; set; } // Campo para la imagen
    }
}
