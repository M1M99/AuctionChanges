using Auction.Core.DataAccess;
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
    public class EfMakeDal : EFEntityRepositoryBase<Make, ApplicationDbContext>, IMakeDal
    {
        public EfMakeDal(ApplicationDbContext context) : base(context)
        {
        }
    }
}
