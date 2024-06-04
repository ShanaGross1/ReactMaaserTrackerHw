using Microsoft.EntityFrameworkCore;

namespace ReactMaaserTracker.Data;

public class MaaserTrackerDataContext : DbContext
{
    private readonly string _connectionString;

    public MaaserTrackerDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    public DbSet<MaaserPayment> MaaserPayments { get; set; }
    public DbSet<Income> Incomes { get; set; }
    public DbSet<Source> Sources { get; set; }
}