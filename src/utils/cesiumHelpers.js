// src/utils/cesiumHelpers.js
import { Cartesian3, EllipsoidGeodesic, Cartographic, Math as CesiumMath } from "cesium";

export function computePolylineLengthMeters(positionsCartesian) {
  if (!positionsCartesian || positionsCartesian.length < 2) return 0;

  let total = 0;
  for (let i = 0; i < positionsCartesian.length - 1; i++) {
    const c1 = Cartographic.fromCartesian(positionsCartesian[i]);
    const c2 = Cartographic.fromCartesian(positionsCartesian[i + 1]);

    const geodesic = new EllipsoidGeodesic(c1, c2);
    total += geodesic.surfaceDistance;
  }
  return total; // meter
}

export function toLonLatHeight(cartesian) {
  const carto = Cartographic.fromCartesian(cartesian);
  return {
    lon: CesiumMath.toDegrees(carto.longitude),
    lat: CesiumMath.toDegrees(carto.latitude),
    height: carto.height,
  };
}
