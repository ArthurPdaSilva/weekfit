
using API.Repositories.WeeklyWorkoutRepository;

namespace API.Repositories.WeeklyWorkoutRepository
{
    public class WeeklyWorkoutRepository : IWeeklyWorkoutRepository
    {
        private readonly ApplicationDbContext _context;

        public WeeklyWorkoutRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Update(IList<WeeklyWorkout> weeklyWorkouts)
        {
            var existingWeeklyWorkouts = _context.WeeklyWorkouts
                .Where(w => w.UserId == weeklyWorkouts[0].UserId)
                .ToList();

            if (existingWeeklyWorkouts.Count > 0)
            {
                _context.WeeklyWorkouts.RemoveRange(existingWeeklyWorkouts);

            }
            _context.WeeklyWorkouts.AddRange(weeklyWorkouts);
            _context.SaveChanges();
        }

        public IList<WeeklyWorkout> Get(long userId)
        {
            var weeklyWorkouts = _context.WeeklyWorkouts
                .Where(w => w.UserId == userId)
                .ToList();
            return weeklyWorkouts;
        }
    }
}
