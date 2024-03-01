/**
 * This is a configuration javascript file to create a layers list for pdok api
 *
 * At this moment it can contain 2 layertypes: WMTS (preferred) and WMS
 *
 * A layer Object is an Object with properties with OpenLayers-Layer property names
 * Only 'layertype' and 'name' are unique for the api
 *
 * NOTE: because we use OpenLayers properties, the property names are type aware:
 * eg: for a WMTS the layernames is defined in a 'layer' property
 * while for a WMS it is called 'layers' (mind the s on the end)
 */

Pdok.Api.prototype.defaultLayers = {
  AHN3_5M_DSM: {
    layertype: "WMS",
    name: "AHN3 - 1/2m Digital Surface Model (DSM) (WMS)",
    url: "https://service.pdok.nl/rws/ahn/wms/v1_0?",
    layer: "dsm_05m",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
  },
  AHN3_5M_DTM: {
    layertype: "WMS",
    name: "AHN3 - 1/2m Digital Terrain Model (DTM) (WMS)",
    url: "https://service.pdok.nl/rws/ahn/wms/v1_0?",
    layers: "dtm_05m",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
  },
  AHN3_0_5M_DSM: {
    layertype: "WMS",
    name: "AHN3 - 0.5m Digital Surface Model (DSM) (WMS)",
    url: "https://service.pdok.nl/rws/ahn/wms/v1_0?",
    layers: "dsm_05m",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
  },
  AHN3_0_5M_DTM: {
    layertype: "WMS",
    name: "AHN3 - 0.5m Digital Terrain Model (DTM) (WMS)",
    url: "https://service.pdok.nl/rws/ahn/wms/v1_0?",
    layers: "dtm_05m",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
  },
  BAG_LIGPLAATS: {
    layertype: "WMS",
    name: "BAG - Ligplaats (WMS)",
    url: "https://service.pdok.nl/lv/bag/wms/v2_0",
    layers: "ligplaats",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BAG_PAND: {
    layertype: "WMS",
    name: "BAG - Pand (WMS)",
    url: "https://service.pdok.nl/lv/bag/wms/v2_0",
    layers: "pand",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BAG_STANDPLAATS: {
    layertype: "WMS",
    name: "BAG - Standplaats (WMS)",
    url: "https://service.pdok.nl/lv/bag/wms/v2_0",
    layers: "standplaats",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BAG_VERBLIJFSOBJECT: {
    layertype: "WMS",
    name: "BAG - Verblijfsobject (WMS)",
    url: "https://service.pdok.nl/lv/bag/wms/v2_0",
    layers: "verblijfsobject",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BAG_WOONPLAATS: {
    layertype: "WMS",
    name: "BAG - Woonplaats (WMS)",
    url: "https://service.pdok.nl/lv/bag/wms/v2_0",
    layers: "woonplaats",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BBG2010: {
    layertype: "WMS",
    name: "BBG - Bestand Bodemgebruik 2010 (WMS)",
    url: "https://service.pdok.nl/cbs/bestandbodemgebruik/2010/wms/v1_0",
    layers: "bestand_bodemgebruik_2010_bodemgebruik",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BBG2010_hoofdgroep: {
    layertype: "WMS",
    name: "BBG - Bestand Bodemgebruik 2010 Hoofdgroep (WMS)",
    url: "https://service.pdok.nl/cbs/bestandbodemgebruik/2010/wms/v1_0",
    layers: "bestand_bodemgebruik_2010",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BBG2015: {
    layertype: "WMS",
    name: "BBG - Bestand Bodemgebruik 2015 (WMS)",
    url: "https://service.pdok.nl/cbs/bestandbodemgebruik/2015/wms/v1_0",
    layers: "bestand_bodemgebruik_2015_bodemgebruik",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BBG2015_hoofdgroep: {
    layertype: "WMS",
    name: "BBG - Bestand Bodemgebruik 2015 Hoofdgroep (WMS)",
    url: "https://service.pdok.nl/cbs/bestandbodemgebruik/2015/wms/v1_0",
    layers: "bestand_bodemgebruik_2015",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BBG2017: {
    layertype: "WMS",
    name: "BBG - Bestand Bodemgebruik 2017 (WMS)",
    url: "https://service.pdok.nl/cbs/bestandbodemgebruik/2017/wms/v1_0",
    layers: "bestandbodemgebruik_2017_categorie",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BBG2017_hoofdgroep: {
    layertype: "WMS",
    name: "BBG - Bestand Bodemgebruik 2017 Hoofdgroep (WMS)",
    url: "https://service.pdok.nl/cbs/bestandbodemgebruik/2017/wms/v1_0",
    layers: "bestandbodemgebruik_2017_hoofdgroep",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BG_PROVINCIEGRENZEN: {
    layertype: "WMS",
    name: "Bestuurlijke Gebieden - Provinciegebied (WMS)",
    url: "https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0",
    layers: "Provinciegebied",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BG_GEMEENTEGRENZEN: {
    layertype: "WMS",
    name: "Bestuurlijke Gebieden - Gemeentegebied (WMS)",
    url: "https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0",
    layers: "Gemeentegebied",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  BG_LANDSGRENS: {
    layertype: "WMS",
    name: "Bestuurlijke Gebieden - Landgebied (WMS)",
    url: "https://service.pdok.nl/kadaster/bestuurlijkegebieden/wms/v1_0",
    layers: "Landgebied",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CULTUURHISTORISCHEOBJECTEN_ELEMENTEN: {
    layertype: "WMS",
    name: "Cultuurhistorische objecten - Elementen (WMS)",
    url: "https://services.rce.geovoorziening.nl/cultgis/wms",
    layers: "elementen",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CULTUURHISTORISCHEOBJECTEN_AANDACHTSGEBIEDEN: {
    layertype: "WMS",
    name: "Cultuurhistorische objecten - Aandachtsgebieden (WMS)",
    url: "https://services.rce.geovoorziening.nl/cultgis/wms",
    layers: "aandachtsgebied",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CULTUURHISTORISCHEOBJECTEN_DEELLANDSCHAPPEN: {
    layertype: "WMS",
    name: "Cultuurhistorische objecten - Deellandschappen (WMS)",
    url: "https://services.rce.geovoorziening.nl/cultgis/wms",
    layers: "deellandschap",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CULTUURHISTORISCHEOBJECTEN_LANDSCHAPPEN: {
    layertype: "WMS",
    name: "Cultuurhistorische objecten - Landschappen (WMS)",
    url: "https://services.rce.geovoorziening.nl/cultgis/wms",
    layers: "landschap",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CULTUURHISTORISCHEOBJECTEN_REGIOS: {
    layertype: "WMS",
    name: "Cultuurhistorische objecten - Regio's (WMS)",
    url: "https://services.rce.geovoorziening.nl/cultgis/wms",
    layers: "regios",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  INSPIRE_ADRESSEN: {
    layertype: "WMS",
    name: "Adressen (WMS)",
    url: "https://service.pdok.nl/kadaster/ad/wms/v1_0",
    layers: "AD.Address",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  LAWROUTES: {
    layertype: "WMS",
    name: "Lange-afstandswandelroutes (WMS)",
    url: "https://service.pdok.nl/wandelnet/landelijke-wandelroutes/wms/v1_0",
    layers: "landelijke-wandelroutes",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  LFROUTES: {
    layertype: "WMS",
    name: "Landelijke Fietsroutes (WMS)",
    url: " https://service.pdok.nl/fietsplatform/landelijke-fietsroutes/wms/v1_0",
    layers: "landelijke-fietsroutes",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  PDOK_luchtfoto: {
    layertype: "WMTS",
    name: "PDOK Luchtfoto Actueel Ortho 25cm RGB (WMTS)",
    url: "https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0?",
    version: "1.3.0",
    layer: "Actueel_ortho25",
    style: "",
    matrixSet: "EPSG:28992",
    visibility: true,
    isBaseLayer: true,
    format: "image/jpeg",
    attribution:
      '<a href="https://www.pdok.nl/introductie/-/article/luchtfoto-pdok" target="_blank">&copy; CC-BY-NC</a>',
    zoomOffset: 2,
  },
  PDOK_luchtfoto: {
    layertype: "WMTS",
    name: "PDOK Luchtfoto Actueel Ortho 8cm RGB(WMTS)",
    url: "https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0?",
    version: "1.3.0",
    layer: "Actueel_orthoHR",
    style: "",
    matrixSet: "EPSG:28992",
    visibility: true,
    isBaseLayer: true,
    format: "image/jpeg",
    attribution:
      '<a href="https://www.pdok.nl/introductie/-/article/luchtfoto-pdok" target="_blank">&copy; CC-BY-NC</a>',
    zoomOffset: 2,
  },
  NATURA2000: {
    layertype: "WMTS",
    name: "Natura 2000 (WMTS)",
    url: "https://geodata.nationaalgeoregister.nl/tiles/service/wmts?",
    layer: "natura2000",
    style: null,
    matrixSet: "EPSG:28992",
    visibility: true,
    isBaseLayer: false,
  },
  PUBLIEKRECHTELIJKEBEPERKING: {
    layertype: "WMS",
    name: "Publiekrechtelijke Beperkingen (WMS)",
    url: "https://service.pdok.nl/kadaster/wkpb/wms/v1_0?",
    layers: "wetbodembescherming",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  STREEKPADEN: {
    layertype: "WMS",
    name: "Regionale Wandelnetwerken - Wandelnetwerken (WMS)",
    url: " https://service.pdok.nl/wandelnet/regionale-wandelnetwerken/wms/v1_0",
    layers: "wandelnetwerken",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  STREEKKNOOPUNTEN: {
    layertype: "WMS",
    name: "Regionale Wandelnetwerken - Wandelknooppunten (WMS)",
    url: " https://service.pdok.nl/wandelnet/regionale-wandelnetwerken/wms/v1_0",
    layers: "wandelknooppunten",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  SPOORWEGEN_TRACE: {
    layertype: "WMS",
    name: "Spoorwegen trace (spoorbaanhartlijn) (WMS)",
    url: " https://service.pdok.nl/prorail/spoorwegen/wms/v1_0?",
    layers: "trace",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  SPOORWEGEN_KILOMETRERING: {
    layertype: "WMS",
    name: "Spoorwegen kilometrering (spoorbaanhartpunt) (WMS)",
    url: " https://service.pdok.nl/prorail/spoorwegen/wms/v1_0?",
    layers: "kilometrering",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  SPOORWEGEN_SPOORAS: {
    layertype: "WMS",
    name: "Spoorwegen spooras (WMS)",
    url: " https://service.pdok.nl/prorail/spoorwegen/wms/v1_0?",
    layers: "spooras",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  SPOORWEGEN_WISSEL: {
    layertype: "WMS",
    name: "Spoorwegen wissel (WMS)",
    url: " https://service.pdok.nl/prorail/spoorwegen/wms/v1_0?",
    layers: "wissel",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  SPOORWEGEN_KRUISING: {
    layertype: "WMS",
    name: "Spoorwegen kruising (WMS)",
    url: " https://service.pdok.nl/prorail/spoorwegen/wms/v1_0?",
    layers: "kruising",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  SPOORWEGEN_STATION: {
    layertype: "WMS",
    name: "Spoorwegen station (WMS)",
    url: " https://service.pdok.nl/prorail/spoorwegen/wms/v1_0?",
    layers: "station",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  SPOORWEGEN_OVERWEG: {
    layertype: "WMS",
    name: "Spoorwegen overweg (WMS)",
    url: " https://service.pdok.nl/prorail/spoorwegen/wms/v1_0?",
    layers: "overweg",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  TOP10NL: {
    layertype: "WMTS",
    name: "TOP10 NL (WMTS)",
    url: "https://service.pdok.nl/brt/top10nl/wmts/v1_0?",
    layer: "top10nl",
    style: null,
    matrixSet: "EPSG:28992",
    visibility: true,
    isBaseLayer: false,
    attribution: "(c) Kadaster",
  },
  CBS_WIJKENENBUURTEN_CBSBUURTEN2019: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Buurten 2019 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2019/wms/v1_0?",
    layers: "cbs_buurten_2019",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSWIJKEN2019: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Wijken 2019 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2019/wms/v1_0?",
    layers: "cbs_wijken_2019",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSGEMEENTEN2019: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Gemeenten 2019 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2019/wms/v1_0?",
    layers: "gemeenten2019",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSBUURTEN2020: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Buurten 2020 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2020/wms/v1_0?",
    layers: "cbs_buurten_2020",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSWIJKEN2020: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Wijken 2020 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2020/wms/v1_0?",
    layers: "cbs_wijken_2020",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSGEMEENTEN2020: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Gemeenten 2020 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2020/wms/v1_0?",
    layers: "gemeenten2020",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSBUURTEN2021: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Buurten 2021 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2021/wms/v1_0?",
    layers: "cbs_buurten_2021",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSWIJKEN2021: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Wijken 2021 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2021/wms/v1_0?",
    layers: "cbs_wijken_2021",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSGEMEENTEN2021: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Gemeenten 2021 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2021/wms/v1_0?",
    layers: "gemeenten2021",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSGEMEENTEN2022: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Gemeenten 2022 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2022/wms/v1_0?",
    layers: "gemeenten",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSBUURTEN2018: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Buurten 2018 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2018/wms/v1_0?",
    layers: "cbs_buurten_2018",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSWIJKEN2018: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Wijken 2018 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2018/wms/v1_0?",
    layers: "cbs_wijken_2018",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSGEMEENTEN2018: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Gemeenten 2018 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2018/wms/v1_0?",
    layers: "gemeenten2018",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSBUURTEN2017: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Buurten 2017 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2017/wms/v1_0?",
    layers: "cbs_buurten_2017",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSWIJKEN2017: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Wijken 2017 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2017/wms/v1_0?",
    layers: "cbs_wijken_2017",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSGEMEENTEN2017: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Gemeenten 2017 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2017/wms/v1_0?",
    layers: "gemeenten2017",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSBUURTEN2012: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Buurten 2012 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2012/wms/v1_0?",
    layers: "cbs_buurten_2012",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSWIJKEN2012: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Wijken 2012 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2012/wms/v1_0?",
    layers: "cbs_wijken_2012",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
  CBS_WIJKENENBUURTEN_CBSGEMEENTEN2012: {
    layertype: "WMS",
    name: "CBS Wijken en buurten - Gemeenten 2012 (WMS)",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2012/wms/v1_0?",
    layers: "gemeenten2012",
    transparent: "true",
    format: "image/png",
    visibility: true,
    isBaseLayer: false,
    singleTile: true,
  },
};
