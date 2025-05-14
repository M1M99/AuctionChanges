using Auction.Entities.Entities;
using FinalAspReactAuction.Server.Data;
using FinalAspReactAuction.Server.SignalR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionApp.Controllers
{
    [Route("api/vehicle")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IHubContext<AuctionHub> _hubContext;
        private readonly ApplicationDbContext applicationDbContext;

        public VehicleController(IHubContext<AuctionHub> hubContext, ApplicationDbContext applicationDbContext)
        {
            _hubContext = hubContext;
            this.applicationDbContext = applicationDbContext;
        }

        // GET: api/vehicle/{id}
        [HttpGet("{id}")]
        public ActionResult<Vehicle> GetVehicle(int id)
        {
            var vehicle = applicationDbContext.Vehicles.FirstOrDefault(v => v.Id == id);
            if (vehicle == null)
            {
                return NotFound();
            }
            return Ok(vehicle);
        }

        // POST: api/vehicle/placeBid
        [HttpPost("placeBid")]
        public async Task<ActionResult> PlaceBid([FromBody] BidRequest bidRequest)
        {
            var vehicle = applicationDbContext.Vehicles.FirstOrDefault(v => v.Id == bidRequest.VehicleId);
            if (vehicle == null)
            {
                return NotFound("Vehicle not found.");
            }

            if (bidRequest.Amount <= vehicle.CurrentBid)
            {
                return BadRequest("Bid must be higher than the current bid.");
            }

            vehicle.CurrentBid = bidRequest.Amount;

            // Notify all clients that a new bid has been placed
            await _hubContext.Clients.All.SendAsync("ReceiveBid", "Bidder", vehicle.CurrentBid);

            return Ok(new { CurrentBid = vehicle.CurrentBid });
        }

        // PUT: api/vehicle/updateAuctionTime
        [HttpPut("updateAuctionTime/{id}")]
        public ActionResult UpdateAuctionTime(int id, [FromBody] int newTimeRemaining)
        {
            var vehicle = applicationDbContext.Vehicles.FirstOrDefault(v => v.Id == id);
            if (vehicle == null)
            {
                return NotFound();
            }

            vehicle.TimeRemaining = newTimeRemaining;
            return Ok(new { vehicle.Id, vehicle.TimeRemaining });
        }
    }

    // Example models for auction
    public class BidRequest
    {
        public int VehicleId { get; set; }
        public decimal Amount { get; set; }
    }
}
