// src/store/appReducer.js
export const initialState = {
  auth: {
    user: null,
    token: null,
    role: null, // "ADMIN" | "ENGINEER" | "TECHNICIAN" | "VIEWER"
  },
  map: {
    drawMode: "none", // "none" | "odp" | "route"
    selectedFeatureId: null,
  },
  planning: {
    activeRoute: null, // { id, name, type, coordinates: [ {lon,lat,height} ], lengthMeters, cost }
    draftRoute: null,
  },
  pricing: {
    cableTypes: [
      { id: "drop_core2", name: "Dropcore 2C", pricePerMeter: 5000 },
      { id: "distrib_12", name: "Distribusi 12C", pricePerMeter: 7000 },
    ],
    selectedCableTypeId: "drop_core2",
  },
  assets: {
    odp: [], // {id,name,lon,lat,capacity,usedPorts}
    customers: [],
  },
};

export function appReducer(state, action) {
  switch (action.type) {
    case "AUTH/LOGIN_SUCCESS":
      return {
        ...state,
        auth: {
          user: action.payload.user,
          token: action.payload.token,
          role: action.payload.role,
        },
      };
    case "AUTH/LOGOUT":
      return { ...state, auth: initialState.auth };

    case "MAP/SET_DRAW_MODE":
      return {
        ...state,
        map: { ...state.map, drawMode: action.payload },
      };

    case "PLANNING/SET_DRAFT_ROUTE":
      return {
        ...state,
        planning: { ...state.planning, draftRoute: action.payload },
      };

    case "PLANNING/FINALIZE_ROUTE":
      return {
        ...state,
        planning: {
          ...state.planning,
          activeRoute: action.payload,
          draftRoute: null,
        },
      };

    case "PRICING/UPDATE_CABLE_PRICE":
      return {
        ...state,
        pricing: {
          ...state.pricing,
          cableTypes: state.pricing.cableTypes.map((cable) =>
            cable.id === action.payload.id
              ? { ...cable, pricePerMeter: action.payload.pricePerMeter }
              : cable
          ),
        },
      };

    case "PRICING/SET_SELECTED_CABLE_TYPE":
      return {
        ...state,
        pricing: {
          ...state.pricing,
          selectedCableTypeId: action.payload,
        },
      };

    case "ASSETS/ADD_ODP":
      return {
        ...state,
        assets: {
          ...state.assets,
          odp: [...state.assets.odp, action.payload],
        },
      };

    default:
      return state;
  }
}
