using Auction.Core.DataAccess;
using FinalAspReactAuction.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.DataAccess.Abstract
{
    public interface ICarDal : IEntityRepository<Car>
    {
    }
}
