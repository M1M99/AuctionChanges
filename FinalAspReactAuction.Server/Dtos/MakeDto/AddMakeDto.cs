using System.ComponentModel.DataAnnotations;

namespace FinalAspReactAuction.Server.Dtos.MakeDto
{
    public class AddMakeDto
    {
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}