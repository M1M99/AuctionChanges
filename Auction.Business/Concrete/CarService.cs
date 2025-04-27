using Auction.Business.Abstract;
using Auction.DataAccess.Abstract;
using FinalAspReactAuction.Server.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Business.Concrete
{
    public class CarService : ICarService
    {
        private readonly ICarDal _carAccess;

        public CarService(ICarDal carAccess)
        {
            _carAccess = carAccess;
        }

        public async Task AddAsync(Car car)
        {
            await _carAccess.Add(car);
        }

        public async Task DeleteAsync(int id)
        {
            var car = await _carAccess.Get(c => c.Id == id);
            await _carAccess.Delete(car);
        }

        public async Task<List<Car>> Filter(Expression<Func<Car, bool>> filter)
        {
            return await _carAccess.GetCollection(filter);
        }

        public async Task<List<Car>> GetAllAsync()
        {
            return await _carAccess.GetCollection();
        }

        public async Task<List<Car>> GetAllAsyncForPagination(int page, int count)
        {
            var cars = await _carAccess.GetCollection();
            return cars.Skip((page - 1) * count).Take(count).ToList();
        }

        public async Task<List<Car>> GetAllByMakeId(int makeId)
        {
            return await _carAccess.GetCollection(c => c.MakeId == makeId);
        }

        public async Task<List<Car>> GetAllByModelId(int modelId)
        {
            return await _carAccess.GetCollection(c => c.ModelId == modelId);
        }

        public async Task<Car> GetByIdAsync(int id)
        {
            return await _carAccess.Get(c => c.Id == id);
        }

        public async Task UpdateAsync(Car car)
        {
            var result = await _carAccess.Get(car1 => car1.Id == car.Id);
            if (result != null)
            {
                result.Branch = car.Branch;
                result.Country = car.Country;
                result.Cylinder = car.Cylinder;
                result.Damage = car.Damage;
                result.Description = car.Description;
                result.Engine = car.Engine;
                result.FuelType = car.FuelType;
                result.ImageUrl = car.ImageUrl;
                result.Id = car.Id;
                result.Key = car.Key;
                result.MakeId = car.MakeId;
                result.ModelId = car.ModelId;
                result.Otometer = car.Otometer;
                result.Price = car.Price;
                result.SaleDocument = car.SaleDocument;
                result.VideoUrl = car.VideoUrl;
                result.Vin = car.Vin;
                result.Year = car.Year;
                await _carAccess.Update(result);
            }
        }

        public async Task<List<Car>> GetTopTenPricePerformance()
        {
            var cars = await _carAccess.GetCollection();
            var bestPricePerformanceCar = cars
            .OrderBy(x => x.Price / x.Year) //can add hp
            .Take(10).ToList();
            return bestPricePerformanceCar;
        }
    }
}
