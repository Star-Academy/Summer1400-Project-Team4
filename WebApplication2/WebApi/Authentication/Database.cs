
using Microsoft.EntityFrameworkCore;

namespace WebApi.Authentication
{
    public class Database : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Connection> Connections { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost; Database=Auth; Trusted_Connection=True;");
        }
    }
}