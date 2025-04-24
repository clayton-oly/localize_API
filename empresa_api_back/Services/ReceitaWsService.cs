using EmpresaApi.DTOs;

namespace EmpresaApi.Services
{
    public class ReceitaWsService
    {
        private readonly HttpClient _httpClient;

        public ReceitaWsService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ReceitaWsResponse?> BuscarCnpjAsync(string cnpj)
        {
            try
            {
                var url = $"https://www.receitaws.com.br/v1/cnpj/{cnpj}";
                return await _httpClient.GetFromJsonAsync<ReceitaWsResponse>(url);
            }
            catch
            {
                return null;
            }
        }
    }
}
