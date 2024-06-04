using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTracker.Data;


namespace ReactMaaserTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private readonly string _connectionString;
        public MaaserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getall")]
        public List<MaaserPayment> GetMaaserPayments()
        {
            var repo = new MaaserRepository(_connectionString);
            return repo.GetMaaserPayments();
        }

        [HttpPost("add")]
        public void AddMaaserPayment(MaaserPayment maaser)
        {
            var repo = new MaaserRepository(_connectionString);
            repo.AddMaaser(maaser);
        }

        [HttpGet("gettotal")]
        public decimal GetTotal()
        {
            var repo = new MaaserRepository(_connectionString);
            return repo.GetTotal();
        }
    }
}
