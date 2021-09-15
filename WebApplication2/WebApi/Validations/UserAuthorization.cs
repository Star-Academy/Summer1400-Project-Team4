using System;
using System.Linq;
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
                    _database.Users.Find(userId).UserConnections.Any(c => c.ConnectionId == propId),
                UserProp.Dataset =>
                    _database.Users.Find(userId).UserDatasets.Any(c => c.DatasetId == propId),
                _
                    => throw new ArgumentOutOfRangeException(nameof(type), type, null)
            };
        }
    }
}