using API.DTOs.User;
using AutoMapper;

namespace API.Mapping
{
    public class MappingContext : Profile
    {
        public MappingContext()
        {
            CreateMap<UserRegister, User>();
            CreateMap<User, UserSession>();
        }
    }
}
