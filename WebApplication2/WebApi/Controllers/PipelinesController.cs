using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.models;
using WebApi.Services;
using WebApi.Validations;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipelinesController : ControllerBase
    {
        private Database _database;
        private UserValidation _userValidation;

        public PipelinesController(Database database, UserValidation userValidation)
        {
            _database = database;
            _userValidation = userValidation;
        }

        [HttpPost]
        public async Task<IActionResult> AddNewPipeline([FromBody] Pipeline pipeline, [FromHeader] string token)
        {
            var user = await GetUserByToken(token);
            user.Pipelines.Add(pipeline);

            await _database.SaveChangesAsync();
            return Ok("پایپلاین با موفقیت اضافه شد");
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePipeline([FromRoute] int pipelineId, [FromBody] Pipeline pipeline,
            [FromHeader] string token)
        {
            var user = await GetUserByToken(token);

            var updatingPipeline = user.Pipelines.First(p => p.PipelineId == pipelineId);

            updatingPipeline.PipelineName = pipeline.PipelineName;
            updatingPipeline.Processes = pipeline.Processes;
            updatingPipeline.InputDataset = pipeline.InputDataset;
            updatingPipeline.OutputDataset = pipeline.OutputDataset;
            updatingPipeline.InputDatasetId = pipeline.InputDatasetId;
            updatingPipeline.OutputDatasetId = pipeline.OutputDatasetId;

            await _database.SaveChangesAsync();
            return Ok("پایپلاین با موفقیت آپدیت شد");
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePipeline([FromRoute] int pipelineId, [FromHeader] string token)
        {
            var pipeline = _database.Pipelines.FirstOrDefaultAsync(p => p.PipelineId == pipelineId);
            if (pipeline == null) return BadRequest();
            _database.Pipelines.Remove(await pipeline);
            await _database.SaveChangesAsync();

            return Ok("پایپلاین با موفقیت حذف شد");
        }


        [HttpGet]
        [Route("{pipelineId:int}")]
        public async Task<ActionResult<Pipeline>> GetPipeline(int pipelineId,
            [FromHeader] string token)
        {
            var user = await GetUserByToken(token);

            var pipeline = user.Pipelines.FirstOrDefault(p => p.PipelineId == pipelineId);
            if (pipeline == null) return BadRequest("پایپلاین پیدا نشد");
            return Ok(pipeline);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pipeline>>> GetAllUserPipelines([FromHeader] string token)
        {
            var user = await GetUserByToken(token);

            return user.Pipelines;
        }

        [HttpPost]
        [Route("{pipelineId:int}/execute")]
        public IActionResult ExecutePipeline(int pipelineId, [FromHeader] string token)
        {
            var pipeline = _database.Pipelines.Include(a => a.Processes).FirstOrDefault(p => p.PipelineId == pipelineId);
            if (pipeline == null) return BadRequest("پایپلاینی با این آی دی پیدا نشد");

            var pipelineExecutor =//todo handle getting connection string from app settings
                new PipelineExecutor(@"Data Source=localhost\SQLExpress,1433;Database=ETL;Integrated Security=sspi;MultipleActiveResultSets=True;",
                    pipeline);

            pipelineExecutor.Execute("_" + pipeline.InputDatasetId, "_" + pipeline.OutputDatasetId);

            return Ok();
        }


        private async Task<User> GetUserByToken(string token)
        {
            var user = await _database.Users.Include(u => u.Pipelines)
                .ThenInclude(p => p.Processes).FirstOrDefaultAsync(u => u.Token == token);
            if (user == null)
            {
                throw new Exception("لطفا دوباره وارد شوید");
            }

            return user;
        }
    }
}