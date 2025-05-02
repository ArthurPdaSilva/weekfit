using API.DTOs.User;
using API.Models;
using API.Services.TokenService;
using API.Services.UserService;
using AutoMapper;

namespace API.Services.SessionService
{
    public class SessionService : ISessionService
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public SessionService(IUserService userService, ITokenService tokenService, IMapper mapper)
        {
            _userService = userService;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public OperationResult<string> Login(UserLogin userLogin)
        {
            if (userLogin.Email == null || userLogin.Password == null)
            {
                return new OperationResult<string>(true, "Campos inválidos");
            }

            var user = _userService.GetUserByEmail(userLogin.Email);
            if (user == null)
            {
                return new OperationResult<string>(true, "Usuário não encontrado");
            }

            if (!BCrypt.Net.BCrypt.Verify(userLogin.Password, user.Password))
            {
                return new OperationResult<string>(true, "Senha inválida");
            }

            var token = _tokenService.GenerateToken(user.Id);
            return new OperationResult<string>(false, "Login feito com sucesso", token);
        }

        public OperationResult<string> Register(UserRegister userRegister)
        {
            if (userRegister.Name == null || userRegister.Password == null || userRegister.Email == null)
            {
                return new OperationResult<string>(true, "Campos inválidos");
            }

            var userByEmail = _userService.GetUserByEmail(userRegister.Email);
            if (userByEmail != null)
            {
                return new OperationResult<string>(true, "Email já cadastrado");
            }

            userRegister.Password = BCrypt.Net.BCrypt.HashPassword(userRegister.Password);

            var userId = _userService.Create(userRegister);
            if (userId == null)
            {
                return new OperationResult<string>(true, "Erro ao cadastrar usuário");
            }

            var token = _tokenService.GenerateToken(userId.Value);
            return new OperationResult<string>(false, "Cadastro feito com sucesso", token);
        }

        public OperationResult<UserSession> GetCurrentUser(long id)
        {
            var user = _userService.GetUserById(id);
            if (user is null)
            {
                return new OperationResult<UserSession>(true, "Usuário não encontrado");
            }

            return new OperationResult<UserSession>(false, "Usuário encontrado com sucesso", user.Data);
        }
       
    }
}
