namespace WebApi.models.SortModels
{
    public class SortOrder
    {
        public string FieldName { get; set; }
        public bool Descending { get; set; }

        public string GetSqlForm()
        {
            return FieldName + " " + (Descending ? "DESC" : "ASC");
        }
    }
}