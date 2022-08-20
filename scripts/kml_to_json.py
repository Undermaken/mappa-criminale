import xml.etree.ElementTree as ET
import json
from datetime import datetime
from os.path import abspath

print(f"reading {abspath('data.kml')} KML file...")
tree = ET.parse('data.kml')
document = list(tree.getroot())[0]

# places -> dict -> key: 'tour name', value: list of places
# created_at -> timestamp when this dump is created
mappa_criminale = {"places": {}, "created_at": datetime.timestamp(datetime.now())}
place_id = 1
for child in document:
    if child.tag.endswith("Folder"):
        folder_children = list(child)
        folder_name = folder_children[0].text
        mappa_criminale["places"][folder_name] = []
        for place in folder_children[1:]:
            place_children = list(place)
            place_name = place_children[0].text.replace('ì', 'i').replace(' ', '')
            extended_data = list(place_children[3])
            description = extended_data[0][0].text.replace(' ', '').replace('ì', 'i') if extended_data[0][0] else None
            position_link = extended_data[1][0].text
            evaluation = float(extended_data[2][0].text) if extended_data[2][0].text else None
            coordinates = list(place_children[4])[0].text
            lng, lat, z = map(lambda x: float(x), coordinates.replace('\n', '').split(','))
            # skip these entries with no significant data
            if [description, evaluation] == [None, None]:
                continue
            mappa_criminale["places"][folder_name].append(
                {"id": place_id, "name": place_name, "description": description, "position_link": position_link,
                 "evaluation": evaluation, "coordinates": {"lat": lat, "lng": lng}})
            place_id += 1
        print(f"processing '{folder_name}': {len(mappa_criminale['places'][folder_name])} places")

with open('data.json', 'w+') as f:
    json.dump(mappa_criminale, f, indent=4)
    print(f"dumped data into {abspath('data.json')} JSON file")
