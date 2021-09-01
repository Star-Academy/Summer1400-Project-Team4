# Summer1400-Project-Team4
<div dir="rtl">
برای api و طراحی پایپلاین یه فرمت موقت مینویسم. میتونین اگه باگی داره(که داره!) اصلاح کنین.
</div>


## pipeline json

<pre>
{
    "pipelineName": "myPipeline",
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


## API

### save a pipeline

<pre>
PUT /users/{userId}/pipelines/{pipelineId}
</pre>

### execute a pipeline

<pre>
POST /users/{userId}/datasets/{datasetId}/execute?pipelineId={pipelineId}&destination={datasetId}
</pre>

