using Auction.Business.Abstract;
using Auction.DataAccess.Abstract;
using FinalAspReactAuction.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Business.Concrete
{
    public class ModelService : IModelService
    {
        private readonly IModelDal _modelDal;

        public ModelService(IModelDal modelDal)
        {
            _modelDal = modelDal;
        }

        public async Task AddAsync(Model model)
        {
            await _modelDal.Add(model);
        }

        public async Task DeleteAsync(int id)
        {
            var model = await _modelDal.Get(mod => mod.Id == id);
            await _modelDal.Delete(model);
        }

        public async Task<List<Model>> GetAllAsync()
        {
            return await _modelDal.GetCollection();
        }

        public async Task<Model> GetByIdAsync(int id)
        {
            return await _modelDal.Get(mod => mod.Id == id);
        }

        public async Task<List<Model>> GetModelsByMakeId(int makeId)
        {
            var models = await _modelDal.GetCollection(mod => mod.Make.Id == makeId);
            return models;
        }

        public async Task UpdateAsync(Model model)
        {
            await _modelDal.Update(model);
        }
    }
}
