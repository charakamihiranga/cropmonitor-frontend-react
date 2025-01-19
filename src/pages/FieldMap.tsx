import { useState, useEffect } from 'react';
import { Field } from "../model/Field";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface FieldProps {
    fields: Field[];
}

function FieldMap({ fields }: Readonly<FieldProps>) {
    const [viewport, setViewport] = useState({
        latitude: 6.9271,
        longitude: 79.8612,
        zoom: 15,
    });

    // Custom icon for the marker
    const customIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41], // Size of the marker
        iconAnchor: [12, 41], // Anchor point of the marker
        popupAnchor: [1, -34], // Position of the popup relative to the marker
    });

    // Adjust the map bounds if there are fields
    const AdjustMapBounds = () => {
        const map = useMap();
        useEffect(() => {
            if (fields.length > 0) {
                const bounds = fields.map((field) => [
                    field.fieldLocation.latitude,
                    field.fieldLocation.longitude,
                ]);
                map.fitBounds(bounds); // Automatically fit the map bounds based on markers
            }
        }, [fields, map]);
        return null; // This component does not render anything directly
    };

    function handleMarkClick(field: Field) {
        console.log(field);
    }

    return (
        <div className="rounded-lg overflow-hidden">
            <MapContainer
                className="z-40"
                center={[viewport.latitude, viewport.longitude]}
                zoom={viewport.zoom}
                style={{ width: '100%', height: '70vh' }}
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='&copy; <a href="https://www.esri.com/en-us/arcgis/products/arcgis-online/overview">Esri</a>'
                />
                <AdjustMapBounds />
                {fields.length === 0 ? (
                    <Marker position={[6.9271, 79.8612]} icon={customIcon}>
                        <Tooltip>
                            <div className="p-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-lg">
                                <h3 className="font-semibold text-sm mb-1">No Fields</h3>
                                <p className="text-xs text-gray-300 mb-1">
                                    <i className="fa-solid fa-map-marker-alt mr-1"></i> Colombo, Sri Lanka
                                </p>
                            </div>
                        </Tooltip>
                    </Marker>
                ) : (
                    fields.map((field) => (
                        <Marker
                            key={field.fieldCode}
                            position={[field.fieldLocation.latitude, field.fieldLocation.longitude]}
                            icon={customIcon} // Apply custom icon to the marker
                            eventHandlers={{
                                click: () => handleMarkClick(field),
                            }}
                        >
                            <Tooltip className="custom-tooltip" sticky>
                                <div className="p-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-lg">
                                    <h3 className="font-semibold text-sm mb-1">{field.fieldName}</h3>
                                    <p className="text-xs text-gray-300 mb-1">
                                        <i className="fa-solid fa-chart-area mr-1"></i> {field.fieldSize} hectares
                                    </p>
                                </div>
                            </Tooltip>
                        </Marker>
                    ))
                )}
            </MapContainer>
        </div>
    );
}

export default FieldMap;
