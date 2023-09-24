import './styles.css'

import { Map, Popup } from 'maplibre-gl'

const map = new Map({
    container: 'map',
    style: { // thanks to https://jsfiddle.net/g1rwx8kp/
        version: 8,
        sources: {
            osm: {
                type: 'raster',
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution: 'Map tiles by <a target="_top" rel="noopener" href="https://tile.openstreetmap.org/">OpenStreetMap tile servers</a>, under the <a target="_top" rel="noopener" href="https://operations.osmfoundation.org/policies/tiles/">tile usage policy</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>'
            }
        },
        layers: [{
            id: 'osm',
            type: 'raster',
            source: 'osm',
        }],
    },
    center: [6.0225, 47.2399],
    zoom: 15
});

map.once("load", async () => {
    const roads = await getRoads()
    console.log(roads)

    const a = {
        type: "FeatureCollection",
        features: roads
    }

    map.addSource('data', {
        type: 'geojson',
        data: a
    });
    map.addLayer({
        id: 'ee',
        type: 'line',
        source: 'data',
        paint: {
            'line-color': '#888',
            'line-width': 4
        }
    })

    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'ee', (e) => {
        console.log(e)
        new Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'ee', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'ee', () => {
        map.getCanvas().style.cursor = '';
    });

    // for (let i = 0; i < 10000; i++) {
    //     const feature = roads[i]
    //     map.addSource(feature._id, {
    //         type: 'geojson',
    //         data: feature
    //     });
    //     map.addLayer({
    //         id: feature._id,
    //         type: 'line',
    //         source: feature._id
    //     })
    // }


});

async function getRoads() {
    const res = await fetch('http://localhost:3000/roads')
    return res.json()
}



