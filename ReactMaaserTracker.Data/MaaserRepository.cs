using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTracker.Data
{
    public class MaaserRepository
    {
        private readonly string _connectionString;

        public MaaserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<MaaserPayment> GetMaaserPayments()
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            return ctx.MaaserPayments.ToList();
        }

        public void AddMaaser(MaaserPayment maaserPayment)
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.MaaserPayments.Add(maaserPayment);
            ctx.SaveChanges();
        }

        public decimal GetTotal()
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            return ctx.MaaserPayments.Sum(i => i.Amount);
        }
    }
}
