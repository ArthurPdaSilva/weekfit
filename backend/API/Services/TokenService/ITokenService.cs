namespace API.Services.TokenService
{
    public interface ITokenService
    {
        public string GenerateToken(long id);
    }
}
