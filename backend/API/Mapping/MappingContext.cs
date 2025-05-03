using API.DTOs.User;
using API.DTOs.WeeklyWorkout;
using AutoMapper;

namespace API.Mapping
{
    public class MappingContext : Profile
    {
        public MappingContext()
        {
            CreateMap<UserRegister, User>();
            CreateMap<User, UserSession>();
            CreateMap<WeeklyWorkout, WeeklyWorkoutRow>().ReverseMap();
        }
    }
}
