"use client"
import {MapContainer, TileLayer, Marker} from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";
const ICON = icon({
    iconUrl: 
    "https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
    iconSize: [50, 50],

});
export default function Map({locationValue}: {locationValue: string} ){
    const {getCountryByValue} = useCountries();
    const latLang = getCountryByValue(locationValue)?.latLang;
    return (
        <MapContainer
             zoom={13} 
             className="h-[50vh] rounded-lg relative z-0"
             scrollWheelZoom={false} 
             center={latLang ?? [52.505, -0.09]}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latLang ?? [52.505, -0.09]} icon={ICON}/>
                
        </MapContainer>
    );
}