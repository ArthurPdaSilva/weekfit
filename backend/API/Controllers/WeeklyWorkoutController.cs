using API.DTOs.User;
using API.DTOs.WeeklyWorkout;
using API.Services.WeeklyWorkoutService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeeklyWorkoutController : ControllerBase
    {
        private readonly IWeeklyWorkoutService _weeklyWorkoutService;

        public WeeklyWorkoutController(IWeeklyWorkoutService weeklyWorkoutService)
        {
            _weeklyWorkoutService = weeklyWorkoutService;
        }

        [Authorize]
        [HttpGet("Get")]
        public IActionResult Get()
        {
            var userId = long.Parse(HttpContext.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
            var result = _weeklyWorkoutService.Get(userId);
            if (result.IsError)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost("Post")]
        public IActionResult Post(WeeklyWorkoutRow weeklyWorkoutRow)
        {
            var result = _weeklyWorkoutService.Post(weeklyWorkoutRow);
            if (result.IsError)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPut("Put")]
        public IActionResult Put([FromBody] WeeklyWorkoutRow weeklyWorkoutRow)
        {
            var result = _weeklyWorkoutService.Put(weeklyWorkoutRow);
            if (result.IsError)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpDelete("Delete")]
        public IActionResult Delete(long rowId)
        {
            var result = _weeklyWorkoutService.Delete(rowId);
            if (result.IsError)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}