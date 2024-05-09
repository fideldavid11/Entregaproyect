using back.Models;
using backend.Models;
using backend.Repository.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Repository.Implementation
{
    public class ListasRepository : IListasRepository
    {
        private readonly ListasdbContext _dbContext;

        public ListasRepository(ListasdbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Listas> GetAllListas()
        {
            return _dbContext.Listas.ToList();
        }

        public Listas GetListasById(int id)
        {
            return _dbContext.Listas.FirstOrDefault(l => l.ID == id);
        }

        public bool AddListas(Listas lista)
        {
            try
            {
                _dbContext.Listas.Add(lista);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateListas(Listas lista)
        {
            try
            {
                _dbContext.Entry(lista).State = EntityState.Modified;
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool DeleteListas(Listas lista)
        {
            try
            {
                _dbContext.Listas.Remove(lista);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
