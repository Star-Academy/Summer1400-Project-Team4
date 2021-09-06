using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;
using WebApi.Services;
using WebApi.Loader;
using WebApi.Model;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //CreateHostBuilder(args).Build().Run();
            //CsvLoadExample();
            SqlCopyExample();
        }

        private static void SqlCopyExample()
        {
            var sqlCreator = new SqlTableCreator();
            sqlCreator.CopySql("localhost", "olddb", "dbo.tbl", "copied");
            // if the source table is not in the "dbo" schema you should put that instead. however the default value is always "dbo".
        }

        private static void CsvLoadExample()
        {
            
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        
    }
}