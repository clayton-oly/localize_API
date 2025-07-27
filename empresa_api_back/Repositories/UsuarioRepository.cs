using EmpresaApi.Data;
using EmpresaApi.DTOs;
using EmpresaApi.Interfaces;
using EmpresaApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace EmpresaApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;
        public UsuarioRepository(AppDbContext context) 
        {
            _context = context;
        }

        public async Task Add(Usuario usuario)
        {
            await _context.Usuarios.AddAsync(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<Usuario> GetByEmail(Usuario usuario)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == usuario.Email);
        }

        public async Task<Usuario?> Login(Usuario usuario)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == usuario.Email && u.SenhaHash == usuario.SenhaHash);
        }
    }
}
