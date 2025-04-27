using Auction.Core.Abstract;
using System.ComponentModel.DataAnnotations;

namespace FinalAspReactAuction.Server.Entities
{
    public class Make : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public ICollection<Car>? Cars { get; set; } = new List<Car>();
        public ICollection<Model>? Models { get; set; } = new List<Model>();
    }
}