using FinalAspReactAuction.Server.Entities;

namespace FinalAspReactAuction.Server
{
    public class UpdateModelDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int MakeId { get; set; }
    }
}