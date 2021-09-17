using System;
using System.Collections.Generic;
using System.Linq;
using SqlMapper.SqlTypes.Types;
using SqlMapper.SqlTypes.TypesSubset;
using SqlMapperLib.Extensions;
using SqlMapperLib.SqlTypes;
using SqlMapperLib.SqlTypes.Types;

namespace SqlMapperLib
{
    public class Mapper
    {
        private readonly IEnumerable<string> _data;

        public Mapper(IEnumerable<string> data)
        {
            _data = data;
        }

        public ISqlType MapToSqlType()
        {
            var sample = _data.Where(data => !string.IsNullOrEmpty(data)).Take(50);
            var sampleToStringArray = sample as string[] ?? sample.ToArray();
            var firstData = sampleToStringArray.First();

            return firstData.ToSqlDataType() switch
            {
                Date => CheckIfDateTypeIsAppropriate(sampleToStringArray),
                ApproximateNumeric => CheckIfFloatTypeIsAppropriate(sampleToStringArray),
                ExactNumeric => CheckIfIntTypeIsAppropriate(sampleToStringArray),
                _ => new NVarChar()
            };
        }

        private ISqlType CheckIfIntTypeIsAppropriate(string[] sampleToStringArray)
        {
            var isParsable = TryToParse(sampleToStringArray, "INT");
            if (isParsable) return new NVarChar();
            const ExactNumericTypes largest = ExactNumericTypes.SmallInt;
            var type = sampleToStringArray.First().ToSqlDataType();
            type = FindAppropriateSizeForExactNumeric(sampleToStringArray, largest, type);

            return type;
        }

        private static ISqlType FindAppropriateSizeForExactNumeric(IEnumerable<string> sampleToStringArray,
            ExactNumericTypes largest,
            ISqlType type)
        {
            foreach (var sqlType in
                sampleToStringArray.Where(s => ((ExactNumeric) s.ToSqlDataType()).Type > largest))
            {
                type = sqlType.ToSqlDataType();
                largest = ((ExactNumeric) sqlType.ToSqlDataType()).Type;
            }

            return type;
        }

        private ISqlType CheckIfFloatTypeIsAppropriate(string[] sampleToStringArray)
        {
            var isParsable = TryToParse(sampleToStringArray, "FLOAT");
            if (isParsable) return new NVarChar();
            var type = sampleToStringArray.First().ToSqlDataType();
            const int largest = 0;
            type = FindAppropriateSizeForMantis(sampleToStringArray, largest, type);

            return type;
        }

        private static ISqlType FindAppropriateSizeForMantis(IEnumerable<string> sampleToStringArray, int largest,
            ISqlType type)
        {
            foreach (var data in sampleToStringArray.Where(sqlType =>
                ((ApproximateNumeric) sqlType.ToSqlDataType()).Mantis > largest))
            {
                largest = ((ApproximateNumeric) data.ToSqlDataType()).Mantis;
                type = data.ToSqlDataType();
            }

            return type;
        }

        private ISqlType CheckIfDateTypeIsAppropriate(string[] sampleToStringArray)
        {
            var isParsable = TryToParse(sampleToStringArray, "DATE");
            return isParsable
                ? new NVarChar()
                : sampleToStringArray.First().ToSqlDataType();
        }

        private bool TryToParse(IEnumerable<string> sample, string data)
        {
            var mapSampleToSqlType =
                sample.Select(s => s.ToSqlDataType()).Distinct().ToHashSet();
            var dateSample = mapSampleToSqlType.Where(type => type.ToString().Contains(data)).ToHashSet();
            return dateSample.Count != mapSampleToSqlType.Count;
        }
    }
}