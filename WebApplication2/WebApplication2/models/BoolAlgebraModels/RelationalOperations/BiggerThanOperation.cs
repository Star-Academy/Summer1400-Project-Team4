﻿namespace WebApplication2.models.BoolAlgebraModels.RelationalOperations
{
    public class BiggerThanOperation : RelationalOperation
    {
        public BiggerThanOperation(string field , string value) : base(field , value)
        {
            Command = ">";
        }
    }
}