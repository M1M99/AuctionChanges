using FinalAspReactAuction.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Business.Abstract
{
    public interface IModelService
    {
        Task<List<Model>> GetAllAsync();
        Task<List<Model>> GetModelsByMakeId(int makeId);
        Task<Model> GetByIdAsync(int id);
        Task AddAsync(Model model);
        Task UpdateAsync(Model model);
        Task DeleteAsync(int id);
    }
}
