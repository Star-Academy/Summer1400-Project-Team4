# Summer1400-Project-Team4
<div dir="rtl">
برای api و طراحی پایپلاین یه فرمت موقت مینویسم. میتونین اگه باگی داره(که داره!) اصلاح کنین.
</div>


## pipeline json
<div dir="rtl">
برای قسمت جوین توی instruction برا این که کارتون راحتتر باشه فرمت جیسون گذاشتم که بتونین با فیلدا راحت کار کنین. فقط حواستون باشه که این [جیسون توی جیسون](https://stackoverflow.com/questions/25570712/is-it-possible-to-wrap-json-in-json-field-like-a-string) هستش

</div>

<pre>
{
    "PipelineName": "myPipeline",
    "Processes": [
        {
            "Name": "filter",
            "Instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "Name": "join",
            "Instruction": "{
                \"Type\": \"INNER JOIN\",
                \"JoinWith\": \"_{datasetId}\",
                \"LeftTableKey\": \"width\",
                \"RightTableKey\": \"latitude\",
            }"
        },
        {
            "Name": "filter",
            "Instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "Name": "filter",
            "Instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "Name": "filter",
            "Instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "Name": "filter",
            "Instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "Name": "filter",
            "Instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },        
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

