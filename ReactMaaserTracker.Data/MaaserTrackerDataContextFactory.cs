using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTracker.Data;

public class MaaserTrackerDataContextFactory : IDesignTimeDbContextFactory<MaaserTrackerDataContext>
{
    public MaaserTrackerDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}ReactMaaserTracker.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new MaaserTrackerDataContext(config.GetConnectionString("ConStr"));
    }
}