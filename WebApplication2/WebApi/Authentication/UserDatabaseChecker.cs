using System.Linq;
using WebApi.models;

namespace WebApi.Authentication
{
    public class UserDatabaseChecker
    {
        private Database _database;

        public UserDatabaseChecker(Database database)
        {
            _database = database;
        }

        public bool IsRegisterValid(User user)
        {
            var userObj = _database.Users.FirstOrDefault(x => x.Username == user.Username);
            return userObj == null;
        }

        public bool IsLoginValid(User user)
        {
            var userObj = _database.Users.FirstOrDefault(x => x.Username == user.Username);
            if (userObj == null)
                return false;
            if (userObj.IsLoggedIn)
                return false;
            return userObj.Password == user.Password;
        }

        public bool IsAlterValid(User user)
        {
            var userObj = _database.Users.FirstOrDefault(x => x.Username == user.Username);
            if (userObj == null)
                return false;
            if (!userObj.IsLoggedIn)
                return false;
            string token = _database.Users.FirstOrDefault(x => x.Username == user.Username)?.Token;
            return userObj.Token == token;
        }
        
        public bool IsLogoutValid(string token)
        {
            var userObj = _database.Users.FirstOrDefault(x => x.Token == token);
            return userObj != null && userObj.IsLoggedIn;
        }
        
        public bool IsGetValid(string token)
        {
            var userObj = _database.Users.FirstOrDefault(x => x.Token == token);
            return userObj != null && userObj.IsLoggedIn;
        }
    }
}