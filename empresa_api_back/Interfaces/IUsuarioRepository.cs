using EmpresaApi.DTOs;
using EmpresaApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmpresaApi.Interfaces
{
    public interface IUsuarioRepository
    {

        public Task Add(Usuario usuario);
        public Task<Usuario> GetByEmail(Usuario usuario);
        public Task<Usuario?> Login(Usuario usuario);
    }
}
