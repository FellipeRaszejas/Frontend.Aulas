import { useEffect, useState } from 'react';
// import {
//   APIProvider,
//   Map as MapaGoogle,
//   AdvancedMarker,
//   Pin,
//   useMapsLibrary,
// } from '@vis.gl/react-google-maps';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID || 'DEMO_MAP_ID';
const ENDERECO = 'Escola SENAI Gaspar Ricardo Júnior, Sorocaba, SP, Brasil';
const FALLBACK = { lat: -23.5015, lng: -47.4526 }; // centro de Sorocaba

function MapaInterno() {
  const geocodingLib = useMapsLibrary('geocoding');
  const [local, setLocal] = useState(null);
  const [endereco, setEndereco] = useState('');
  const [aviso, setAviso] = useState('');

  // useEffect: busca as coordenadas do endereço assim que a biblioteca carrega
  useEffect(() => {
    if (!geocodingLib) return;

    const geocoder = new geocodingLib.Geocoder();
    geocoder.geocode({ address: ENDERECO }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const loc = results[0].geometry.location;
        setLocal({ lat: loc.lat(), lng: loc.lng() });
        setEndereco(results[0].formatted_address);
      } else {
        setLocal(FALLBACK);
        setAviso(`Endereço não encontrado (${status}). Mostrando o centro de Sorocaba.`);
      }
    });
  }, [geocodingLib]);

  if (!local) return <p className="status">Localizando o SENAI...</p>;

  return (
    <>
      <div className="mapa">
        <MapaGoogle defaultCenter={local} defaultZoom={16} mapId={MAP_ID} gestureHandling="greedy">
          <AdvancedMarker position={local} title="SENAI Gaspar Ricardo Júnior">
            <Pin background="#c40f1f" borderColor="#5c0008" glyphColor="#ffffff" />
          </AdvancedMarker>
        </MapaGoogle>
      </div>
      <p className="mapa-info">{endereco || aviso}</p>
    </>
  );
}

export default function MapaSenai() {
  if (!API_KEY) {
    return (
      <p className="aviso">
        Defina VITE_GOOGLE_MAPS_API_KEY no arquivo .env e reinicie o npm run dev.
      </p>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} libraries={['geocoding']}>
      <MapaInterno />
    </APIProvider>
  );
}