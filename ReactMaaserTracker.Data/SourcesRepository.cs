using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTracker.Data
{
    public class SourcesRepository
    {
        private readonly string _connectionString;
        public SourcesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Source> GetSources()
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            return ctx.Sources.ToList();
        }

        public void AddSource(Source source)
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.Sources.Add(source);
            ctx.SaveChanges();
        }

        public void UpdateSource(Source source)
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.Sources.Update(source);
            ctx.SaveChanges();
        }

        public void DeleteSource(Source source)
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.Sources.Remove(source);
            ctx.Incomes.RemoveRange(ctx.Incomes.Where(i => i.Source.Id == source.Id));
            ctx.SaveChanges();
        }
    }
}
