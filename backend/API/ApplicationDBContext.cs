using Microsoft.EntityFrameworkCore;

namespace API
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<WeeklyWorkout> WeeklyWorkouts { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<WeeklyWorkout>()
                .HasOne(p => p.User)
                .WithMany(u => u.WeeklyWorkouts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}