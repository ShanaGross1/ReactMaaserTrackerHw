using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTracker.Data;

namespace ReactMaaserTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SourcesController : ControllerBase
    {
        private readonly string _connectionString;
        public SourcesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getall")]
        public List<Source> GetSources()
        {
            var repo = new SourcesRepository(_connectionString);
            return repo.GetSources();
        }

        [HttpPost("add")]
        public void AddSource(Source source)
        {
            var repo = new SourcesRepository(_connectionString);
            repo.AddSource(source);
        }

        [HttpPost("update")]
        public void UpdateSource(Source source)
        {
            var repo = new SourcesRepository(_connectionString);
            repo.UpdateSource(source);
        }

        [HttpPost("delete")]
        public void DeleteSource(Source source)
        {
            var repo = new SourcesRepository(_connectionString);
            repo.DeleteSource(source);
        }
    }
}
