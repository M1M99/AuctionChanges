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
    }
}