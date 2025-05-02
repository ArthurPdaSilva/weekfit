using API.DTOs.User;
using API.Models;

namespace API.Services.SessionService
{
    public interface ISessionService
    {
        public OperationResult<string> Login(UserLogin userLogin);
        public OperationResult<string> Register(UserRegister userRegister);
        public OperationResult<UserSession> GetCurrentUser(long id);
    }
}
