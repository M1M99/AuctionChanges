using Auction.Business.Abstract;
using Auction.DataAccess.Abstract;
using Auction.Entities.Entities;
using FinalAspReactAuction.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

public class FavoriteService : IFavoriteService
{
    private readonly IFavoriteDal _favoriteDal;
    private readonly ApplicationDbContext dbContext;

    public FavoriteService(IFavoriteDal favoriteDal, ApplicationDbContext dbContext)
    {
        _favoriteDal = favoriteDal;
        this.dbContext = dbContext;
    }

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

    public async Task DeleteAsync(string userId, int carId)
    {
        var existingFavorite = await _favoriteDal.Get(f => f.UserId == userId && f.CarId == carId);

        if (existingFavorite == null)
        {
            throw new InvalidOperationException("This car is not in your favorites.");
        }

      

        await _favoriteDal.Delete(existingFavorite);
    }
    
    public async Task<Favorite> GetAsync(string userId, int carId)
    {
        return await dbContext.Favorites.FirstOrDefaultAsync(a => a.CarId == carId && a.UserId == userId);
    }
}
