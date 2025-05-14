//using FinalAspReactAuction.Server.Dtos.BidDto;
//using FinalAspReactAuction.Server.SignalR;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.SignalR;

//namespace FinalAspReactAuction.Server.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuctionController : ControllerBase
//    {
//        private readonly IHubContext<AuctionHub> _hubContext;

//        public AuctionController(IHubContext<AuctionHub> hubContext)
//        {
//            _hubContext = hubContext;
//        }

//        [HttpPost("bid")]
//        public async Task<IActionResult> PlaceBid([FromBody] BidDto bid)
//        {

//            await _hubContext.Clients.All.SendAsync("ReceiveBid", bid.UserName, bid.BidAmount);
//            return Ok(new { Message = "SuccessFully Bid" });
//        }
//    }



//}
using Auction.Entities.Entities;
using FinalAspReactAuction.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuctionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Açık artırmayı başlat (POST)
        [HttpPost("start")]
        public async Task<IActionResult> StartAuction([FromBody] Vehicle vehicle)
        {
            if (vehicle == null)
                return BadRequest("Vehicle is required to start the auction.");

            // Araç verisini veritabanına kaydet (Örneğin: Auction başlatma işlemi)
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVehicle), new { id = vehicle.Id }, vehicle);
        }

        // 2. Teklif ekleme (POST)
        [HttpPost("placebid")]
        public async Task<IActionResult> PlaceBid([FromBody] Bid bid)
        {
            if (bid == null || bid.Amount <= 0)
                return BadRequest("Invalid bid amount.");

            var vehicle = await _context.Vehicles.FindAsync(bid.VehicleId);
            if (vehicle == null)
                return NotFound("Vehicle not found.");

            if (bid.Amount <= vehicle.CurrentBid)
                return BadRequest("Bid must be higher than the current bid.");

            // Yeni teklifi kaydet
            _context.Bids.Add(bid);
            vehicle.CurrentBid = bid.Amount; // Teklif güncelleniyor
            await _context.SaveChangesAsync();

            return Ok(new { message = "Bid placed successfully.", bid });
        }

        // 3. Teklif geçmişini alma (GET)
        [HttpGet("bidhistory/{vehicleId}")]
        public async Task<IActionResult> GetBidHistory(int vehicleId)
        {
            var vehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (vehicle == null)
                return NotFound("Vehicle not found.");

            var bidHistory = await _context.Bids
                .Where(b => b.VehicleId == vehicleId)
                .OrderByDescending(b => b.Timestamp)
                .ToListAsync();

            return Ok(bidHistory);
        }

        // 4. Açık artırmayı bitirme (POST)
        [HttpPost("end")]
        public async Task<IActionResult> EndAuction([FromBody] int vehicleId)
        {
            var vehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (vehicle == null)
                return NotFound("Vehicle not found.");

            // Açık artırmayı bitir (işlem bitişi, güncelleme vs.)
            vehicle.TimeRemaining = 0; // Açık artırma süresini bitir
            await _context.SaveChangesAsync();

            return Ok(new { message = "Auction ended successfully.", vehicle });
        }

        // 5. Araç bilgilerini alma (GET)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
                return NotFound("Vehicle not found.");

            return Ok(vehicle);
        }
    }

    // Teklif (Bid) Modeli

}
