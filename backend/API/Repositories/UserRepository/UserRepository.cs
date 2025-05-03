
namespace API.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public User? GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email == email);
        }

        public User? GetUserById(long id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }

        public IList<User> GetUsers(string user)
        {
            return _context.Users.Where(x => x.Name.Contains(user) || x.Email.Contains(user)).ToList();
        }
    }
}
