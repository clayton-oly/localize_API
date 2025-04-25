using EmpresaApi.Data;
using EmpresaApi.Models;
using EmpresaApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Linq;

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

        private string LimparCnpj(string cnpj)
        {
            return string.IsNullOrEmpty(cnpj) ? string.Empty : new string(cnpj.Where(char.IsDigit).ToArray());
        }

        private bool ValidarCnpj(string cnpj)
        {
            return cnpj.Length == 14;
        }

        [HttpPost("{cnpj}")]
        public async Task<IActionResult> CadastrarEmpresa(string cnpj)
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (claim == null)
                return Unauthorized("Usuário não autenticado.");

            var usuarioId = int.Parse(claim.Value);

            var cnpjLimpo = LimparCnpj(cnpj);
            if (!ValidarCnpj(cnpjLimpo))
                return BadRequest("CNPJ inválido. O CNPJ deve ter exatamente 14 dígitos.");

            var resposta = await _receitaWs.BuscarCnpjAsync(cnpjLimpo);

            if (resposta == null ||
                string.IsNullOrWhiteSpace(resposta.Cnpj) ||
                string.IsNullOrWhiteSpace(resposta.Nome) ||
                string.IsNullOrWhiteSpace(resposta.Atividade_principal?.FirstOrDefault()?.Text))
            {
                return BadRequest("CNPJ inválido ou dados incompletos. Verifique se o CNPJ está correto.");
            }

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
            var claim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (claim == null)
                return Unauthorized("Usuário não autenticado.");

            var usuarioId = int.Parse(claim.Value);

            var empresas = _context.Empresas
                .Where(e => e.UsuarioId == usuarioId)
                .ToList();

            return Ok(empresas);
        }
    }
}
