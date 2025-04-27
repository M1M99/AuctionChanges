using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Business.Abstract
{
    public interface IUserService
    {
        Task AddToFavorites();
        Task RemoveFromFavorites();
    }
}
