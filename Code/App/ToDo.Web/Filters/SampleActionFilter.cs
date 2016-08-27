using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ToDo.Web.Filters
{
    public class SampleActionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // something before action executes
            Helper.Log("Sample Action Filter - Before");

            // execute action
            await next();

            // something after action executes
            Helper.Log("Sample Action Filter - Before");
        }
    }
}
