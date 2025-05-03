using API.Models;

namespace API.DTOs.WeeklyWorkout
{
    public class WeeklyWorkoutRow
    {
        public long Id { get; set; }
        public int Position { get; set; }
        public GymOptions Sunday { get; set; }
        public GymOptions Monday { get; set; }
        public GymOptions Tuesday { get; set; }
        public GymOptions Wednesday { get; set; }
        public GymOptions Thursday { get; set; }
        public GymOptions Friday { get; set; }
        public GymOptions Saturday { get; set; }
        public long UserId { get; set; }
    }
}
