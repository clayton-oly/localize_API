using EmpresaApi.Data;
using EmpresaApi.DTOs;
using EmpresaApi.Models;
using EmpresaApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmpresaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly UsuarioService _usuarioService;

        public AuthController(JwtService jwtService, UsuarioService usuarioService)
        {
            _jwtService = jwtService;
            _usuarioService = usuarioService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(Usuario usuario)
        {
            if (_usuarioService.Register(usuario))
                return BadRequest("E-mail já cadastrado");

            return Ok(new { message = "Usuário criado com sucesso" });
        }

        [HttpPost("login")]
        public IActionResult Login(Usuario usuario)
        {
            var user = _usuarioService.Login(usuario);
            if (user == null || !BCrypt.Net.BCrypt.Verify(user.Senha, user.SenhaHash))
                return Unauthorized("Credenciais inválidas");

            var token = _jwtService.GenerateToken(usuario);
            return Ok(new { token });
        }
    }
}
