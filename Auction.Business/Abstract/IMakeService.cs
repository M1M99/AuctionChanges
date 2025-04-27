using FinalAspReactAuction.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Business.Abstract
{
    public interface IMakeService
    {
        Task<List<Make>> GetAllAsync();
        Task<Make> GetByIdAsync(int id);
        Task<string> AddAsync(Make make);
        Task UpdateAsync(Make make);
        Task DeleteAsync(int id);
    }
}
