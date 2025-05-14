using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Entities.Entities
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal CurrentBid { get; set; }
        public decimal BidIncrement { get; set; }
        public decimal BuyNowPrice { get; set; }
        public decimal? ReservePrice { get; set; }
        public int TimeRemaining { get; set; } 
        public List<string> Images { get; set; }
    }

}
