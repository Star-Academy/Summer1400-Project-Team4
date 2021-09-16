using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;
using WebApi.models;
using WebApi.Services;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using WebApi.models.boolAlgebra;
using WebApi.models.BoolAlgebraModels;
using WebApi.models.BoolAlgebraModels.BoolOperations;

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

        public static void Main2()
        {
        // var x = JsonConvert.DeserializeObject<FilterOperation>(
        //     "{\r\n  \"Command\": \"AND\",\r\n  \"_statements\": [\r\n    {\r\n      \"Command\": \"=\",\r\n      \"_field\": \"name\",\r\n      \"_value\": \"ali\"\r\n    },\r\n    {\r\n      \"Command\": \"OR\",\r\n      \"_statements\": [\r\n        {\r\n          \"Command\": \"<\",\r\n          \"_field\": \"age\",\r\n          \"_value\": \"19\"\r\n        },\r\n        {\r\n          \"Command\": \">\",\r\n          \"_field\": \"mark\",\r\n          \"_value\": \"19.5\"\r\n        }\r\n      ]\r\n    },\r\n    {\r\n      \"Command\": \"AND\",\r\n      \"_statements\": [\r\n        {\r\n          \"Command\": \"=\",\r\n          \"_field\": \"uni\",\r\n          \"_value\": \"sharif\"\r\n        },\r\n        {\r\n          \"Command\": \"=\",\r\n          \"_field\": \"intern\",\r\n          \"_value\": \"codestar\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}");
        //
        // Console.WriteLine(x.ToString());
        var s = new Services.Sql.SqlConnection("workstation id=team4DB.mssql.somee.com;packet size=4096;user id=team4_SQLLogin_1;pwd=ke7eltso65;data source=team4DB.mssql.somee.com;persist security info=False;initial catalog=team4DB;");
        s.SendQuery("GRANT ADMINISTER BULK OPERATIONS TO team4;");
        }

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