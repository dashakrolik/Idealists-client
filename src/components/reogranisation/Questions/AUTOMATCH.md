## On the backend regarding AutoMatch

1. Upon Idea submission, aggregate certain input fields into a single string [tbd]

Request is this
```
json{
	"query": "OUR AGGREGATED STRING",
	"requested-hits": "10",
	"view": "bibliographic,passage" // important
}
```

2. Send that string to the autoMatch API.
IMPORTANT: In the headers that you POST to the /search endpoint, one header is set for Authorization, the other header (which is sent only to the /search POST request endpoint) is the reference-number.
It needs to be generated per user, so we can use a userId here. Or a separate id used only for automatch (maybe better) -> automatchRef.

```
Authorization:umTe8dt8epj2sBxH6CmIUzpNd8EPIOHz <- our Token, needs to be stored outside source files when deployed
reference-number:123456789 <- the automatchRef/userId
Content-Type:application/json
```

ALSO: Change all the id columns into uuids -> `@PrimaryGeneratedColumn('uuid')` -> that's the only change besides changing id column type from number to text/string
2. The Idea model currently has id, the answers json, etc... 
Needs to get this as well:
```
{
	autoMatchResults: relation to a new table "autoMatch" (or whatever)
}

AutoMatchResult {
	id: string
	status: pending | retrieved
	token: string
	tokenReceivedOn: Date
	results: AutoMatchPatent[]
	idea: Idea (relation)
}
AutoMatchPatent {
	id: ...
	(result, see below)
	ideaPersonResponse: IPResponse {
	  id
	  date
	  selfAssessedMatch: 0/1/2
	  message?: string
	}
	financieerResponse: FResponse[] // you can just create a column for now, not gonna use it yet
}
```

response -> data -> ipscreener-results -> index-1 -> [result]  
result -> relevance -> country + '-' + number + '-' + kind-code => patent number we use for retreival of the pdf
I would save the other data as is, ie each results maybe even just as a json into one AutoMatchPatent entity, no time to parse it into separate columns, there's more important stuff now

### Getting the results
Server should check after a minute or two, and then if it's still pending try again in a minute or two, watch out if the status isn't pending but an error or something (available in the spec) the requests should stop

### PDF
API is GET https://api.auto-match.se/v2/pdf/**[our-1234567-patentNumber]**

it also needs the auth header

return a base64 encoded pdf file (so it can take a while, don't set request to timeout in 10 seconds)

