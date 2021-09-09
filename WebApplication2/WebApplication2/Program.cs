using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace WebApplication2
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        // public static void Main()
        // {
        // var x = JsonConvert.DeserializeObject<dynamic>(
        //     "{\"Command\":\"AND\",\"_leftStatement\":{\"Command\":\"OR\",\"_leftStatement\":{\"Command\":\"=\",\"_field\":\"name\",\"_value\":\"\\\"arash\\\"\"},\"_rightStatement\":{\"Command\":\"<\",\"_field\":\"age\",\"_value\":\"19\"}\r\n},\"_rightStatement\":{\"Command\":\"<\",\"_field\":\"fatherName\",\"_value\":\"\\\"saeed\\\"\"}}");
        // Console.WriteLine(x.Command);
        // }
        //
        // public static void Main()
        // {
        //     // var sqlConnection = new SqlConnection(
        //     //     @"Data Source=localhost\SQLExpress,1433;Database=ETL;Integrated Security=sspi;");
        // var test = new AndOperation(
        //     new OrOperation(
        //         new EqualOperation(
        //             "name",
        //             "\"arash\""),
        //         new LessThanOperation(
        //             "age",
        //             "19")),
        //     new LessThanOperation(
        //         "fatherName",
        //         "\"saeed\"")
        // );
        //
        // Console.WriteLine(JsonConvert.SerializeObject(test,  Formatting.Indented));
        // }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        }
    }
}