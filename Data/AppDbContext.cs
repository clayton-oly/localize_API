using EmpresaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EmpresaApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Usuario> Usuarios => Set<Usuario>();
        public DbSet<Empresa> Empresas => Set<Empresa>();
    }
}
