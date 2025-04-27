using Auction.DataAccess.Abstract;
using Auction.Entities.Entities;
using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteDal _favoriteDal;

        public FavoriteController(IFavoriteDal favoriteDal)
        {
            _favoriteDal = favoriteDal;
        }
        [HttpPost]
        public async Task AddAsync(string userId, int carId)
        {
            var existingFavorite = await _favoriteDal.Get(f => f.UserId == userId && f.CarId == carId);

            if (existingFavorite != null)
            {
                throw new InvalidOperationException("This car is already in your favorites.");
            }

            var favorite = new Favorite
            {
                CarId = carId,
                UserId = userId
            };
            await _favoriteDal.Add(favorite);
        }
        [HttpDelete]
        public async Task DeleteAsync(string userId, int carId)
        {
            var existingFavorite = await _favoriteDal.Get(f => f.UserId == userId && f.CarId == carId);

            if (existingFavorite == null)
            {
                throw new InvalidOperationException("This car is not in your favorites.");
            }

            await _favoriteDal.Delete(existingFavorite);
        }
        [HttpGet]
        public async Task<Favorite> GetAsync(string userId, int carId)
        {
            return await _favoriteDal.Get(a => a.UserId == userId && a.CarId == carId);
        }
    }
}
