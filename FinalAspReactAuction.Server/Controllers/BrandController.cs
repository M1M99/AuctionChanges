using Auction.Business.Abstract;
using FinalAspReactAuction.Server.Dtos.MakeDto;
using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IMakeService _service;

        public BrandController(IMakeService? service)
        {
            _service = service;
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<Make>> GetAllAsync()
        {
            var result = await _service.GetAllAsync();
            return result;
        }

        [HttpGet("GetById")]
        public async Task<Make> Get(int id)
        {
            return await _service.GetByIdAsync(id);
        }

        [HttpDelete("DeleteBrand")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch
            {
                return StatusCode(505);
            }
        }

        [HttpPost("AddMake")]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<AddMakeDto>> AddMake(Make make)
        {
            var existingBrand = await _service.GetAllAsync();
            var result = existingBrand.FirstOrDefault(a => a.Name.ToLower() == make.Name.ToLower());

            if (result != null)
            {
                return Conflict(new { message = "Already Exist" });
            }

            var brand = new Make
            {
                Description = make.Description,
                Name = make.Name
            };

            await _service.AddAsync(brand);

            var returnByDto = new AddMakeDto
            {
                Name = brand.Name,
                Description = brand.Description
            };

            return Ok(returnByDto);
        }


        [HttpPut("EditMake")]
        public async Task<ActionResult> EditMake(EditMakeDto dto)
        {
            try
            {
                var customer = new Make
                {
                    Id = dto.Id,
                    Name = dto.Name,
                    Description = dto.Description,
                };
                await _service.UpdateAsync(customer);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server Error: {ex.Message}");
            }
        }
    }
}
