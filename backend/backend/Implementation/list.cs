using backend.Models;
using System.Collections.Generic;

namespace backend.Repository.Abstract
{
    public interface IListasRepository
    {
        IEnumerable<Listas> GetAllListas();
        Listas GetListasById(int id);
        bool AddListas(Listas lista);
        bool UpdateListas(Listas lista);
        bool DeleteListas(Listas lista);
    }
}
