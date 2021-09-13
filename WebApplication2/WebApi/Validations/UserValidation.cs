using System.Linq;
using WebApi.models;

namespace WebApi.Validations
{
    public class UserValidation
    {
        private readonly Database _database;

        public UserValidation(Database database)
        {
            _database = database;
        }

        public bool IsUserValid(string token, int userId)
        {
            var numberOfMatches = _database.Users.Count(u => u.Token == token);
            return numberOfMatches == 1;
        }
    }
}