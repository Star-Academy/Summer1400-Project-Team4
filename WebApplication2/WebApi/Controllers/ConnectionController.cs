using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.models;
using WebApi.Validations;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConnectionController : ControllerBase
    {
        private readonly Database _database;
        private readonly UserValidation _userValidation;
        private readonly UserAuthorization _authorizationChecker;

        public ConnectionController(Database database, UserValidation userValidation,
            UserAuthorization authorizationChecker)
        {
            _database = database;
            _userValidation = userValidation;
            _authorizationChecker = authorizationChecker;
        }

        [HttpPost]
        public async Task<IActionResult> AddNewConnection([FromBody] Connection connection, [FromHeader] string token)
        {
            try
            {
                var user = _userValidation.IsUserValid(token);
               // if (!connection.TestConnection())   return BadRequest("can't connect to sql server");
                user.UserConnections.Add(connection);
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }


            await _database.SaveChangesAsync();
            return Ok("connection added successfully");
        }


        [HttpDelete]
        [Route("{connectionId:int}")]
        public async Task<IActionResult> DeleteConnection([FromRoute] int connectionId, [FromHeader] string token)
        {
            try
            {
                var user = _userValidation.IsUserValid(token);
                if (!_authorizationChecker.DoesBelongToUser(user.Id, connectionId, UserProp.Connection))
                {
                    return Unauthorized();
                }
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }

            var connection = await _database.Connections.FindAsync(connectionId);
            _database.Remove(connection);
            await _database.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        [Route("{connectionId:int}")]
        public async Task<ActionResult<Connection>> GetConnection([FromRoute] int connectionId,
            [FromHeader] string token)
        {
            try
            {
                var user = _userValidation.IsUserValid(token);
                if (!_authorizationChecker.DoesBelongToUser(user.Id, connectionId, UserProp.Connection))
                {
                    return Unauthorized();
                }
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }

            var connection = await _database.Connections.FindAsync(connectionId);
            return Ok(connection);
        }

        [HttpGet]
        public  IActionResult GetAllConnections([FromHeader] string token)
        {
            try
            {
                var user = _userValidation.IsUserValid(token);
                return Ok(user.UserConnections);
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }
        }
    }
}