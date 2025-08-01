FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY empresa_api_back/*.csproj ./ 
RUN dotnet restore

COPY empresa_api_back/. ./
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "EmpresaAPI.dll"]
