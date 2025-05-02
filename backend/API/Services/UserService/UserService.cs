using API.DTOs.User;
using API.Models;
using API.Repositories.UserRepository;
using API.Services.UserService;
using AutoMapper;

namespace api.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public long? Create(UserRegister user)
        {
            var newUser = _mapper.Map<User>(user);
            newUser.CreatedAt = DateTime.UtcNow;
            _userRepository.Create(newUser);
            return newUser.Id;
        }

        public User? GetUserByEmail(string email)
        {
            return _userRepository.GetUserByEmail(email);
        }

        public OperationResult<UserSession> GetUserById(long id)
        {
            var user = _userRepository.GetUserById(id);

            if (user is null)
            {
                return new OperationResult<UserSession>(true, null);
            }

            var userSession = _mapper.Map<UserSession>(user);  
            return new OperationResult<UserSession>(false, "Usuário buscado com sucesso", userSession);
        }
    }
}
