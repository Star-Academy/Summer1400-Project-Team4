using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.models;
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
            await _database.Pipelines.AddAsync(pipeline);
            return Ok("پایپلاین با موفقیت اضافه شد");
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePipeline([FromRoute] int pipelineId, [FromHeader] string token)
        {
            var pipeline = _database.Pipelines.FirstOrDefaultAsync(p => p.PipelineId == pipelineId);
            if (pipeline == null) return BadRequest();
            _database.Pipelines.Remove(await pipeline);
            return Ok();
        }


        [HttpGet]
        [Route("{connectionId}")]
        public async Task<ActionResult<Pipeline>> GetPipeline([FromRoute] int pipelineId,
            [FromHeader] string token)
        {
            var pipeline = await _database.Pipelines.FirstOrDefaultAsync(p => p.PipelineId == pipelineId);
            if (pipeline == null) return BadRequest();
            return Ok(pipeline);
        }


    }
}