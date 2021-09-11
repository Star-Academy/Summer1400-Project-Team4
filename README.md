# Summer1400-Project-Team4
<div dir="rtl">
برای api و طراحی پایپلاین یه فرمت موقت مینویسم. میتونین اگه باگی داره(که داره!) اصلاح کنین.
</div>


## pipeline json
<div dir="rtl">

برای قسمت جوین توی instruction برا این که کارتون راحتتر باشه فرمت جیسون گذاشتم که بتونین با فیلدا راحت کار کنین. فقط حواستون باشه که این]جیسون توی جیسون](https://stackoverflow.com/questions/25570712/is-it-possible-to-wrap-json-in-json-field-like-a-string) هستش

برای درک بیشتر ساختار بولین داخل اینتسراکشن فیلتر به این لینک برین:
https://github.com/Star-Academy/Summer1400-Project-Team4/tree/MiddlewareProcess/WebApplication2/WebApplication2/models/BoolAlgebraModels

</div>

<pre>
{
    "PipelineName": "myPipeline",
    "Processes": [
        {
            "Name": "filter",
            "Instruction": "
{"Command":"AND","_leftStatement":{"Command":"OR","_leftStatement":{"Command":"=","_field":"name","_value":"\"arash\""},"_rightStatement":{"Command":"<","_field":"age","_value":"19"}
},"_rightStatement":{"Command":"<","_field":"fatherName","_value":"\"saeed\""}}"
        },
        {
            "Name": "join",
            "Instruction": "{
                \"Type\": \"INNER JOIN\",
                \"JoinWith\": \"{datasetId}\",
                \"LeftTableKey\": \"width\",
                \"RightTableKey\": \"latitude\",
            }"
        },
        {
            "Name": "join",
            "Instruction": "{\"Type\": \"FULL OUTER JOIN\",\"JoinWith\": \"10\",\"LeftTableKey\": \"StudentNumber\",\"RightTableKey\": \"StudentNumber2\",}"
        }, 
        {
            "Name": "aggregation",
            "Instruction": "{\"GroupBy\":[\"WordId\",\"WordInfos\"],\"Operations\":[{\"FieldName\":\"WordId\",\"Type\":\"COUNT\",\"OutputFieldName\":\"COUNT\"},{\"FieldName\":\"WordId2\",\"Type\":\"COUNT\",\"OutputFieldName\":\"COUNT2\"}]}"
        }       
    ]
}
</pre>


<div dir="rtl">
اینم از یه ساختار تمیز برای اینستراکشن فیلتر:
</div>
<pre>
{
  "Command": "AND",
  "_statements": [
    {
      "Command": "=",
      "_field": "name",
      "_value": "ali"
    },
    {
      "Command": "OR",
      "_statements": [
        {
          "Command": "<",
          "_field": "age",
          "_value": "19"
        },
        {
          "Command": ">",
          "_field": "mark",
          "_value": "19.5"
        }
      ]
    },
    {
      "Command": "AND",
      "_statements": [
        {
          "Command": "=",
          "_field": "uni",
          "_value": "sharif"
        },
        {
          "Command": "=",
          "_field": "intern",
          "_value": "codestar"
        }
      ]
    }
  ]
}



</pre>

## API

### save a new pipeline

<pre>
POST /users/{userId}/pipelines
</pre>

### update a pipeline

<pre>
PUT /users/{userId}/pipelines/{pipelineId}
</pre>

### execute a pipeline

<pre>
POST /users/{userId}/datasets/{datasetId}/execute?pipelineId={pipelineId}&destination={datasetId}
</pre>

### execute a preview of pipeline

<pre>
POST /users/{userId}/datasets/{datasetId}/preview?pipeline={pipeline}
</pre>

