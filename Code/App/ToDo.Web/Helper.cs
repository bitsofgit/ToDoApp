using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace ToDo.Web
{
    public static class Helper
    {
        public static void Log(string message)
        {
            if (string.IsNullOrWhiteSpace(message))
                return;

            Debug.WriteLine(message);
        }
    }
}
