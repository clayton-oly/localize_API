# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia a solution e os arquivos .csproj para restaurar dependências
COPY empresa_api_back/EmpresaApi.sln ./
COPY empresa_api_back/**/*.csproj ./empresa_api_back/

# Restaura usando a solution
WORKDIR /src/empresa_api_back
RUN dotnet restore ../EmpresaApi.sln

# Copia o restante do código
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
