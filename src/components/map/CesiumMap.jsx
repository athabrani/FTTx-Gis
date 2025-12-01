// src/components/map/CesiumMap.jsx
import React, { useEffect, useRef } from "react";
import {
  Viewer,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartesian3,
  Color,
  PolylineGraphics,
  Entity,
  SceneMode,
} from "cesium";
import { DEFAULT_MAP_VIEW } from "../../config/appConfig";
import { useAppState } from "../../store/AppContext";
import { computePolylineLengthMeters, toLonLatHeight } from "../../utils/cesiumHelpers";

export default function CesiumMap() {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const drawingStateRef = useRef({ draftPositions: [] });

  const { state, dispatch } = useAppState();
  const { drawMode } = state.map;
  const { pricing } = state;

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer(containerRef.current, {
      animation: false,
      baseLayerPicker: true,
      geocoder: false,
      homeButton: true,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: true,
      timeline: false,
      navigationHelpButton: false,
    });

    viewer.scene.mode = SceneMode.SCENE2D;

    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(
        DEFAULT_MAP_VIEW.lon,
        DEFAULT_MAP_VIEW.lat,
        DEFAULT_MAP_VIEW.height
      ),
    });

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction((click) => {
      const pickedPosition = viewer.scene.pickPosition(click.position);
      if (!pickedPosition) return;

      if (drawMode === "odp") {
        const coords = toLonLatHeight(pickedPosition);
        const id = `ODP_${Date.now()}`;

        viewer.entities.add({
          id,
          position: Cartesian3.fromDegrees(coords.lon, coords.lat),
          point: {
            pixelSize: 12,
            color: Color.ORANGE,
            outlineColor: Color.BLACK,
            outlineWidth: 1,
          },
          label: {
            text: id,
            font: "12px sans-serif",
            fillColor: Color.WHITE,
            outlineColor: Color.BLACK,
            outlineWidth: 2,
            pixelOffset: { x: 0, y: -20 },
          },
        });

        dispatch({
          type: "ASSETS/ADD_ODP",
          payload: {
            id,
            name: id,
            lon: coords.lon,
            lat: coords.lat,
            capacity: 16,
            usedPorts: 0,
          },
        });
      }

      if (drawMode === "route") {
        drawingStateRef.current.draftPositions.push(pickedPosition);

        if (!drawingStateRef.current.polylineEntity) {
          const polylineEntity = viewer.entities.add({
            polyline: {
              positions: new PolylineGraphics({
                positions: drawingStateRef.current.draftPositions,
              }),
              width: 3,
              material: Color.CYAN,
            },
          });
          drawingStateRef.current.polylineEntity = polylineEntity;
        } else {
          drawingStateRef.current.polylineEntity.polyline.positions =
            drawingStateRef.current.draftPositions;
        }
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    // Double click untuk finalize route
    handler.setInputAction(() => {
      if (drawMode !== "route") return;

      const positions = drawingStateRef.current.draftPositions;
      if (!positions || positions.length < 2) return;

      const lengthMeters = computePolylineLengthMeters(positions);
      const selectedCable =
        pricing.cableTypes.find((c) => c.id === pricing.selectedCableTypeId) ||
        pricing.cableTypes[0];

      const cost = lengthMeters * (selectedCable?.pricePerMeter || 0);

      const coordinates = positions.map(toLonLatHeight);

      const route = {
        id: `ROUTE_${Date.now()}`,
        name: "Draft Route",
        type: "DISTRIBUSI",
        coordinates,
        lengthMeters: Math.round(lengthMeters),
        cost: Math.round(cost),
        cableTypeId: selectedCable.id,
      };

      dispatch({ type: "PLANNING/FINALIZE_ROUTE", payload: route });

      drawingStateRef.current = { draftPositions: [], polylineEntity: null };
    }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    viewerRef.current = viewer;

    return () => {
      handler.destroy();
      viewer.destroy();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} className="w-full h-full" />;
}
