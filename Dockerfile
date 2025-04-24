# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia o arquivo .sln e os .csproj para restaurar as dependências
COPY empresa_api_back/*.sln ./
COPY empresa_api_back/**/*.csproj ./empresa_api_back/
WORKDIR /src/empresa_api_back
RUN dotnet restore ../*.sln

# Copia o restante dos arquivos
COPY empresa_api_back/. ./
RUN dotnet publish -c Release -o /app/publish

# Etapa de runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:80

EXPOSE 80
ENTRYPOINT ["dotnet", "EmpresaApi.dll"]
