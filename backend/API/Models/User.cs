public class User
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public virtual ICollection<WeeklyWorkout> WeeklyWorkouts { get; set; }
    public DateTime CreatedAt { get; set; }


    public User()
    {
        WeeklyWorkouts = new HashSet<WeeklyWorkout>();
    }
}
