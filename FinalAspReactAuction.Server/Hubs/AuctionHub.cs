using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace FinalAspReactAuction.Server.SignalR
{
    public class AuctionHub : Hub
    {
        private readonly UserManager<CustomIdentityUser> _userManager;
        public AuctionHub(UserManager<CustomIdentityUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task SendBid(string bidAmount)
        {
            var user = await _userManager.GetUserAsync(Context.User);

            if (user == null)
            {
                await Clients.All.SendAsync("Error", "Invalid User");
                return;
            }

            await Clients.All.SendAsync("ReceiveBid", user.UserName, bidAmount);
        }
        public async Task PlaceBid(string bidder, decimal bidAmount)
        {
            // Logic for handling the bid
            // For example, update the auction, notify other clients, etc.

            // Notify other clients that a new bid was placed
            await Clients.All.SendAsync("ReceiveBid", bidder, bidAmount);
        }
    }
}