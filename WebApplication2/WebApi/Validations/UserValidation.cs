using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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

        public User IsUserValid(string token)
        {
            var user = _database.Users.Include(u => u.UserDatasets).
                Include(u => u.UserConnections).
                FirstOrDefault(u => u.Token == token);
            if (user == null) throw new Exception("invalid info");
            return user;
        }
    }
}