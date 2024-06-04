using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTracker.Data
{
    public class IncomeRepository
    {
        private readonly string _connectionString;

        public IncomeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Income> GetIncomes()
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            return ctx.Incomes.Include(i=>i.Source).ToList();
        }

        public void AddIncome(Income income)
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.Incomes.Add(income);
            ctx.SaveChanges();
        }

        public decimal GetTotal()
        {
            var ctx = new MaaserTrackerDataContext(_connectionString);
            return ctx.Incomes.Sum(i => i.Amount);
        }
    }
}
