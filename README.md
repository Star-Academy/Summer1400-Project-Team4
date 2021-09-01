# Summer1400-Project-Team4
<div dir="rtl">
برای api و طراحی پایپلاین یه فرمت موقت مینویسم. میتونین اگه باگی داره اصلاح کنین.
</div>

## pipeline json

  <pre>
{
    "executeOnTable": "myTable",
    "processes": [
        {
            "name": "filter",
            "instruction": "{\"outputColumns\":[\"StudentNumber\", \"Grade\", \"FirstName\", \"LastName\"], \"condition\":\"IsMale = 1 AND 10 < Grade AND Grade < 15\"}"
        },
        {
            "name": "filter",
            "instruction": "{\"outputColumns\":[\"StudentNumber\", \"Grade\", \"FirstName\", \"LastName\"], \"condition\":\"IsMale = 1 AND 10 < Grade AND Grade < 15\"}"
        },
        {
            "name": "filter",
            "instruction": "{\"outputColumns\":[\"StudentNumber\", \"Grade\", \"FirstName\", \"LastName\"], \"condition\":\"IsMale = 1 AND 10 < Grade AND Grade < 15\"}"
        },
        {
            "name": "filter",
            "instruction": "{\"outputColumns\":[\"StudentNumber\", \"Grade\", \"FirstName\", \"LastName\"], \"condition\":\"IsMale = 1 AND 10 < Grade AND Grade < 15\"}"
        },
        {
            "name": "filter",
            "instruction": "{\"outputColumns\":[\"StudentNumber\", \"Grade\", \"FirstName\", \"LastName\"], \"condition\":\"IsMale = 1 AND 10 < Grade AND Grade < 15\"}"
        },
        {
            "name": "filter",
            "instruction": "{\"outputColumns\":[\"StudentNumber\", \"Grade\", \"FirstName\", \"LastName\"], \"condition\":\"IsMale = 1 AND 10 < Grade AND Grade < 15\"}"
        },
        {
            "name": "filter",
            "instruction": "{\"outputColumns\":[\"StudentNumber\", \"Grade\", \"FirstName\", \"LastName\"], \"condition\":\"IsMale = 1 AND 10 < Grade AND Grade < 15\"}"
        }
    ]
}
  </pre>
