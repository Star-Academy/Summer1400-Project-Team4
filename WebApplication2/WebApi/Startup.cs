using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using WebApi.Authentication;
using WebApi.models;
using WebApi.Services;
using WebApi.Validations;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Database.ConnectionString = Configuration.GetConnectionString("DefaultConnection");
            Database.ConnectionString = Configuration.GetConnectionString("Somee");

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:1433",
                                "http://localhost:4200", "http://localhost:5000", "https://localhost:5001"
                            )
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            var database = new Database();
            services.AddControllers();
            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo {Title = "WebApi", Version = "v1"}); });
            services.AddSingleton(new SqlConnection(Database.ConnectionString));
            services.AddSingleton(database);
            services.AddSingleton(new UserValidation(database));
            services.AddSingleton(new UserAuthorization(database));
            services.AddSingleton(new SqlTableTransformer(database));
            services.AddSingleton(new UserDatabaseChecker(database));
            services.AddSingleton(new UserAuthorization(database));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // if (env.IsDevelopment() || env.IsEnvironment())
            // {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("../swagger/v1/swagger.json", "WebApi v1");
                // c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApi v1");
                // c.RoutePrefix = string.Empty;
            });
            // }
            app.UseCors(MyAllowSpecificOrigins);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}