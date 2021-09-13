
using Microsoft.EntityFrameworkCore;
using WebApi.models;

namespace WebApi.Authentication
{
    public class Database : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<Dataset> Datasets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost; Database=Auth; Trusted_Connection=True;");
        }
    }
}