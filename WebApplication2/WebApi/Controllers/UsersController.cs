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
        //
        // [HttpGet]
        // [Route("/{userId:int}/Pipelines")]
        // public List<Pipeline> GetUserPipelines(int userId)
        // {
        //     return Startup.EtlContext.Users.Include(a => a.Pipelines).First(u => u.UserId == userId).Pipelines.ToList();
        // }
        //
        // [HttpGet]
        // [Route("/{userId:int}/Datasets")]
        // public List<Dataset> GetUserDataset(int userId)
        // {
        //     return Startup.EtlContext.Users.Include(a => a.Datasets).First(u => u.UserId == userId).Datasets.ToList();
        // }
        //
        // [HttpPost]
        // [Route("/{userId:int}/Pipelines")]
        // public IActionResult AddToUserPipelines(int userId, Pipeline pipeline)
        // {
        //     var user = Startup.EtlContext.Users.Include(a => a.Pipelines).FirstOrDefault(u => u.UserId == userId);
        //
        //     if (user != null)
        //     {
        //         user.Pipelines ??= new List<Pipeline>();
        //         var pipelines = user.Pipelines.ToList();
        //         pipelines.Add(pipeline);
        //         user.Pipelines = pipelines;
        //     }
        //     else
        //     {
        //         return BadRequest("no user found with this id");
        //     }
        //
        //     Startup.EtlContext.SaveChanges();
        //     return Ok();
        // }
        //
        // [HttpPost]
        // [Route("/{userId:int}/Datasets")]
        // public IActionResult AddToUserDatasets(int userId, Dataset dataset)
        // {
        //     var user = Startup.EtlContext.Users.Include(a => a.Datasets).FirstOrDefault(u => u.UserId == userId);
        //
        //     if (user != null)
        //     {
        //         user.Datasets ??= new List<Dataset>();
        //         var datasets = user.Datasets.ToList();
        //         datasets.Add(dataset);
        //         user.Datasets = datasets;
        //     }
        //     else
        //     {
        //         return BadRequest("no user found with this id");
        //     }
        //
        //     Startup.EtlContext.SaveChanges();
        //     return Ok();
        // }
        //
        // [HttpPut]
        // [Route("/{userId:int}/Pipelines/{pipelineId:int}")]
        // public IActionResult UpdateUserPipeline(int userId, int pipelineId, Pipeline pipeline)
        // {
        //     var selectedPipeline = Startup.EtlContext.Pipelines.FirstOrDefault(p => p.PipelineId == pipelineId);
        //     if (selectedPipeline == null) return BadRequest("no pipeline found with this id");
        //
        //     selectedPipeline.PipelineName = pipeline.PipelineName;
        //     selectedPipeline.Processes = pipeline.Processes;
        //     Startup.EtlContext.SaveChanges();
        //     return Ok();
        // }
        //
        // [HttpPost]
        // [Route("/{userId:int}/datasets/{datasetId:int}/execute")]
        // public IActionResult ExecutePipeline(int userId, int datasetId, int pipelineId, int destination)
        // {
        //     var pipeline = Startup.EtlContext.Pipelines.Include(a => a.Processes).FirstOrDefault(p => p.PipelineId == pipelineId);
        //     if (pipeline == null) return BadRequest("no pipeline found with this id");
        //
        //     var pipelineExecutor =
        //         new PipelineExecutor(@"Data Source=localhost\SQLExpress,1433;Database=ETL;Integrated Security=sspi;MultipleActiveResultSets=True;",
        //             pipeline);
        //
        //     // var startingDataset = Startup.EtlContext.Datasets.FirstOrDefault(p => p.DatasetId == datasetId);
        //     // var destinationDataset = Startup.EtlContext.Datasets.FirstOrDefault(p => p.DatasetId == destination);
        //     //
        //     // if (startingDataset == null || destinationDataset == null)
        //     //     return BadRequest("no datasets found with these IDs");
        //     //
        //     // pipelineExecutor.Execute(startingDataset.DatasetName, destinationDataset.DatasetName);
        //     pipelineExecutor.Execute("_" + datasetId, "_" + destination);
        //
        //     return Ok();
        // }
        //
        // [HttpPost]
        // [Route("/{userId:int}/datasets/{datasetId:int}/preview")]
        // public IActionResult ExecutePreviewOfPipeline(int userId, int datasetId, Pipeline pipeline)
        // {
        //     return Ok();
        // }
    }
}