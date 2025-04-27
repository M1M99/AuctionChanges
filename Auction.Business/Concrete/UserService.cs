using Auction.Business.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Business.Concrete
{
    public class UserService : IUserService
    {
        private readonly IUserService _userService;

        public UserService(IUserService userService)
        {
            _userService = userService;
        }

        public Task AddToFavorites()
        {
            throw new NotImplementedException();
        }

        public Task RemoveFromFavorites()
        {
            throw new NotImplementedException();
        }
    }
}
