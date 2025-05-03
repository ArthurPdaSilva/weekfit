namespace API.Repositories.WeeklyWorkoutRepository
{
    public interface IWeeklyWorkoutRepository
    {
        public IList<WeeklyWorkout> Get(long userId);
        public void Update(IList<WeeklyWorkout> weeklyWorkouts);
    }
}
