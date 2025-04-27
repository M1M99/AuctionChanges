using FinalAspReactAuction.Server.Entities;

namespace FinalAspReactAuction.Server.Dtos.AccountDto
{
    public class LoginDto
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool RememberMe { get;  set; }
    }
}
