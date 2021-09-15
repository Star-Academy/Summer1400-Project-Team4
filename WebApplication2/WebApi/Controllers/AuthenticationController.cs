using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApi.Authentication;
using WebApi.models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private Database _database;
        private UserDatabaseChecker _databaseChecker;
        private RequestChecker _requestChecker;
        private TokenCreator _tokenCreator;

        public UsersController()
        {
            _tokenCreator = new TokenCreator();
            _database = new Database();
            _databaseChecker = new UserDatabaseChecker(_database);
            _requestChecker = new RequestChecker();
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(User user)
        {
            user.IsLoggedIn = false; 
            if (!_databaseChecker.IsRegisterValid(user))
                return BadRequest("User already exists!");
            user.IsLoggedIn = true;
            user.Token = TokenCreator.GetNewToken(50);
            _database.Users.Add(user);
            _database.SaveChanges();
            return Ok(user.Token);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(User user)
        {
            if (!_databaseChecker.IsLoginValid(user))
                return BadRequest("Unable to login!");
            var userObject = _database.Users.FirstOrDefault(x => x.Username == user.Username);
            userObject.IsLoggedIn = true;
            userObject.Token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            _database.SaveChanges();
            return Ok(userObject.Token);
        }

        [HttpPost]
        [Route("alter")]
        public IActionResult Alter(User user)
        {
            if (!_databaseChecker.IsAlterValid(user))
                return BadRequest("User not logged in or doesn't exist!");
            var userObject = _database.Users.FirstOrDefault(x => x.Username == user.Username);
            CopyInto(userObject, user);
            _database.SaveChanges();
            return Ok("Alter successful!");
        }

        private void CopyInto(User to, User from)
        {
            to.Username = from.Username;
            to.Password = from.Password;
            to.FullName = from.FullName;
            to.Email = from.Email;
            to.Token = from.Token;
        }

        [HttpPost]
        [Route("logout/token/{token}")]
        public IActionResult Logout(string token)
        {
            if (!_databaseChecker.IsLogoutValid(token))
                return BadRequest("User not logged in or doesn't exist!");
            if (!_requestChecker.IsLogoutValid(token))
                return BadRequest("Token Invalid!");
            var user = _database.Users.FirstOrDefault(x => x.Token == token);
            user.IsLoggedIn = false;
            user.Token = null;
            _database.SaveChanges();
            return Ok("Logout successful!");
        }

        [HttpGet]
        [Route("auth/token/{token}")]
        public IActionResult Get(string token)
        {
            if (!_databaseChecker.IsGetValid(token))
                return BadRequest("User not logged in or doesn't exist!");
            if (!_requestChecker.IsGetValid(token))
                return BadRequest("Token Invalid!");
            var user = _database.Users.FirstOrDefault(x => x.Token == token);
            var mini = new MiniUser(user);
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(mini));
        }
    }
}