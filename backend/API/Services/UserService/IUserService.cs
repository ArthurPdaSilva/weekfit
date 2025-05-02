using API.DTOs.User;
using API.Models;

namespace API.Services.UserService
{
    public interface IUserService
    {
        public long? Create(UserRegister user);
        public User? GetUserByEmail(string email);
        public OperationResult<UserSession> GetUserById(long id);

    }
}
