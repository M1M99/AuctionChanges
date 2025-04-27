using Auction.Core.Abstract;
using FinalAspReactAuction.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Entities.Entities
{
    public class Favorite : IEntity
    {
        public int Id { get; set; }

        public int CarId { get; set; }
        public Car Car { get; set; }

        public string UserId { get; set; } 
    }
}
