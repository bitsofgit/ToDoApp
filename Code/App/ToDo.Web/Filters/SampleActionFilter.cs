using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace ToDo.Web.Filters
{
    public class SampleActionFilter : IAsyncActionFilter
    {
        private ILogger<SampleActionFilter> _logger;

        public SampleActionFilter(ILogger<SampleActionFilter> logger)
        {
            if (logger == null)
                throw new NullReferenceException("logger is null");
            _logger = logger;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // something before action executes
            _logger.LogInformation("Before");

            // execute action
            await next();

            // something after action executes
            _logger.LogInformation("After");
        }
    }
}
