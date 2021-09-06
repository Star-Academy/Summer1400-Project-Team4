using System;

namespace SqlMapper
{
    public class WrongSqlFormatException : FormatException
    {
        public WrongSqlFormatException()
        {
            Message = "Invalid Sql data types";
        }

        public override string Message { get; }
    }
}