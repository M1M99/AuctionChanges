using Auction.Entities.Entities;
using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.Dtos.WinnerDto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WinnerController : ControllerBase
    {
        private readonly ApplicationDbContext _appContext;

        public WinnerController(ApplicationDbContext appContext)
        {
            _appContext = appContext;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] WinnerAddDto dto)
        {
            var winner = new Winner
            {
                CarId = dto.CarId.ToString(),
                UserId = dto.UserId
            };

            var data = await _appContext.Winners.FirstOrDefaultAsync(a => a.UserId == dto.UserId && a.CarId == dto.CarId.ToString());
            if (data == null)
            {
                await _appContext.Winners.AddAsync(winner);
                await _appContext.SaveChangesAsync();
                return Ok(new { message = "Won" });
            }
            return Conflict(new { message = "This vehicle has already been marked as won by this user." });
        }

        [HttpGet]
        public async Task<ActionResult> Get(string userId)
        {
            var cars = _appContext.Winners.Where(u => u.UserId == userId).ToList();
            if (cars.Count > 0)
            {
                return Ok(cars);
            }
            return BadRequest();
        }
    }
}
