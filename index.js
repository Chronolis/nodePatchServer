const express = require('express')
const jsonfile = require('jsonfile')
const app = express()
const FILE_LOCATION = './Patches/Software.json'
const portNumber = 3000
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

// Root webpage
app.get('/', (req, res) => res.send('<!DOCTYPE html><html><body><p>Below are examples of available endpoints</p><p id="/software"></p><p id="/software/id"></p><p id="/software/ids"></p><p id="/patch/id"></p><script>var x = document.URL;var software = "/software";var softwareResult = software.link(x + "software");document.getElementById("/software").innerHTML = softwareResult;var softwareId = "/software/AdobePhotoshopCC";var softwareIdResult = softwareId.link(x + "software/AdobePhotoshopCC");document.getElementById("/software/id").innerHTML = softwareIdResult;var softwareIds = "/software/AdobePhotoshopCC,MozillaFirefox";var softwareIdsResult = softwareIds.link(x + "software/AdobePhotoshopCC,MozillaFirefox");document.getElementById("/software/ids").innerHTML = softwareIdsResult;var patch = "/patch/MozillaFirefox";var patchResult = patch.link(x + "patch/MozillaFirefox");document.getElementById("/patch/id").innerHTML = patchResult;</script></body></html>'))

// /software endpoint
app.get('/software', function (req, res) {
	jsonfile.readFile(FILE_LOCATION, function(err, obj) {
		res.send(obj)
	})
})

app.get('/software/:id', function(req, res){
	//Read in the JSON of the files
	jsonfile.readFile(FILE_LOCATION, function(err, obj) {
		//parse the body for software to find
		var userSoftware;
		var foundSoftwareObjects = [];
		if (req.params.id.indexOf(',') != -1){
			userSoftware = req.params.id.split(',');
		} else {
		  userSoftware = []
		  userSoftware.push(req.params.id)
		}
		//Save a list of objects to return to the user
		//Loop for known software for the values
		for (i = 0; i < userSoftware.length; i++){
			//Loop the other json file looking
			var found = false;
			var s = 0;
			//Don't keep looping if found
			while (!found && s < obj.length){
				if (userSoftware[i] == obj[s].id){
					foundSoftwareObjects.push(obj[s]);
					found = true;
        } else {
					var invalidId = userSoftware[i]
					s++;
				}
			}
		}
		//Return the found software
		if (found != false) {
		  res.send(foundSoftwareObjects);
    } else {
      res.status(500).send('Could not find ID ' + invalidId)
    }
	});
});

// /patch/{id} endpoint
app.get('/patch/:id', function (req, res) {

	var file = './Patches/' + (req.params.id) + '.json'

  jsonfile.readFile(file, function(err, obj) {
   if (obj == null) {
     res.status(404).send('Patch Title not found. Check JSON ID and try again')
   } else {
  	 res.send(obj)
   }
  })
})

// App port definition
app.listen(portNumber, () => console.log('App listening on port ' + portNumber + '!'))
