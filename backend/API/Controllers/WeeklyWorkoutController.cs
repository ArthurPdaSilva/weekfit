using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeeklyWorkoutController : ControllerBase
    {
        //private readonly IUserService _userService;

        public WeeklyWorkoutController()
        {
            //_userService = userService;
        }

        [Authorize]
        [HttpGet("Get")]
        public IActionResult Get()
        {
            var id = long.Parse(HttpContext.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
            //var result = _userService.GetUserById(id);
            //if (result.IsError)
            //{
            //    return BadRequest(result);
            //}

            return Ok();
        }

        [Authorize]
        [HttpGet("Post")]
        public IActionResult Post()
        {
            //var result = _userService.GetUserById(id);
            //if (result.IsError)
            //{
            //    return BadRequest(result);
            //}

            return Ok();
        }
    }
}