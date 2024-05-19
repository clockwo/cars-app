import type { Vehicle } from '@/shared/interfaces/vehicle.interface';
import {
  YMap,
  YMapComponentsProvider,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultMarker,
  YMapDefaultSchemeLayer,
  YMapGeolocationControl,
  YMapZoomControl,
} from 'ymap3-components';

const API_KEY = '02162b1b-fe11-444b-8b49-4cc1f5cfd069';
const Map = ({ cars }: { cars: Vehicle[] }) => {
  return (
    <YMapComponentsProvider apiKey={API_KEY} lang="en_EN">
      <YMap
        location={{ center: [30.3609, 59.9311], zoom: 12 }}
        mode="vector"
        theme="dark"
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        {cars.map((car) => (
          <YMapDefaultMarker
            key={car.id}
            coordinates={[car.longitude, car.latitude]}
            title={car.name}
            subtitle={car.model}
            color={car.color}
          />
        ))}
        <YMapControls position="bottom">
          <YMapZoomControl />
        </YMapControls>
        <YMapControls position="bottom left">
          <YMapGeolocationControl />
        </YMapControls>
      </YMap>
    </YMapComponentsProvider>
  );
};

export default Map;
