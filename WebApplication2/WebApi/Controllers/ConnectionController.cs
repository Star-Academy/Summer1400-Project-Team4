using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using WebApi.models;
using WebApi.Validations;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConnectionController : ControllerBase
    {
        private Database _database;
        private UserValidation _userValidation;

        public ConnectionController(Database database, UserValidation userValidation)
        {
            _database = database;
            _userValidation = userValidation;
        }

        [HttpPost]
        public async Task<IActionResult> AddNewConnection([FromBody] Connection connection, [FromHeader] string token)
        {
            if (!ModelState.IsValid) BadRequest();
            if (!connection.TestConnection()) return BadRequest("can't connect to sql server");

            connection.GenerateId();
            await _database.Connections.AddAsync(connection);
            return Ok("connection added successfully");
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteConnection([FromRoute] string connectionId, [FromHeader] string token)
        {
            var connection = _database.Connections.FirstOrDefaultAsync(ci => ci.ConnectionId == connectionId);
            if (connection == null) return BadRequest();
            _database.Connections.Remove(await connection);
            return Ok();
        }

        [HttpGet]
        [Route("{connectionId}")]
        public async Task<ActionResult<Connection>> GetConnection([FromRoute] string connectionId,
            [FromHeader] string token)
        {
            var connection = await _database.Connections.FirstOrDefaultAsync(ci => ci.ConnectionId == connectionId);
            if (connection == null) return BadRequest();
            return Ok(connectionId);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Connection>>> GetAllConnections([FromHeader] string token)
        {
            var user = await _database.Users.FirstAsync(u => u.Token == token);
            var connections = _database.Connections.Where(c => c.UserId == user.Id).ToHashSet();
            return connections;
        }
    }
}