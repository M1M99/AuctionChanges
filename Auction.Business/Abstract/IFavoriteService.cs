using Auction.Entities.Entities;
using FinalAspReactAuction.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Business.Abstract
{
    public interface IFavoriteService
    {
        Task<Favorite> GetAsync(string userId, int carId);
        Task AddAsync(string userId, int carId);
        Task DeleteAsync(string userId, int carId);
    }
}
