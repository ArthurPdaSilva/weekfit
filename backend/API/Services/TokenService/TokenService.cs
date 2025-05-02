using API.Services.TokenService;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace api.Services.TokenService
{
    public class TokenService : ITokenService
    {
        public string GenerateToken(long id)
        {
            var authSigningKey = new SymmetricSecurityKey
                    (Encoding.UTF8.GetBytes("your_super_secret_key_that_is_long_enough_1234"));
            var credentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(authSigningKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, id + ""),
            };

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5045",
                audience: "http://localhost:5045",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
