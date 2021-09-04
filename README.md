# Summer1400-Project-Team4
<div dir="rtl">
برای api و طراحی پایپلاین یه فرمت موقت مینویسم. میتونین اگه باگی داره(که داره!) اصلاح کنین.
</div>


## pipeline json
<div dir="rtl">
سینتکس instruction رو به صورت دیفالت همون سینکتکس sql server در نظر بگیرین.
</div>

<pre>
{
    "pipelineName": "myPipeline",
    "processes": [
        {
            "name": "filter",
            "instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "name": "filter",
            "instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "name": "filter",
            "instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "name": "filter",
            "instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "name": "filter",
            "instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "name": "filter",
            "instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
        },
        {
            "name": "filter",
            "instruction": "(state = 'California' AND supplier_id <> 900) OR (supplier_id = 100)"
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

