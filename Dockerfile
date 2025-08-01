FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY CNPJConsultaAPI/*.csproj ./CNPJConsultaAPI/
RUN dotnet restore ./CNPJConsultaAPI/CNPJConsultaAPI.csproj

COPY CNPJConsultaAPI/. ./CNPJConsultaAPI/
WORKDIR /src/CNPJConsultaAPI
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "CNPJConsultaAPI.dll"]

