using FinalAspReactAuction.Server.Dtos.BidDto;
using FinalAspReactAuction.Server.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IHubContext<AuctionHub> _hubContext;

        public AuctionController(IHubContext<AuctionHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost("bid")]
        public async Task<IActionResult> PlaceBid([FromBody] BidDto bid)
        {

            await _hubContext.Clients.All.SendAsync("ReceiveBid", bid.UserName, bid.BidAmount);
            return Ok(new { Message = "SuccessFully Bid" });
        }
    }

  

}
