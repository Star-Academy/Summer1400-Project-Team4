using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;
using WebApi.models;
using WebApi.Services;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            /*var testSt =
                "Data Source=tcp:127.0.0.1,1433;Initial Catalog=ETL;User ID=TALEBAN;Password=1234;"; 
            using(SqlConnection con = new SqlConnection(testSt)) {  
                con.Open();  
                using(SqlCommand cmd = new SqlCommand("SELECT name from sys.databases", con)) {  
                    using(SqlDataReader dr = cmd.ExecuteReader()) {  
                        while (dr.Read()) {  
                            Console.WriteLine(dr[0].ToString());  
                        }  
                    }  
                }  
            }*/
            CreateHostBuilder(args).Build().Run();
            //CsvLoadExample();
            //SqlCopyExample();
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