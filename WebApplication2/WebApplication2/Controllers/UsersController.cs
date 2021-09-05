using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.models;

namespace WebApplication2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public List<User> GetUsers()
        {
            return Startup.EtlContext.Users.ToList();
        }

        [HttpGet]
        [Route("/{userId:int}/Pipelines")]
        public List<Pipeline> GetUserPipelines(int userId)
        {
            return Startup.EtlContext.Users.First(u => u.UserId == userId).Pipelines.ToList();
        }

        [HttpPost]
        [Route("/{userId:int}/Pipelines")]
        public IActionResult AddToUserPipelines(int userId, Pipeline pipeline)
        {
            var user = Startup.EtlContext.Users.FirstOrDefault(u => u.UserId == userId);

            if (user != null)
            {
                user.Pipelines ??= new List<Pipeline>();
                var pipelines = user.Pipelines.ToList();
                pipelines.Add(pipeline);
                user.Pipelines = pipelines;
            }
            else
            {
                return BadRequest("no user found with this id");
            }

            Startup.EtlContext.SaveChanges();
            return Ok();
        }
        // [HttpGet]
        // public IEnumerable<WeatherForecast> Get()
        // {
        //     var rng = new Random();
        //     return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //         {
        //             Date = DateTime.Now.AddDays(index),
        //             TemperatureC = rng.Next(-20, 55),
        //             Summary = Summaries[rng.Next(Summaries.Length)]
        //         })
        //         .ToArray();
        // }
    }
}