namespace HFFormdefinition.MLMaps {
    export function on3DMapLoaded(mapCtrl: MLBaseMap) {;
        HybridForms.API.FormDefinition.getAttachmentUrl('map.layer-source.json')
        .then((url) => {
            return new Promise<Uint8Array>((resolve) => {
                const request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.onload = function () {
                    resolve(request.response);
                };
                request.send();
            });
        })
        .then((result: any) => {
            if (result) {
                return JSON.parse(result);
            } else {
                return Promise.reject('No data found');
            }           
            
        }).then((layerSource) => {
            mapCtrl.map.addLayer({
                'id': 'Baudenkmal',
                'type': "fill-extrusion",
                'source': layerSource,
                'paint': {
                    'fill-extrusion-color': 'rgba(215, 59, 59, 1)',
                    'fill-extrusion-opacity': 0.8,
                    'fill-extrusion-height': 20
                }
            });

        }).catch((error) => {
            HybridForms.API.Log.error('Error loading layer source');
            HybridForms.API.Log.error(error);
        });
    }

    export function onMarkerSet(mapItem: IHFMap, position: IHFLocation) {
        console.log('do something after a marker has been set');
        console.log('mapItem: ', mapItem);
        console.log('position: ', position);
    }

    export function onTerrainMapLoad(mapCtrl: any) {
        mapCtrl.map.addSource('terrain', {
            type: 'raster-dem',
            url: 'https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=Fp4bZeZ9cSvha9o2kQX8',
        });
        mapCtrl.map.setTerrain({ source: 'terrain' });
    }
}
