using API.DTOs.User;
using API.DTOs.WeeklyWorkout;
using API.Models;

namespace API.Services.WeeklyWorkoutService
{
    public interface IWeeklyWorkoutService
    {
        public OperationResult<IList<WeeklyWorkoutRow>> Get(long userId);
        public OperationResult<long> Post(WeeklyWorkoutRow weeklyWorkoutRow);
        public OperationResult<string> Put(WeeklyWorkoutRow weeklyWorkoutRow);
        public OperationResult<string> Delete(long userId);
    }
}
