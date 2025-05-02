namespace API.Repositories.UserRepository
{
    public interface IUserRepository
    {
        public void Create(User user);
        public void Update(User user);
        public User? GetUserByEmail(string email);
        public User? GetUserById(long id);
        public IList<User> GetUsers(string user);
    }
}
