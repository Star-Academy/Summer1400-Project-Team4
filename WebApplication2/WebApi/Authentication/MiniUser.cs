using WebApi.models;

namespace WebApi.Authentication
{
    public class MiniUser
    {
        public string Username { get; }
        public string FullName { get; }
        public string Email { get; }
        public string Avatar { get; }

        public MiniUser(User user)
        {
            Username = user.Username;
            FullName = user.FullName;
            Email = user.Email;
            Avatar = user.Avatar;
        }
    }
}