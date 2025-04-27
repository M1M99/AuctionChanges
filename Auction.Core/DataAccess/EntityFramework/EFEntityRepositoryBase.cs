using Auction.Core.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Auction.Core.DataAccess.EntityFramework
{
    public class EFEntityRepositoryBase<TEntity, TContext> :
        IEntityRepository<TEntity>
        where TEntity : class, IEntity, new()
        where TContext : DbContext

    {
        private readonly TContext _context;

        public EFEntityRepositoryBase(TContext context)
        {
            _context = context;
        }

        public async Task Add(TEntity entity)
        {
            var addEntity = _context.Entry(entity);
            addEntity.State = EntityState.Added;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(TEntity entity)
        {
            var deleteEntity = _context.Entry(entity);
            deleteEntity.State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
        public async Task Update(TEntity entity)
        {
            var updateEntity = _context.Entry(entity);
            updateEntity.State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<TEntity> Get(Expression<Func<TEntity, bool>> filter)
        {
            return await _context.Set<TEntity>().FirstOrDefaultAsync(filter);
        }

        public async Task<List<TEntity>> GetCollection(Expression<Func<TEntity, bool>> filter = null)
        {
            if (filter is null)
            {
                return await _context.Set<TEntity>().ToListAsync();
            }
            return await _context.Set<TEntity>().Where(filter).ToListAsync();
        }

    }
}
