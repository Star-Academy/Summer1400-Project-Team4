using Microsoft.EntityFrameworkCore;
using WebApplication2.models;

namespace WebApplication2.Database
{
    public class EtlContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Pipeline> Pipelines { get; set; }
        public DbSet<Dataset> Datasets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Data Source=localhost\SQLExpress,1433;Database=ETL;Integrated Security=sspi;");
        }
    }
}