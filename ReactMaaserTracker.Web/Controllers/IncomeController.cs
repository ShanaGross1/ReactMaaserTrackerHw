using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTracker.Data;

namespace ReactMaaserTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly string _connectionString;
        public IncomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getall")]
        public List<Income> GetIncomes()
        {
            var repo = new IncomeRepository(_connectionString);
            return repo.GetIncomes();
        }

        [HttpPost("add")]
        public void AddIncome(Income income)
        {
            var repo = new IncomeRepository(_connectionString);
            repo.AddIncome(income);
        }

        [HttpGet("gettotal")]
        public decimal GetTotal()
        {
            var repo = new IncomeRepository(_connectionString);
            return repo.GetTotal();
        }
    }
}
