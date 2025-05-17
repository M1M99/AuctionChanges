using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Entities.Entities
{
    public class Winner
    {
        public int Id { get; set; }
        public string CarId { get; set; }
        public string UserId { get; set; }
    }
}
