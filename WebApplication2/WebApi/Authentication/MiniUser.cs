


using WebApi.models;

namespace WebApi.Authentication
{
    public class MiniUser
    {
        public string Username;
        public string FullName;
        public string Email;

        public MiniUser(User user)
        {
            Username = user.Username;
            FullName = user.FullName;
            Email = user.Email;
        }
    }
}