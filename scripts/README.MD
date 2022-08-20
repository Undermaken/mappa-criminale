## KML to JSON
this script reads the `.kml` file downloaded from [here](https://www.google.com/maps/d/u/0/viewer?mid=1ZSDdwrK9bFAZhGJ3axA0sPeOC-AZ2Glk&shorturl=1&ll=42.3215417003941%2C12.765783050000014&z=8)
and creates a new JSON file with the same data

### setup & run
download the KML file from the [source](https://www.google.com/maps/d/u/0/viewer?mid=1ZSDdwrK9bFAZhGJ3axA0sPeOC-AZ2Glk&shorturl=1&ll=42.3215417003941%2C12.765783050000014&z=8)
- three dots menu on left-side bar
- "SCARICA KML"
- "Esporta come KML anziché KMZ"
- save kml in the same folder where the script is

run the script

`python kml_to_json.py`

now the `data.json` is created/updated