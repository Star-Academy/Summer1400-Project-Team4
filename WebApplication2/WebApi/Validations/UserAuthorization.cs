using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebApi.models;

namespace WebApi.Validations
{
    public class UserAuthorization
    {
        private readonly Database _database;

        public UserAuthorization(Database database)
        {
            _database = database;
        }

        public bool DoesBelongToUser(long userId, int propId, UserProp type)
        {
            return type switch
            {
                UserProp.Connection =>
                    _database.Users.Include(u => u.UserConnections).First(u => userId == u.Id).UserConnections.Any(c => c.ConnectionId == propId),
                UserProp.Dataset => 
                    _database.Users.Include(u => u.UserConnections).First(u => userId == u.Id).UserDatasets.Any(c => c.DatasetId == propId),
                _
                    => throw new ArgumentOutOfRangeException(nameof(type), type, null)
            };
        }
    }
}