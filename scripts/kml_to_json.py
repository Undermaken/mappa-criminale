import xml.etree.ElementTree as ET
import json

tree = ET.parse('data.kml')
document = list(tree.getroot())[0]

# key -> folder
# value -> list of places
mappa_criminale = {}

for child in document:
    if child.tag.endswith("Folder"):
        folder_children = list(child)
        folder_name = folder_children[0].text
        mappa_criminale[folder_name] = []
        for place in folder_children[1:]:
            place_children = list(place)
            place_name = place_children[0].text
            extended_data = list(place_children[3])
            description = extended_data[0][0].text.replace(' ', '')
            position_link = extended_data[1][0].text
            evaluation = float(extended_data[2][0].text) if extended_data[2][0].text else None
            coordinates = list(place_children[4])[0].text
            lng,lat, z = map(lambda x: float(x), coordinates.replace('\n', '').split(','))
            mappa_criminale[folder_name].append(
                {"name": place_name, "description": description, "position_link": position_link,
                 "evaluation": evaluation, "coordinates": {"lat": lat, "lng": lng}})
        print(f"{folder_name}: {len(mappa_criminale[folder_name])} places")

with open('data.json', 'w+') as f:
    json.dump(mappa_criminale, f, indent=4)
