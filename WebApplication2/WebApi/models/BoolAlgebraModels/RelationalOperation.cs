﻿using Newtonsoft.Json;

namespace WebApi.models.BoolAlgebraModels
{
    public abstract class RelationalOperation : IStatement
    {
        [JsonProperty]
        protected string Command;
        [JsonProperty]
        private readonly string _field;
        [JsonProperty]
        private readonly string _value; 

        protected RelationalOperation(string field, string value)
        {
            _field = field;
            _value = value;
        }

        public override string ToString()
        {
            return $"{_field} {Command} {_value}";
        }
    }
}