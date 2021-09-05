using System.Collections.Generic;
using System.Linq;
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

        [HttpGet]
        [Route("/{userId:int}/Datasets")]
        public List<Dataset> GetUserDataset(int userId)
        {
            return Startup.EtlContext.Users.First(u => u.UserId == userId).Datasets.ToList();
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

        [HttpPost]
        [Route("/{userId:int}/Datasets")]
        public IActionResult AddToUserDatasets(int userId, Dataset dataset)
        {
            var user = Startup.EtlContext.Users.FirstOrDefault(u => u.UserId == userId);

            if (user != null)
            {
                user.Datasets ??= new List<Dataset>();
                var datasets = user.Datasets.ToList();
                datasets.Add(dataset);
                user.Datasets = datasets;
            }
            else
            {
                return BadRequest("no user found with this id");
            }

            Startup.EtlContext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("/{userId:int}/Pipelines/{pipelineId:int}")]
        public IActionResult UpdateUserPipeline(int userId, int pipelineId, Pipeline pipeline)
        {
            var selectedPipeline = Startup.EtlContext.Pipelines.FirstOrDefault(p => p.PipelineId == pipelineId);
            if (selectedPipeline == null)
            {
                return BadRequest("no pipeline found with this id");
            }

            selectedPipeline.PipelineName = pipeline.PipelineName;
            selectedPipeline.Processes = pipeline.Processes;
            Startup.EtlContext.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("/{userId:int}/datasets/{datasetId:int}/execute")]
        public IActionResult ExecutePipeline(int userId, int datasetId, int pipelineId, int destination)
        {
            return Ok();
        }

        [HttpPost]
        [Route("/{userId:int}/datasets/{datasetId:int}/preview")]
        public IActionResult ExecutePreviewOfPipeline(int userId, int datasetId, Pipeline pipeline)
        {
            return Ok();
        }
    }
}