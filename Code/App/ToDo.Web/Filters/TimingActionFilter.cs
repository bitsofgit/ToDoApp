using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using ToDo.Web.Helpers;

namespace ToDo.Web.Filters
{
    public class TimingActionFilter : IAsyncActionFilter
    {
        private ILogger<TimingActionFilter> _logger;

        public TimingActionFilter(ILogger<TimingActionFilter> logger)
        {
            logger.ExtIfNullThrowException("logger is null");
            _logger = logger;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // something before action executes
            _logger.LogInformation("Before" );
            var sw = new Stopwatch();
            sw.Start();

            // execute action
            await next();

            // something after action executes
            // Add a header to mention the time it took for the request to be processed on the server
            sw.Stop();
            context.HttpContext.Response.Headers.Add("Server-Timing", "exectime="+sw.ElapsedMilliseconds+"(ms); ExecutionTime");
            _logger.LogInformation($"Done in : {sw.ElapsedMilliseconds}");
            
        }
    }
}
