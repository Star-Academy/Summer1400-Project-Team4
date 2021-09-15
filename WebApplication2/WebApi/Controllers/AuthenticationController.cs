using System;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApi.Authentication;
using WebApi.models;
using WebApi.Validations;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly Database _database;
        private readonly UserDatabaseChecker _databaseChecker;
        private readonly UserValidation _userValidation;

        public UsersController(UserValidation userValidation,
            Database database,
            UserDatabaseChecker databaseChecker)
        {
            _userValidation = userValidation;
            _database = database;
            _databaseChecker = databaseChecker;
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
            Debug.Assert(userObject != null, nameof(userObject) + " != null");
            userObject.IsLoggedIn = true;
            userObject.Token = TokenCreator.GetNewToken(50);
            _database.SaveChanges();
            return Ok(userObject.Token);
        }

        [HttpPost]
        [Route("alter")]
        public IActionResult Alter([FromHeader] string token, User user)
        {
            try
            {
                var userObject = _database.Users.Find(_databaseChecker.IsAlterValid(user, token));
                CopyInto(userObject, user);
            }
            catch (Exception e)
            {
                Unauthorized(e.Message);
            }

            _database.SaveChanges();
            return Ok("Alter successful!");
        }

        [HttpPost]
        [Route("logout")]
        public IActionResult Logout([FromHeader] string token)
        {
            try
            {
                var user = _userValidation.IsUserValid(token);
                user.IsLoggedIn = false;
                user.Token = null;
                _database.SaveChanges();
                return Ok("Logout successful!");
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }
        }

        [HttpGet]
        [Route("UserData")]
        public IActionResult Get([FromHeader] string token)
        {
            try
            {
                var user = _userValidation.IsUserValid(token);
                var mini = new MiniUser(user);
                return Ok(mini);
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }
        }


        private void CopyInto(User to, User from)
        {
            if (!string.IsNullOrEmpty(from.Password)) to.Password = from.Password;
            if (!string.IsNullOrEmpty(from.FullName)) to.FullName = from.FullName;
            if (!string.IsNullOrEmpty(from.Email)) to.Email = from.Email;
            if (!string.IsNullOrEmpty(from.Avatar)) to.Email = from.Avatar;
        }
    }
}