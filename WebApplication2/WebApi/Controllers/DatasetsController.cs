
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.models;
using WebApi.Services;
using WebApi.Validations;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatasetsController : ControllerBase
    {
        private readonly Database _database;
        private readonly UserValidation _userValidator;
        private readonly UserAuthorization _authorizationValidator;

        public DatasetsController(Database database, UserAuthorization authorizationValidator,
            UserValidation userValidator)
        {
            _database = database;
            _authorizationValidator = authorizationValidator;
            _userValidator = userValidator;
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody]CsvProp data)
        {
            var loader = new CsvLoader(data);
            if (loader.TransportCsvToSql()) return Ok();
            return BadRequest();
        }

        [HttpPost]
        [Route("upload")]
        public IActionResult Upload(Dataset dataset)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        [Route("{id:int}")]
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
        [Route("{id:int}")]
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
        [Route("{id:int}/like")]
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
        [Route("{id:int}/dislike")]
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
        public IActionResult Get([FromHeader] string token)
        {
            try
            {
                var userId = _userValidator.IsUserValid(token);
                var datasets = _database.Users.Include(u => u.UserDatasets)
                    .First(user => user.Id == userId).UserDatasets;
                return Ok(datasets);
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }
        }

        [HttpGet]
        [Route("{id:int}/csvFile")]
        public IActionResult DownloadDataset(int id, [FromHeader] string token)
        {
            const string fileName = "coordinate.csv";
            var file = System.IO.File.ReadAllBytes(fileName);
            return new FileContentResult(file, "application/csv");
        }

        //
        // [HttpPost]
        // [Route("{id:int}/download")]
        // public HttpResponseMessage DownloadDataset(int id, [FromHeader] string token)
        // {
        //
        //         // var userId = _userValidator.IsUserValid(token);
        //         // var dataset = _database.Users.Include(u => u.UserDatasets)
        //             // .First(user => user.Id == userId).UserDatasets.FirstOrDefault(d => d.DatasetId == id);
        //
        //
        //
        //         // if (dataset == null)
        //         // {
        //             // return BadRequest("چنین دیتاستی پیدا نشد");
        //         // }
        //         // return Ok(dataset);
        //
        //
        //         const string fileName = "coordinate.csv";
        //
        //         var file = System.IO.File.ReadAllBytes(fileName);
        //
        //         var response = new HttpResponseMessage(HttpStatusCode.OK)
        //         {
        //             // Content = new StreamContent(new FileStream(file, FileMode.Open, FileAccess.Read))
        //             Content = new ByteArrayContent(file)
        //         };
        //
        //         response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
        //         response.Content.Headers.ContentDisposition.FileName = fileName;
        //         response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/csv");
        //
        //         return response;
        // }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetDataset(int id)
        {
            var dataset = _database.Datasets.FirstOrDefault(x => x.DatasetId == id);
            if (dataset == null)
                return BadRequest("No such id");
            return Ok(dataset);
        }

        [HttpPost]
        [Route("{id:int}/preview")]
        public IActionResult Preview(int id)
        {
            throw new NotImplementedException();
        }
    }
}