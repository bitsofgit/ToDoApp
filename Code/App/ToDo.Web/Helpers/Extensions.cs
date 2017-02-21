using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Web.Helpers
{
    public static class Extensions
    {
        public static void ExtIfNullorWhitespaceThrowException(this string str, string errorMsg = "Argument can not be null.")
        {
            if (string.IsNullOrWhiteSpace(str))
                throw new ArgumentNullException(errorMsg);
        }

        public static void ExtIfNullThrowException(this object obj, string errorMsg = "Argument can not be null.")
        {
            if (obj == null)
                throw new ArgumentNullException(errorMsg);
        }
    }
}
