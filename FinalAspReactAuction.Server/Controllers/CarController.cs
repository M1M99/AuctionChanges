using Auction.Business.Abstract;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using FinalAspReactAuction.Server.Dtos.CarDto;
using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IConfiguration configuration;
        public CarController(ICarService carService, IConfiguration configuration, ICloudinaryService cloudinaryService)
        {
            _carService = carService;
            this.configuration = configuration;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet("Cars")]
        public async Task<IEnumerable<Car>> GetCars()
        {
            return await _carService.GetAllAsync();
        }

        [HttpGet("OrderAscending")]
        public async Task<List<Car>> GetAscending()
        {
            var cars = await _carService.GetAllAsync();
            return cars.OrderBy(a => a.Price).ToList();
        }

        [HttpGet("GetP/P")]
        public Task<List<Car>> Get() { 
            return _carService.GetTopTenPricePerformance() ;
        }

        [HttpGet("GetById")]
        public async Task<Car> GetById(int id)
        {
            return await _carService.GetByIdAsync(id);
        }

        [HttpDelete("DeleteById")]
        public async Task Delete(int id)
        {
            await _carService.DeleteAsync(id);
        }

        [HttpGet("GetByBrandId")]
        public async Task<ICollection<Car>> GetByBrandId(int id)
        {
            var makes = await _carService.GetAllByMakeId(id);
            return makes;
        }

        [HttpGet("ForPagination")]
        public async Task<ActionResult> GetCarsPage([FromQuery]int page = 1, [FromQuery]int count = 10)
        {
            var cars = await _carService.GetAllAsync();
            var a = await _carService.GetAllAsyncForPagination(page, count);
            return Ok(new
            {
                TotalCount = cars.Count ,
                Page = page,
                Limit = count,
                Cars = a
            });
        }

        [HttpPost("AddNewCar")]
        public async Task<ActionResult<string>> AddNewCar([FromForm] AddCarDto car, IFormFile video, IFormFile photo)
        {
            string photoUrl = string.Empty;
            string videoUrl = string.Empty;

            try
            {
                if (video != null)
                {
                    using (var videoStream = video.OpenReadStream())
                    {
                        videoUrl = await _cloudinaryService.UploadVideoAsync(videoStream, video.FileName);
                    }
                }

                if (photo != null)
                {
                    using (var photoStream = photo.OpenReadStream())
                    {
                        photoUrl = await _cloudinaryService.UploadImageAsync(photoStream, photo.FileName);
                    }
                }
            }
            catch (Exception ex)
            {
                return ($"Error uploading files: {ex.Message}");
            }

            var newCar = new Car
            {
                Branch = car.Branch,
                Country = car.Country,
                Cylinder = car.Cylinder,
                Damage = car.Damage,
                Description = car.Description,
                Engine = car.Engine,
                FuelType = car.FuelType,
                Key = car.Key,
                MakeId = car.MakeId,
                ModelId = car.ModelId,
                Otometer = car.Otometer,
                Price = car.Price,
                SaleDocument = car.SaleDocument,
                Vin = car.Vin,
                Year = car.Year,
                VideoUrl = videoUrl,
                ImageUrl = photoUrl,
            };

            await _carService.AddAsync(newCar);

            var dtoAdd = new AddCarDto
            {
                Branch = newCar.Branch,
                Country = newCar.Country,
                Cylinder = newCar.Cylinder,
                Damage = newCar.Damage,
                Description = newCar.Description,
                Engine = newCar.Engine,
                FuelType = newCar.FuelType,
                Key = newCar.Key,
                MakeId = newCar.MakeId,
                ModelId = newCar.ModelId,
                Otometer = newCar.Otometer,
                Price = newCar.Price,
                SaleDocument = newCar.SaleDocument,
                Vin = newCar.Vin,
                Year = newCar.Year,
            };

            return Ok(dtoAdd);
        }

        [HttpPut]
        public async Task<ActionResult<string>> Update([FromForm] UpdateCarDto car, IFormFile video, IFormFile photo)
        {

            string photoUrl = string.Empty;
            string videoUrl = string.Empty;

            try
            {
                if (video != null)
                {
                    using (var videoStream = video.OpenReadStream())
                    {
                        videoUrl = await _cloudinaryService.UploadVideoAsync(videoStream, video.FileName);
                    }
                }

                if (photo != null)
                {
                    using (var photoStream = photo.OpenReadStream())
                    {
                        photoUrl = await _cloudinaryService.UploadImageAsync(photoStream, photo.FileName);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("500");
            }

            var updatecar = new Car
            {
                Id = car.Id,
                Branch = car.Branch,
                Country = car.Country,
                Cylinder = car.Cylinder,
                Damage = car.Damage,
                Description = car.Description,
                Engine = car.Engine,
                FuelType = car.FuelType,
                Key = car.Key,
                ImageUrl = photoUrl,
                MakeId = car.MakeId,
                ModelId = car.ModelId,
                Otometer = car.Otometer,
                Price = car.Price,
                SaleDocument = car.SaleDocument,
                VideoUrl = videoUrl,
                Vin = car.Vin,
                Year = car.Year,
            };

            await _carService.UpdateAsync(updatecar);
            var updateCarDto = new UpdateCarDto
            {
                Id = car.Id,
                Branch = updatecar.Branch,
                Country = updatecar.Country,
                Cylinder = updatecar.Cylinder,
                Damage = updatecar.Damage,
                Description = updatecar.Description,
                Engine = updatecar.Engine,
                FuelType = updatecar.FuelType,
                Key = updatecar.Key,
                MakeId = updatecar.MakeId,
                ModelId = updatecar.ModelId,
                Otometer = updatecar.Otometer,
                Price = updatecar.Price,
                SaleDocument = updatecar.SaleDocument,
                Vin = updatecar.Vin,
                Year = updatecar.Year,
            };

            return Ok(updateCarDto);
        }

        //[Authorize]
        [HttpPost]
        [Route("api/upload")]
        public ActionResult Upload(IFormFile file)
        {
            var cloudinary = new Cloudinary(new Account(
                cloud: configuration.GetSection("Cloudinary:CloudName").Value,
                apiKey: configuration.GetSection("Cloudinary:ApiKey").Value,
                apiSecret: configuration.GetSection("Cloudinary:ApiSecret").Value
            ));


            var uploadParams = new AutoUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
            };

            var uploadResult = cloudinary.Upload(uploadParams);

            return Ok(new { uploadResult.Url });
        }
    }
}
