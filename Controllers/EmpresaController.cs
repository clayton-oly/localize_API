using EmpresaApi.Data;
using EmpresaApi.Models;
using EmpresaApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EmpresaApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EmpresaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ReceitaWsService _receitaWs;

        public EmpresaController(AppDbContext context, ReceitaWsService receitaWs)
        {
            _context = context;
            _receitaWs = receitaWs;
        }

        [HttpPost("{cnpj}")]
        public async Task<IActionResult> CadastrarEmpresa(string cnpj)
        {
            var usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            var resposta = await _receitaWs.BuscarCnpjAsync(cnpj);
            if (resposta == null)
                return BadRequest("Erro ao buscar CNPJ");

            var empresa = new Empresa
            {
                CNPJ = resposta.Cnpj,
                NomeEmpresarial = resposta.Nome,
                NomeFantasia = resposta.Fantasia,
                Situacao = resposta.Situacao,
                Abertura = resposta.Abertura,
                Tipo = resposta.Tipo,
                NaturezaJuridica = resposta.Natureza_juridica,
                AtividadePrincipal = resposta.Atividade_principal.FirstOrDefault()?.Text ?? "",

                Logradouro = resposta.Logradouro,
                Numero = resposta.Numero,
                Complemento = resposta.Complemento,
                Bairro = resposta.Bairro,
                Municipio = resposta.Municipio,
                UF = resposta.Uf,
                CEP = resposta.Cep,

                UsuarioId = usuarioId
            };

            _context.Empresas.Add(empresa);
            await _context.SaveChangesAsync();

            return Ok(empresa);
        }

        [HttpGet]
        public IActionResult ListarEmpresas()
        {
            var usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var empresas = _context.Empresas
                .Where(e => e.UsuarioId == usuarioId)
                .ToList();

            return Ok(empresas);
        }
    }
}
