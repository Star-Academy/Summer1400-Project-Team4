# Summer1400-Project-Team4 ETL

```
POST/connections
body: {
connectionName  : 
host : 
user : 
password : 
}

Delete/connections/{id}

GET/connections => list<Connection>

GET/connections/{id} Connection

PUT/connections/{id}
{
newName;
}

GET/connections/{id}/databaseName list<string>

POST/datasets/create => return id of dataset
{
datasetName; 
connectionID; 
databaseName; 
tableName; 
}

POST/datasets/upload => return id of new dataset
{
datasetName ; 
csvFile ; 
autoMap ; 
doesHaveHeader ; 
}

PUT/datasets/{id} 
{
newName ; 
}

DELETE/datasets/{id}

POST/datasets/{id}/like

POST/datasets/{id}/disLike

GET/datasets !!!! => return list<Dataset> => dataset must have the owner connection 

GET/datasets/{id} => column and basic data 

POST datasets/{​​​id}​​​/preview
{
startingIndex; 
size; 
}
```
