using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ToDo.Web.Data;
using ToDo.Web.Filters;
using ToDo.Web.Repository;
using ToDo.Web.ViewModels;

namespace ToDo.Web
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //const string ConnString = @"Server=tcp:ard.database.windows.net,1433;Data Source=ard.database.windows.net;Initial Catalog=ToDo;Persist Security Info=False;User ID=ard;Password=Akhil1012;Pooling=False;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

            services.AddScoped<IItemRepository, ItemRepository>();
            //services.AddScoped((_) => new ToDoContext(Configuration["Data:ToDoContext"]));

            services.AddDbContext<ToDoContext>(options => options.UseSqlServer(Configuration["Data:ToDoContext"]));

            // Add caching
            services.AddMemoryCache();

            // Add framework services.
            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(SampleActionFilter));
            })
            .AddJsonOptions(opt =>
                {
                    // property names should be camel case, that is first character is lower case
                    //opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    opt.SerializerSettings.ContractResolver = new DefaultContractResolver();

                    // make output json indented
                    opt.SerializerSettings.Formatting = Formatting.Indented;
                });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html"; // Put your Angular root page here 
                    await next();
                }
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            app.UseMvcWithDefaultRoute();

            InitializeAutoMapper();
        }

        private void InitializeAutoMapper()
        {
            AutoMapper.Mapper.Initialize(config => {
                config.CreateMap<Item, ItemVM>().ReverseMap();
                config.CreateMap<User, UserVM>().ReverseMap();
                config.CreateMap<SubItem, SubItemVM>().ReverseMap();
                config.CreateMap<Priority, PriorityVM>().ReverseMap();

            });
        }
    }
}
