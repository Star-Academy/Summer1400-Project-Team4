﻿namespace WebApi.models.BoolAlgebraModels.BoolOperations
{
    public class AndOperation : BoolOperation
    {
        public AndOperation(IStatement leftStatement, IStatement rightStatement) : base(leftStatement, rightStatement)
        {
            Command = "AND";
        }
    }
}