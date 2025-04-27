using Auction.Business.Abstract;
using FinalAspReactAuction.Server.Dtos.ModelDto;
using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalAspReactAuction.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ModelController : ControllerBase
{
    private readonly IModelService _modelService;

    public ModelController(IModelService modelService)
    {
        _modelService = modelService;
    }

    [HttpGet("GetAllModel")]
    public async Task<ActionResult> GetAllModel()
    {
        var listOfModel = await _modelService.GetAllAsync();
        return Ok(listOfModel);
    }

    [HttpGet("GetModelByMake")]
    public async Task<List<Model>> GetModelsByMake(int makeId)
    {
        var listOfMakes = await _modelService.GetModelsByMakeId(makeId);
        return listOfMakes;

    }

    [HttpGet("GetById")]
    public async Task<ActionResult<Model>> GetById(int id)
    {
        var data = await _modelService.GetByIdAsync(id);
        return Ok(data);
    }

    [HttpDelete("DeleteModelById")]
    public async Task<ActionResult> DeleteById(int id)
    {
        await _modelService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost("AddModel")]
    public async Task<ActionResult<AddModelDto>> AddModel([FromBody] AddModelDto dto)
    {
        var newModel = new Model
        {
            MakeId= dto.MakeId,
            Name = dto.Name,
            Type = dto.Type
        };
        await _modelService.AddAsync(newModel);
        var dtoModel = new AddModelDto
        {
            MakeId = newModel.MakeId,
            Type = newModel.Name,
            Name = newModel.Type
        };
        return Ok(dtoModel);
    }

    [HttpGet("GetByMakeId")]
    public async Task<List<Model>> GetByMakeId(int id)
    {
        var data = await _modelService.GetModelsByMakeId(id);
        return data;
    }

    [HttpPut]
    public async Task UpdateAsync(UpdateModelDto model)
    {
        var existingModel = await _modelService.GetByIdAsync(model.Id);
        if (existingModel != null)
        {
            existingModel.MakeId = model.MakeId;  
            existingModel.Name = model.Name;
            existingModel.Type = model.Type;

        }
        await _modelService.UpdateAsync(existingModel!);
    }

}
