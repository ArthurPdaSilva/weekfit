using API.DTOs.User;
using API.Services.SessionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly ISessionService _sessionService;

        public SessionController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserLogin user)
        {
            var result = _sessionService.Login(user);
            if (result.IsError)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] UserRegister user)
        {
            var result = _sessionService.Register(user);
            if (result.IsError)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpGet("GetCurrentUser")]
        public IActionResult GetCurrentUser()
        {
            var id = HttpContext.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var result = _sessionService.GetCurrentUser(long.Parse(id));
            if (result.IsError)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}