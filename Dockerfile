# Etapa 1: Base da imagem com o SDK do .NET
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Etapa 2: Copiar o SDK do .NET para compilar o app
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["EmpresaApi/EmpresaApi.csproj", "EmpresaApi/"]
RUN dotnet restore "EmpresaApi/EmpresaApi.csproj"
COPY . .
WORKDIR "/src/EmpresaApi"
RUN dotnet build "EmpresaApi.csproj" -c Release -o /app/build

# Etapa 3: Publicar a aplicação
FROM build AS publish
RUN dotnet publish "EmpresaApi.csproj" -c Release -o /app/publish

# Etapa 4: Imagem final com a aplicação
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EmpresaApi.dll"]
