using back.Models;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Models
{
    public class ListasdbContext : DbContext
    {
        public ListasdbContext(DbContextOptions<ListasdbContext> options)
            : base(options)
        {
        }

        public DbSet<Listas> Listas { get; set; }


    }
}