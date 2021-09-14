using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.models;
using WebApi.Validations;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DebugController : ControllerBase
    {
        private Database _database;
        private UserValidation _userValidation;

        public DebugController(Database database, UserValidation userValidation)
        {
            _database = database;
            _userValidation = userValidation;
        }

        [HttpGet]
        [Route("{password}")]
        public List<User> GetUsers(string password)
        {
            if (!password.Equals("1234ETL"))
            {
                throw new Exception("پسورد اشتباه است");
            }

            return _database.Users.Include(a => a.Pipelines)
                .ThenInclude(p => p.Processes).Include(a => a.UserConnections)
                .ToList();
        }

    }
}