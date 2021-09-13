

using WebApi.models;

namespace WebApi.Authentication
{
    public class RequestChecker
    {
        public bool IsRegisterValid(User user)
        {
            if (string.IsNullOrEmpty(user.Username) ||
                string.IsNullOrEmpty(user.Password) ||
                string.IsNullOrEmpty(user.FullName) ||
                string.IsNullOrEmpty(user.Email) ||
                !string.IsNullOrEmpty(user.Token) ||
                user.IsLoggedIn ||
                user.Id != 0)
                return false;
            return true;
        }

        public bool IsLoginValid(User user)
        {
            if (string.IsNullOrEmpty(user.Username) ||
                string.IsNullOrEmpty(user.Password) ||
                !string.IsNullOrEmpty(user.FullName) ||
                !string.IsNullOrEmpty(user.Email) ||
                !string.IsNullOrEmpty(user.Token) ||
                user.IsLoggedIn ||
                user.Id != 0)
                return false;
            return true;
        }
        
        public bool IsAlterValid(User user)
        {
            if (string.IsNullOrEmpty(user.Username) ||
                string.IsNullOrEmpty(user.Password) ||
                string.IsNullOrEmpty(user.Token) ||
                string.IsNullOrEmpty(user.FullName) ||
                string.IsNullOrEmpty(user.Email) ||
                user.Id != 0)
                return false;
            return true;
        }
        
        public bool IsLogoutValid(string token)
        {
            return !string.IsNullOrEmpty(token);
        }
        
        public bool IsGetValid(string token)
        {
            return !string.IsNullOrEmpty(token);
        }
    }
}