namespace SqlMapper.SqlTypes.Types
{
    public class ApproximateNumeric : ISqlType
    {
        public ApproximateNumeric(int mantis)
        {
            Mantis = mantis;
        }

        public int Mantis { get; }

        public override string ToString()
        {
            return $"FLOAT[{Mantis}]";
        }
    }
}