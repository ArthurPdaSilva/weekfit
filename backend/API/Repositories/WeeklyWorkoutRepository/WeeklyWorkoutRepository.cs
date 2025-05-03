namespace API.Repositories.WeeklyWorkoutRepository
{
    public class WeeklyWorkoutRepository : IWeeklyWorkoutRepository
    {
        private readonly ApplicationDbContext _context;

        public WeeklyWorkoutRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public long Create(WeeklyWorkout weeklyWorkout)
        {
            _context.WeeklyWorkouts.Add(weeklyWorkout);
            _context.SaveChanges();
            return weeklyWorkout.Id;
        }

        public void Delete(long id)
        {
            var weeklyWorkout = _context.WeeklyWorkouts.Find(id);
            if (weeklyWorkout != null)
            {
                _context.WeeklyWorkouts.Remove(weeklyWorkout);
                _context.SaveChanges();
            }
        }

        public void Update(WeeklyWorkout weeklyWorkout)
        {
            _context.WeeklyWorkouts.Update(weeklyWorkout);
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
