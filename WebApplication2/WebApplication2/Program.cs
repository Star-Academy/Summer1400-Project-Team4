using System;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using WebApplication2.models;
using WebApplication2.Services.QueryServices;

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
        //     string[] groupBys = { "WordId", "WordInfos"};
        //     var x = new AggregateOpertaion[]
        //     {
        //         new AggregateOpertaion() {FieldName = "WordId", OutputFieldName = "COUNT", Type = "COUNT"},
        //         new AggregateOpertaion() {FieldName = "WordId2", OutputFieldName = "COUNT2", Type = "COUNT"}
        //     };
        //     var y = new AggregateConfig()
        //     {
        //         GroupBy = groupBys,
        //         Operations =x
        //     };
        //
        //
        //     // var x = JsonConvert.DeserializeObject<Object>();
        //     // Console.WriteLine(JsonSerializer.Serialize(y));
        //     Console.WriteLine(AggregationProcessor.InterpretToSql("{\"GroupBy\":[\"WordId\",\"WordInfos\"],\"Operations\":[{\"FieldName\":\"WordId\",\"Type\":\"COUNT\",\"OutputFieldName\":\"COUNT\"},{\"FieldName\":\"WordId2\",\"Type\":\"COUNT\",\"OutputFieldName\":\"COUNT2\"}]}", "first", "end"));
        // }
        // public static void Main()
        // {
        // var x = JsonConvert.DeserializeObject<Object>(
        //     "{\"Command\":\"AND\",\"_leftStatement\":{\"Command\":\"OR\",\"_leftStatement\":{\"Command\":\"=\",\"_field\":\"name\",\"_value\":\"\\\"arash\\\"\"},\"_rightStatement\":{\"Command\":\"<\",\"_field\":\"age\",\"_value\":\"19\"}\r\n},\"_rightStatement\":{\"Command\":\"<\",\"_field\":\"fatherName\",\"_value\":\"\\\"saeed\\\"\"}}");
        // Console.WriteLine(x.ToString());
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