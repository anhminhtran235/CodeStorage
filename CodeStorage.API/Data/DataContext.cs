using CodeStorage.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeStorage.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){} 

        public DbSet<User> Users { get; set; }
        public DbSet<Document> Documents { get; set; }
    }
}