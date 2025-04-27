using Auction.Core.DataAccess.EntityFramework;
using Auction.DataAccess.Abstract;
using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.DataAccess.Concrete.EntityFramework
{
    public class EfUserDal : EFEntityRepositoryBase<CustomIdentityUser, ApplicationDbContext>, IUserDal
    {
        public EfUserDal(ApplicationDbContext context) : base(context)
        {
        }
    }
}
