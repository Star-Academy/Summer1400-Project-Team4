using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApi.Authentication;
using WebApi.models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatasetsController : ControllerBase
    {
        private Database _database;

        public DatasetsController()
        {
            _database = new Database();
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create(Dataset dataset)
        {
            throw new NotImplementedException();
        }
        
        [HttpPost]
        [Route("upload")]
        public IActionResult Upload(Dataset dataset)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult ChangeName(int id, string newName)
        {
            var dataset = _database.Datasets.FirstOrDefault(x => x.DatasetId == id);
            if (dataset == null)
                return BadRequest("No such id");
            dataset.DatasetName = newName;
            _database.SaveChanges();
            return Ok("Name Changed.");
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            var dataset = _database.Datasets.FirstOrDefault(x => x.DatasetId == id);
            if (dataset == null)
                return BadRequest("No such id");
            _database.Datasets.Remove(dataset);
            _database.SaveChanges();
            return Ok("Deleted.");
        }

        [HttpPost]
        [Route("{id}/like")]
        public IActionResult Like(int id)
        {
            var dataset = _database.Datasets.FirstOrDefault(x => x.DatasetId == id);
            if (dataset == null)
                return BadRequest("No such id");
            dataset.IsLiked = true;
            _database.SaveChanges();
            return Ok("Liked");
        }
        
        [HttpPost]
        [Route("{id}/dislike")]
        public IActionResult DisLike(int id)
        {
            var dataset = _database.Datasets.FirstOrDefault(x => x.DatasetId == id);
            if (dataset == null)
                return BadRequest("No such id");
            dataset.IsLiked = false;
            _database.SaveChanges();
            return Ok("DisLiked");
        }

        [HttpGet]
        [Route("{token}")]
        public IActionResult Get(string token)
        {
            var user = _database.Users.FirstOrDefault(x => x.Token == token);
            if (user == null)
                return Unauthorized("Invalid token.");
            var datasets = _database.Datasets.Where(x => x.OwnerId == user.Id).ToList();
            return Ok(datasets);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetDataset(int id)
        {
            var dataset = _database.Datasets.FirstOrDefault(x => x.DatasetId == id);
            if (dataset == null)
                return BadRequest("No such id");
            return Ok(dataset);
        }

        [HttpPost]
        [Route("{id}/preview")]
        public IActionResult Preview(int id)
        {
            throw new NotImplementedException();
        }
    }
}