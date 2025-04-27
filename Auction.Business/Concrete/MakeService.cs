using Auction.Business.Abstract;
using Auction.DataAccess.Abstract;
using FinalAspReactAuction.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Business.Concrete
{
    public class MakeService : IMakeService
    {
        private readonly IMakeDal _makeDal;

        public MakeService(IMakeDal makeDal)
        {
            _makeDal = makeDal;
        }

        public async Task<string> AddAsync(Make make)
        {
            try
            {
                //var a = await _makeDal.Get(a => a.Name.ToLower() == make.Name.ToLower());
              
                //if (a != null)
                //{
                //    return "Already Exist";
                //}

                await _makeDal.Add(make);
                return "Added Successfully";
            }
            catch (Exception ex) {
                return $"{ex.Message}";
            }
        }

        public async Task DeleteAsync(int id)
        {
            var make = await _makeDal.Get(m => m.Id == id);
            await _makeDal.Delete(make);
        }

        public async Task<List<Make>> GetAllAsync()
        {
            return await _makeDal.GetCollection();
        }

        public async Task<Make> GetByIdAsync(int id)
        {
            return await _makeDal.Get(m => m.Id == id);
        }

        public async Task UpdateAsync(Make make)
        {
            await _makeDal.Update(make);
        }
    }
}
