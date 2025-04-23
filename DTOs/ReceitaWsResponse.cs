namespace EmpresaApi.DTOs
{
    public class ReceitaWsResponse
    {
        public string Nome { get; set; } = "";
        public string Fantasia { get; set; } = "";
        public string Cnpj { get; set; } = "";
        public string Situacao { get; set; } = "";
        public string Abertura { get; set; } = "";
        public string Tipo { get; set; } = "";
        public string Natureza_juridica { get; set; } = "";
        public List<Atividade> Atividade_principal { get; set; } = new();

        public string Logradouro { get; set; } = "";
        public string Numero { get; set; } = "";
        public string Complemento { get; set; } = "";
        public string Bairro { get; set; } = "";
        public string Municipio { get; set; } = "";
        public string Uf { get; set; } = "";
        public string Cep { get; set; } = "";
    }

    public class Atividade
    {
        public string Text { get; set; } = "";
    }
}
