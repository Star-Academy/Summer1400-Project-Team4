using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;
using WebApplication2.Loader;
using WebApplication2.Services;

namespace WebApplication2
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
            var csvLoader = new CsvLoader();
            csvLoader.Load("E:/covid.csv", "csvTable");
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        
    }
}