using API.Migrations;

namespace API.Repositories.WeeklyWorkoutRepository
{
    public interface IWeeklyWorkoutRepository
    {
        public IList<WeeklyWorkout> Get(long userId);
        public long Create(WeeklyWorkout weeklyWorkout);
        public void Delete(long id);
        public void Update(WeeklyWorkout weeklyWorkout);
    }
}
