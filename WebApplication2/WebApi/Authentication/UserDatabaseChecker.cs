using System;
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
            return userObj.Password == user.Password;
        }

        public long IsAlterValid(User user, string token)
        {
            var userObj = _database.Users.FirstOrDefault(x => x.Username == user.Username && x.Token == token);
            if (userObj == null) throw new Exception("invalid data");
            return userObj.Id; 
        }
        

        public bool IsGetValid(string token)
        {
            var userObj = _database.Users.FirstOrDefault(x => x.Token == token);
            return userObj != null && userObj.IsLoggedIn;
        }
    }
}