using FinalAspReactAuction.Server.Entities;

namespace FinalAspReactAuction.Server.Dtos.ModelDto
{
    //public class AddModelDto
    //{
    //    public string Name { get; set; }
    //    public string Type { get; set; }
    //    public Make Make { get; set; }
    //}

    public class AddModelDto
    {
        public int MakeId { get; set; } 
        public string Name { get; set; }
        public string Type { get; set; }
    }

}
