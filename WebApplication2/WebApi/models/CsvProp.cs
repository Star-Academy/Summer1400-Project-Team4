using System.ComponentModel.DataAnnotations;

namespace WebApi.models
{
    public class CsvProp
    {
      [Required]  public string CsvContent { set;  get; }
      [Required]  public string TableName { set;  get; }
      [Required]  public bool DoesHaveHeader { set;  get; }
      [Required]  public string FieldTerminator { set; get; }
      [Required]  public string RowTerminator { set;  get; }

        public CsvProp(string csvContent, string tableName, bool doesHaveHeader, string rowTerminator,
            string fieldTerminator)
        {
            CsvContent = csvContent;
            TableName = tableName;
            DoesHaveHeader = doesHaveHeader;
            RowTerminator = rowTerminator;
            FieldTerminator = fieldTerminator;
        }
    }
}