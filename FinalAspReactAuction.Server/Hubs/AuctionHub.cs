using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
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
       
            await Clients.All.SendAsync("ReceiveBid", bidder, bidAmount);
        }
    }
}

//using FinalAspReactAuction.Server.Entities;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.SignalR;
//using System.Threading.Tasks;
//using System.Collections.Concurrent;

//namespace FinalAspReactAuction.Server.SignalR
//{
//    public class AuctionHub : Hub
//    {
//        private readonly UserManager<CustomIdentityUser> _userManager;
//        private static readonly ConcurrentDictionary<string, DateTime> _auctionEndTimes = new();

//        public AuctionHub(UserManager<CustomIdentityUser> userManager)
//        {
//            _userManager = userManager;
//        }

//        public async Task JoinAuction(string auctionId)
//        {
//            await Groups.AddToGroupAsync(Context.ConnectionId, auctionId);

//            if (_auctionEndTimes.TryGetValue(auctionId, out DateTime endTime))
//            {
//                int remainingSeconds = (int)Math.Max(0, (endTime - DateTime.UtcNow).TotalSeconds);
//                await Clients.Caller.SendAsync("SyncTimer", remainingSeconds);
//            }
//        }

//        public async Task StartAuction(string auctionId, int durationInSeconds)
//        {
//            var endTime = DateTime.UtcNow.AddSeconds(durationInSeconds);
//            _auctionEndTimes.AddOrUpdate(auctionId, endTime, (_, __) => endTime);

//            await Clients.Group(auctionId).SendAsync("AuctionStarted", durationInSeconds);

//            // Start timer updates
//            _ = UpdateTimer(auctionId, durationInSeconds);
//        }

//        private async Task UpdateTimer(string auctionId, int duration)
//        {
//            var endTime = DateTime.UtcNow.AddSeconds(duration);

//            while (DateTime.UtcNow < endTime)
//            {
//                int remainingSeconds = (int)Math.Max(0, (endTime - DateTime.UtcNow).TotalSeconds);
//                await Clients.Group(auctionId).SendAsync("TimerUpdate", remainingSeconds);
//                await Task.Delay(1000);
//            }

//            await Clients.Group(auctionId).SendAsync("AuctionEnded");
//            _auctionEndTimes.TryRemove(auctionId, out _);
//        }

//        public async Task PlaceBid(string bidder, decimal bidAmount, string bidderId, string auctionId)
//        {
//            await Clients.Group(auctionId).SendAsync("ReceiveBid", bidder, bidAmount, bidderId, auctionId);
//        }

//        public override async Task OnDisconnectedAsync(Exception exception)
//        {
//            await base.OnDisconnectedAsync(exception);
//        }
//    }
//}