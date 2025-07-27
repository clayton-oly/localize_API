using EmpresaApi.DTOs;
using EmpresaApi.Interfaces;
using EmpresaApi.Models;

namespace EmpresaApi.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public bool Register (Usuario usuario)
        {
            if (_usuarioRepository.GetByEmail(usuario.Email) != null)
                return false;

            var usuarioNew = new Usuario
            {
                Nome = usuarioNew.Nome,
                Email = usuarioNew.Email,
                SenhaHash = BCrypt.Net.BCrypt.HashPassword(usuarioNew.SenhaHash)
            };

            _usuarioRepository.Add(usuario);

            return true;
        }

        public bool Login(Usuario usuario)
        {
            if(_usuarioRepository.GetByEmail(usuario))
                return false;

            return true;
        }
    }
}
