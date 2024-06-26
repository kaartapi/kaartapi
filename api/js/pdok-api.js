/** 
 * Pdok namespace, will hold Api namespace
 * @namespace 
 */
var Pdok = Pdok || {};
window.Pdok = Pdok;

// current PdokKaartApi version
Pdok.API_VERSION_NUMBER = '1.0.0';


// CONFIGURATION
// NOTE: for proxy it is best to use something like:
//   OpenLayers.ProxyHost = window.location.protocol + "//" + window.location.host + "/proxy?url=";
// Using https:// results in cross-origin problems when viewed via http

// KaartApi LOKET PRODUKTIE
//Pdok.ApiUrl = 'https://kaartapi.nl/api';
//OpenLayers.ProxyHost = window.location.protocol + "//" + window.location.host + "/proxy.php?url="; // kaart.pdok.nl

var protocol = window.location.protocol;
if (window.location.protocol == 'file:') {
	protocol = 'https:'
}

// DEV
Pdok.ApiUrl = protocol + '//kaartapi.nl/api';
//OpenLayers.ProxyHost = window.location.protocol + "//" + window.location.host + "/proxy?url="; 

/**
 * @class Pdok.Api
 *
 * 
 * Class implements an API for an easy to use embedding of
 * our pre-defined mapservices in any website with an OpenLayers slippy map.
 * This class is based upon the Terrestris WMS-API
 * The markerstyles are based upon the Mapicons from Nicolas Mollet (http://mapicons.nicolasmollet.com)
 * 
 * @examples
 * 
 *  <iframe width="400" height="300" frameborder="0" 
 *    scrolling="no" marginheight="0" marginwidth="0" 
 *    src="api/api.html?mloc=136260,456394&loc=136260,456394&zoom=8"
 *  >
 * OR
 *  <iframe width="400" height="300" frameborder="0" 
 *    scrolling="no" marginheight="0" marginwidth="0" 
 *    src="api/api.html?mloc=136260,456394&bbox=130000,450000,150000,470000"
 *  >
 */


Pdok.absoluteUri = function(relative) {
    var base = Pdok.createBaseUri();
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] === ".")
            continue;
        if (parts[i] === "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
};
// The api-url is the base-url for api.js, markersdefs, layerdefs etc
// The proxyhost is needed for the geocoder

Pdok.createBaseUri = function(){
    var pathname = window.location.pathname;
    var path = pathname;
    if (pathname.search(/\.html|\.php|.jsp/)>0){
        pathparts = pathname.substr(0,pathname.search(/\.html|\.php|.jsp/)).split('/');
        path = pathparts.slice(0, pathparts.length-1);
        path = path.join('/');
        path +='/';
    }
    base = window.location.protocol+'//'+window.location.host + path;
    return base;
};


OpenLayers.ImgPath = Pdok.ApiUrl + '/img/';
OpenLayers.Feature.Vector.style['default'].strokeColor = 'red';
OpenLayers.Feature.Vector.style['default'].fillColor = 'red';
OpenLayers.Feature.Vector.style['default'].pointRadius = 5;
OpenLayers.Feature.Vector.style['default'].fillOpacity = 0.8;
// small point otherwise we see circle
OpenLayers.Feature.Vector.style['temporary'].pointRadius = 0;
OpenLayers.Feature.Vector.style['temporary'].strokeColor = 'red';
OpenLayers.Feature.Vector.style['temporary'].fillColor = 'red';
// some translations
OpenLayers.Lang["nl"] = OpenLayers.Util.applyDefaults({
    'unhandledRequest': "Het verzoek is niet afgehandeld met de volgende melding: ${statusText}",
    'Permalink': "Permanente verwijzing",
    'Overlays': "Kaartlagen",
    'Base Layer': "Ondergrond",
    'noFID': "Een optie die geen FID heeft kan niet bijgewerkt worden.",
    'browserNotSupported': "Uw browser ondersteunt het weergeven van vectoren niet.\nMomenteel ondersteunde weergavemogelijkheden:\n${renderers}",
    'minZoomLevelError': "De eigenschap minZoomLevel is alleen bedoeld voor gebruik lagen met die afstammen van FixedZoomLevels-lagen.\nDat deze WFS-laag minZoomLevel controleert, is een overblijfsel uit het verleden.\nWe kunnen deze controle echter niet verwijderen zonder op OL gebaseerde applicaties die hervan afhankelijk zijn stuk te maken.\nDaarom heeft deze functionaliteit de eigenschap \'deprecated\' gekregen - de minZoomLevel wordt verwijderd in versie 3.0.\nGebruik in plaats van deze functie de mogelijkheid om min/max voor resolutie in te stellen zoals op de volgende pagina wordt beschreven:\nhttp://trac.openlayers.org/wiki/SettingZoomLevels",
    'commitSuccess': "WFS-transactie: succesvol ${response}",
    'commitFailed': "WFS-transactie: mislukt ${response}",
    'googleWarning': "De Google-Layer kon niet correct geladen worden.\x3cbr /\x3e\x3cbr /\x3e\nOm deze melding niet meer te krijgen, moet u een andere achtergrondkaart kiezen in de laagwisselaar in de rechterbovenhoek.\x3cbr /\x3e\x3cbr /\x3e\nDit komt waarschijnlijk doordat de bibliotheek ${layerLib} niet correct ingevoegd is.\x3cbr /\x3e\x3cbr /\x3e\nOntwikkelaars: \x3ca href=\'http://trac.openlayers.org/wiki/${layerLib}\' target=\'_blank\'\x3eklik hier\x3c/a\x3e om dit werkend te krijgen.",
    'getLayerWarning': "De laag ${layerType} kon niet goed geladen worden.\x3cbr /\x3e\x3cbr /\x3e\nOm deze melding niet meer te krijgen, moet u een andere achtergrondkaart kiezen in de laagwisselaar in de rechterbovenhoek.\x3cbr /\x3e\x3cbr /\x3e\nDit komt waarschijnlijk doordat de bibliotheek ${layerLib} niet correct is ingevoegd.\x3cbr /\x3e\x3cbr /\x3e\nOntwikkelaars: \x3ca href=\'http://trac.openlayers.org/wiki/${layerLib}\' target=\'_blank\'\x3eklik hier\x3c/a\x3e om dit werkend te krijgen.",
    'Scale = 1 : ${scaleDenom}': "Schaal = 1 : ${scaleDenom}",
    'W': "W",
    'E': "O",
    'N': "N",
    'S': "Z",
    'reprojectDeprecated': "U gebruikt de optie \'reproject\' op de laag ${layerName}.\nDeze optie is vervallen: deze optie was ontwikkeld om gegevens over commerciële basiskaarten weer te geven, maar deze functionaliteit wordt nu bereikt door ondersteuning van Spherical Mercator.\nMeer informatie is beschikbaar op http://trac.openlayers.org/wiki/SphericalMercator.",
    'methodDeprecated': "Deze methode is verouderd en wordt verwijderd in versie 3.0.\nGebruik ${newMethod}."
});
OpenLayers.Lang.setCode('nl'); 


Proj4js.defs["EPSG:28992"] = "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.040,49.910,465.840,-0.40939,0.35971,-1.86849,4.0772";

Pdok.ready = (function (f){
    if(/in/.test(document.readyState)){
        setTimeout(function() {
            Pdok.ready(f);
        }, 9);
    }
    else{
        f()
    }
});

//http://stackoverflow.com/questions/3922139/add-css-to-head-with-javascript
Pdok.addcss = function(css){
    var fileref=document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", css);
    if (typeof fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
 };


/**
 * Creates an instance of the Pdok Api based on an optional config object <a href="#constructor">more ...</a>
 * 
 * <p>If there is not a config object, all properties of the api have a default value.</p>
 * 
 * The config object is a hash object like: <pre>{ loc:'150000,380000', div:'map' }</pre>
 * 
 * <p>The OpenLayers.Util.getParameters() function returns such an object.
 * Giving the possiblitiy to create an Api object which uses url params in just
 * two lines of code:</p>
 * <pre>
 *    var config = OpenLayers.Util.getParameters();
 *    api = Pdok.Api(config);
 * </pre>
 * All properties of the config object are overriding default values of Api
 *
 * @constructor
 * @this {Pdok.Api}
 * @param {Object} config A hash object with all possible config key/value pairs
 * @param {Function} callback the callback function
 */
Pdok.Api = function(config, callback) {
    if (config) {
        OpenLayers.Util.extend(Pdok, config);
    }

    /**
     * Url to a markersdefinition file.
     * <p>
     * This is a simple json file with actual style properies like from 
     * OpenLayers.Feature.Vector.style.default
     * An example:
     * <pre>
     * Pdok.Api.prototype.defaultStyles=[ 
     *         // all point marker styles will use mt0 as default 
     *         // so you only have to define the props that are different from mt0 
     *         // mt0, pt0, lt0 are defined in pdok-api.js, so defining it here will override that one 
     *     { 
     *         id: 'mt1', 
     *         name: 'Informatiebord blauw', 
     *         externalGraphic: Pdok.ApiUrl + '/markertypes/emblem-notice.png', 
     *         graphicHeight: 32, 
     *         graphicWidth: 32, 
     *         graphicYOffset: -16 
     *     }, 
     *     {
     *         id: 'pt18', 
     *         fillOpacity: 0.0, 
     *         strokeColor: 'orange', 
     *         strokeWidth: 2, 
     *         name: 'Oranje'
     *     },
     *     {
     *         id:'lt8',  
     *         strokeColor:'green',  
     *         strokeWidth:3,  
     *         strokeOpacity:0.5,  
     *         name:'groen 2px transparant'  
     *     }
     * ]
     * </pre>
     * </p>
     * @type url
     */
    this.markersdef = Pdok.markersdef || null;

    // an external layersdef is temporarily parked in Pdok.layersdef
    this.layersdef = Pdok.layersdef || null;
    
    // an address to search for
    this.q = Pdok.q;

    /**
     * The zoom level property = the zoom level to start in (between 0 and 14)
     * 
     * @type int
     */
    this.zoom = Pdok.zoom;

    /**
     * The location (x,y) to zoom to. A x,y commaseparated String (epsg:28992)
     * @type String
     */
    this.loc = Pdok.loc;

    /**
     * A boundingbox (w,s,e,n) to zoom to. A commaseparated String of west,south,east,north
     * @type String
     */
    this.bbox = Pdok.bbox;

    this.baselayers = Pdok.baselayers || [];

    /**
     * The actual ID of the baselayer to use (one out of 'baselayers' params)
     * @type {null|*|string}
     */
    this.baselayer  = Pdok.baselayer || null;

    /**
     * A commaseparated list of pdok id's (defined in pdok-layers.js). Eg: 'brt,top10'
     * @type String
     */
    this.overlays = Pdok.overlays || [];
    this.pdoklayers = Pdok.pdoklayers;
    
    /**
     * Reference to OpenLayers Map object
     * @type OpenLayers.Map
     */
    this.map = null;

    /**
     * The location to put a marker. mloc = markerlocation
     *
     * By giving a mloc param (eg 125000,450000) in the config or querystring, a marker will be placed on that point (using mt0 as style)
     * @type String
     */
    this.mloc = Pdok.mloc;

    /**
     * Reference to an image URL for the marker. To be used in combination with mloc
     *
     * It is overriding the mt0 externalGraphic image
     * @type URL
     */
    this.mimg = Pdok.mimg;

    /**
     * Markertype property. You can set a mt (styletype) for your mloc. Eg 'mt3'
     * @type String
     */
    this.mt = Pdok.mt;

    /**
     * If a popup should be used or not. Defaults to true
     * @type boolean
     */
    this.showPopup = Pdok.showpopup || true;

    /**
     * If a popup hover should be used or not Defaults to false
     * @type boolean
     */
    this.hoverPopup = Pdok.hoverPopup || false;

    /**
     * Reference to popup titel, only used in case of the use of mloc
     * @type String
     */
    this.titel = Pdok.titel;

    /**
     * Reference to popup text, only used in case of the use of mloc
     * @type String
     */
    this.tekst = Pdok.tekst;

    /**
     * an URL to a text file, to be used loaded as features
     *
     * The text file format is determined by the OpenLayers.Format.Text Class
     * 
     * <p>Examples of such txt files:
     * <pre>
     * point  title   description
     * # defaulting to epsg:28992 / RD
     * # !!!!!! FIRST Y THEN X
     * 517000,117960  foo omschrijving foo
     * 511800,222000  faa omschrijving faa
     * 541611,155111  fii omschrijving fii
     * # alternative epsg:4326 / LatLon
     * #52.64,4.84    foo omschrijving foo
     * #52.59,6.38    faa omschrijving faa
     * #51.73,5.39    fii omschrijving fii
     * <pre>
     * or 
     * <pre>
     * * lat  lon title   description
     * # defaulting to epsg:28992 / RD
     * # !!!!!! FIRST Y THEN X
     * 517000 117960  foo omschrijving foo
     * 511800 222000  faa omschrijving faa
     * 541611 155111  fii omschrijving fii
     * # alternative epsg:4326 / LatLon
     * #52.64 4.84    foo omschrijving foo
     * #52.59 6.38    faa omschrijving faa
     * #51.73 5.39    fii omschrijving fii
     * </pre>
     * or an example with images and their dimensions
     * <pre>
     * lat   lon title   description iconSize    iconOffset  icon
     * 450000 140000  Ministerie ELenI    Economische Zaken Landbouw en Innovatie 32,37   16,-37  https://kaart.pdok.nl/api/markertypes/flag-nl.png
     * 460000 160000  Kadaster    Kadaster    32,37   -16,-18 https://kaart.pdok.nl/api/markertypes/flag-blue.png
     * 470000 170000  Rijkswaterstaat Infrastructuur en Milieu    64,72   -32,-36 https://kaart.pdok.nl/api/markertypes/vlc.png
     * 480000 180000  Ministerie IenM Infrastructuur en Milieu    40,46   -20,-23 https://kaart.pdok.nl/api/markertypes/flag-blue.png
     * </pre>
     * </p>
     * @see <a href="../../../documentatie/examples/data/test1.txt">test1.txt</a>
     * @see <a href="../../../documentatie/examples/data/test2.txt">test2.txt</a>
     * @type URL
     */
    this.txturl = Pdok.txturl;

    /**
     * Wmts URL to be used as wmts layer. Always together with a wmtslayer and wmtsmatrixset parameter
     * @type URL
     */
    this.wmtsurl = Pdok.wmtsurl;

    /**
     * The layername of the wmts service. ALways together with a wmtsurl and wmtsmatrixset parameter
     * @type String
     */
    this.wmtslayer = Pdok.wmtslayer;

    /**
     * The matrixset of the wmts service. ALways together with a wmtsurl and wmtslayer parameter
     * @type String
     */
    this.wmtsmatrixset = Pdok.wmtsmatrixset;

    /**
     * The WMS url to be used as a wms layer. Always together with a wmslayers parameter
     * @type URL
     */
    this.wmsurl = Pdok.wmsurl;

    /**
     * The wms layers parameter, a commaseparated string of layername(s). Always together with a wmsurl parameter
     * @type String
     */
    this.wmslayers = Pdok.wmslayers;


    /**
     * The wmsinfoformat parameter, format of featureinfo
     *  currently only 'text/html' and 'text/plain' are supported
     * For the service from the this.wmsurl parameter there will be a featureinfocontrol created
     *
     * @type String
     */
    this.wmsinfoformat = Pdok.wmsinfoformat || 'none';

    /**
     * The TMS url to be loaded as a layer. Always together with tmslayer
     * @type URL
     */
    this.tmsurl = Pdok.tmsurl;
    /**
     * The tms layer parameter, a layer name of the tms service. Always together with a tmsurl parameter
     * @type String
     */
    this.tmslayer = Pdok.tmslayer;
    /**
     * The tmstype parameter, the image format to use (defaults to .png). Always together with a tmsurl and tmslayer parameter
     * @type String
     */
    this.tmstype = Pdok.tmstype || 'png';

    /**
     * Url to a KML file, to be used as feature layer (note that in KML coordinates always in wgs84/latlon)
     * <p>
     * An example of a minimalistic KML:
     * <pre>
     *  &lt;kml xmlns="http://earth.google.com/kml/2.0"&gt;
     *  &lt;Placemark&gt;
     *  &lt;name&gt;Naam&lt;/name&gt;
     *  &lt;description&gt;Omschrijving&lt;/description&gt;
     *  &lt;Point&gt;&lt;coordinates&gt;4.835397256016842,53.03622449301179&lt;/coordinates&gt;&lt;/Point&gt;
     *  &lt;/Placemark&gt;
     *  &lt;/kml&gt;·
     * <pre>
     * Or one in which we define one of our styletypes;
     * <pre>
     *  &lt;kml xmlns="http://earth.google.com/kml/2.0"&gt;
     *  &lt;Placemark&gt;
     *  &lt;name&gt;Naam&lt;/name&gt;
     *  &lt;description&gt;Omschrijving&lt;/description&gt;
     *  &lt;Point&gt;&lt;coordinates&gt;4.835397256016842,53.03622449301179&lt;/coordinates&gt;&lt;/Point&gt;
     *  &lt;ExtendedData&gt;&lt;Data name="styletype"&gt;&lt;value&gt;mt3&lt;/value&gt;&lt;/Data&gt;&lt;/ExtendedData&gt;
     *  &lt;/Placemark&gt;
     *  &lt;/kml&gt;·
     * <pre>
     * </p>
     * The Styles in the KML will be used by default. If you do not want that, set the kmlstyles parameter to false
     * @type URL
     */
    this.kmlurl = Pdok.kmlurl;
	this.zoomtofeatures = Pdok.zoomtofeatures;

    /**
     * Property to determine if the internal styles of a KML file should be used for visualisation. 
     *
     * Defaults to false. In that case our styletype mt0 will be used. Of which the externalGraphic can be overridden via the mimg (markerimg) parameter
     * @type Boolean
     */
    this.kmlstyles = true; // defaults to taking internal KML styling into account

    // Reference to layerswitch object (not to be used at the moment)
    this.ls = false;

    /**
     * To determine if the layer switcher should be shown or not. Defaults to true
     * @type Boolean
     */
    this.showlayerswitcher = Pdok.showlayerswitcher || true; // we want default this to true
    this.showzoom = Pdok.showzoom || true; // we want default this to true
    this.navigation = Pdok.navigation || true; // we want default this to true
    this.showscaleline = Pdok.showscaleline || false;
    this.showmouseposition = Pdok.showmouseposition || false;
    this.geocoder = Pdok.geocoder;
    this.legend = Pdok.legend;
    /**
     * Reference to the DIV-id the map should be rendered in.
     * Note that you have to set this one to have two maps in one page!
     * @type String
     */
    this.div = Pdok.mapdiv || 'map';

    /**
     * Reference to internal styles Object with all marker, lines and polygon rules.
     *
     * This Object is created from the pdok-markers.js file. Which is a json file with marker definitions
     * @type Object
     */
    this.styles = [];

    // internal name of the features layer
    this.FEATURESLAYER_NAME = "Markers";
    this.SEARCHFEATURESLAYER_NAME = "Zoek Markers";
    this.LOCATIONSLAYER_NAME = "locationtool";

    // this.features can come as KML string from config/params
    // after handling this, it contains an array of features
    this.features = Pdok.features;

    /**
     * Reference to featuresLayer (= layer where you draw feature on)
     * @type OpenLayers.Layer.Vector
     */
    this.featuresLayer = null;
    this.searchFeaturesLayer = null;

    // References to different drawing controls we use for the edit tools
    this.drawFeaturePointControl = null;
    this.drawFeatureLineControl = null;
    this.drawFeaturePolygonControl = null;
    this.editFeatureControl = null;
    // References to select control for features in the featurelayer
    this.selectControl = null;
    // Reference to locationLayer (= layer to be used by the locationtool)
    this.locationLayer = null;
    // References to different drawing controls to be used by the locationtool
    this.drawLocationPointControl = null;
    this.drawLocationLineControl = null;
    this.drawLocationPolygonControl = null;
    this.editLocationControl = null;

    /**
     * Boolean which determines if the Api started in Locationtool/Lokatieprikker modus or not. Defaults to false
     * @type Boolean
     */
    this.locationtool = Pdok.locationtool || false;
    /**
     * Style to be used for the locationtool. Defaults to 'mt0'. NOTE: this also determines the TYPE of the locationtool (point, line or polygon) !!
     * @type String
     */ 
    this.locationtoolstyle = Pdok.locationtoolstyle || 'mt0';
    /**
     * Name for X field to be used for the locationtool. Defaults to 'x'.
     * @type String
     */ 
    this.locationtoolxfield = Pdok.locationtoolxfield || 'x';
    /**
     * Name for Y field to be used for the locationtool. Defaults to 'y'.
     * @type String
     */ 
    this.locationtoolyfield = Pdok.locationtoolyfield || 'y';
    /**
     * Name for wkt field to be used for the locationtool. Defaults to 'wkt'. If this field is set, x and y will be ignored.
     * @type String
     */ 
    this.locationtoolwktfield = Pdok.locationtoolwktfield || 'wkt';
    /**
     * Name for url field to be used for the locationtool. Defaults to 'url'.
     * @type String
     */ 
    this.locationtoolurlfield = Pdok.locationtoolurlfield || 'url';
    /**
     * Minimal zoom to be able to set a point in the locationtool modus
     * @type int
     */ 
    this.locationtoolzmin = Pdok.locationtoolzmin || '0';
    /**
     * Maximal zoom to be able to set a point in the locationtool modus
     * @type int
     */ 
    this.locationtoolzmax = Pdok.locationtoolzmax || '30';

    this.defaultLayers = OpenLayers.Util.applyDefaults(
        this.defaultPdokLayers, this.defaultLayers);
    this.createStyles();
    this.createOlMap();

    if (callback) {
        callback(this);
    }
};



// Array will contain OpenLayers.Style Objects
Pdok.Api.prototype.defaultStyles=[];

// it is possible to override the markerdefinitions with a request parameter markersdef
if(OpenLayers.Util.getParameters()['markersdef']){
    Pdok.markersdef = OpenLayers.Util.getParameters()['markersdef'];
} else if (!Pdok.markersdef) {
    // we use the markersdef from the api
    Pdok.markersdef = Pdok.ApiUrl+'/js/pdok-markers.js';
}
// inject a script include for the markersdef, being either an external or the api included one
document.write('<script type="text/javascript" src="'+Pdok.markersdef+'"></script>');

// it is possible to override the layerdefinitions with a request parameter layersdef
if(OpenLayers.Util.getParameters()['layersdef']){
    Pdok.layersdef = OpenLayers.Util.getParameters()['layersdef'];
} else if (!Pdok.layersdef) {
    // we use the layersdef from the api
    Pdok.layersdef = Pdok.ApiUrl + '/js/pdok-layers.js';
}
// inject a script include for the layersdef, being either an external or the api included one
document.write('<script type="text/javascript" src="'+Pdok.layersdef+'"></script>');


/**
 * Object which holds a Map of an shortname/id to'layer'-configuration objects. All layer objects holds hold an layertype, and other(OpenLayers-option) properties specific for that type of (OpenLayers)-layer.
 * Be carefull to use the right properties! Eg a OpenLayers-WMS-Layer has a property 'layers' (note the plural form), while the OpenLayers-WMTS-Layer has a property 'layer' (without s!)
 * @type Object
 */
var matrixIdsLufo = new Array(16);
for (var i=0; i<16; ++i) {
    matrixIdsLufo[i] = zeroPad(i, 2).toString();
}

var matrixIdsOak = new Array(16);
for (var i=0; i<16; ++i) {
    matrixIdsOak[i] = zeroPad(i, 1).toString();
}

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

Pdok.Api.prototype.defaultPdokLayers = {
        BRT: {
            layertype: 'WMTS',
            name: 'BRT Achtergrondkaart (WMTS)',
            url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
            layer: 'standaard',
            style: null,
            matrixSet: 'EPSG:28992',
            visibility: true, 
            isBaseLayer: true,
            attribution: '&copy; CC BY Kadaster'
        },
        LUFO: {
                layertype: 'WMTS',
                name: 'PDOK achtergrond luchtfoto\'s (WMTS)',
                url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0?',
                version: "1.3.0",
                layer: 'Actueel_ortho25',
                style: '',
                matrixSet: 'EPSG:28992',
                matrixIds : matrixIdsLufo,
                serverResolutions: [3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42],
                visibility: true,
                isBaseLayer: true,
                format: 'image/jpeg',
                attribution: '<a href="https://www.pdok.nl/introductie/-/article/luchtfoto-pdok" target="_blank">&copy; CC-BY-NC</a>',
                zoomOffset: 2
        },
        OAK: {
				layertype: "WMTS",
				name: "Open Achtergrondkaart (WMTS)",
				url: "https://openbasiskaart.nl/mapcache/wmts/?",
				layer: "osm",
				style: "default",
				matrixSet: "rd",
				matrixIds : matrixIdsOak,
				visibility: true,
				isBaseLayer: true,
				attribution: "(c) openbasiskaart.nl",
		}
    };

/**
 * 
 * @param {type} legend a legend config object containing the div to create the legend on
 * @returns {void}
 */
Pdok.Api.prototype.activateLegend = function(legend){
    var mapdiv;
    if (typeof legend != 'undefined'){
        if (typeof this.map.div === 'string'){
            mapdiv = this.map.div;
        } else {
            mapdiv = this.map.div.id;
        }
        var sdiv = 'legend';
        if(legend.div){
            sdiv = legend.div;
        }
        //Controleer of de div bestaat. Indien dit niet zo is, hang deze dan aan de map div
        if(!document.getElementById(sdiv)){
            var element = document.createElement("div");
            element.id = sdiv;
            document.getElementById(mapdiv).appendChild(element);
        }
        //
        var currentLegends = this.map.getControlsByClass('OpenLayers.Control.LegendControl');
        // check if there is already a control for this div
        for (var i = 0; i < currentLegends.length; i++) {
            if (currentLegends[i].div.id == sdiv) {
                return; // NO new control
            }
        }
        var newLegend = new OpenLayers.Control.LegendControl({
            div: document.getElementById(sdiv),
            map: this.map
        });
        this.map.addControl(newLegend);
        newLegend.activate();
    }
};

/**
 * 
 * @param {type} geocoder a geocoder config object containing the div to create the geocoder on
 * @returns {void}
 */
Pdok.Api.prototype.activateGeocoder = function(geocoder){
    var mapdiv;
    if (typeof geocoder != 'undefined'){
        if (typeof this.map.div === 'string'){
            mapdiv = this.map.div;
        } else {
            mapdiv = this.map.div.id;
        }
        var sdiv = 'pdoksearch';
        if(geocoder.div){
            sdiv = geocoder.div;
        }
        //Controleer of de div bestaat. Indien dit niet zo is, hang deze dan aan de map div
        if(!document.getElementById(sdiv)){
            var element = document.createElement("div");
            element.id = sdiv;
            document.getElementById(mapdiv).appendChild(element);
        }
        //
        var currentGeocoders = this.map.getControlsByClass('OpenLayers.Control.GeocoderControl');
        // check if there is already a control for this div
        for (var i = 0; i < currentGeocoders.length; i++) {
            if (currentGeocoders[i].div.id == sdiv) {
                return; // NO new control
            }
        }
        var newGeocoder = new OpenLayers.Control.GeocoderControl({
            div: document.getElementById(sdiv)
        });
        this.map.addControl(newGeocoder);
    }    
};

/**
 *
 * Given all properties of this Api-instance, create an OpenLayers Map object and return it
 * For internal use only
 *
 * @return OpenLayers.Map object
 */
Pdok.Api.prototype.createOlMap = function() {
    var controls = [
        new OpenLayers.Control.Attribution()

    ];

    if (this.showmouseposition &&
        (this.showmouseposition === true || this.showmouseposition.toLowerCase() === "true")) {
        controls.push(new OpenLayers.Control.MousePosition({
            separator: ', ',
            numDigits: 0,
            emptyString: 'Plaats de cursor op de kaart voor co&ouml;rdinaten'
        }));
    }
    if (this.showscaleline &&
        (this.showscaleline === true || this.showscaleline.toLowerCase() === "true")) {
        controls.push(new OpenLayers.Control.ScaleLine({bottomOutUnits: '', bottomInUnits: ''}));
    }
    var navigationControl = new OpenLayers.Control.Navigation();
    controls.push(navigationControl);
    if (this.showzoom &&
        (this.showzoom === true || this.showzoom.toLowerCase() === "true")) {
        controls.push(new OpenLayers.Control.Zoom());
    }
    var olMap = new OpenLayers.Map ({
        controls: controls,
        maxExtent: new OpenLayers.Bounds(-285401.92,22598.08,595401.9199999999,903401.9199999999),
        theme: null,
        resolutions: [3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21],
        numZoomLevels: 15,
        units: 'm',
        projection: new OpenLayers.Projection("EPSG:28992"),
        div: this.div
    });
    this.map = olMap;

    if (this.navigation &&
        (this.navigation === true || this.navigation.toLowerCase() === "true")) {
        // already on
    }
    else{
        navigationControl.deactivate();
    }

    if (this.showlayerswitcher &&
        (this.showlayerswitcher === true || this.showlayerswitcher.toLowerCase() === "true")) {
        var switcher = new OpenLayers.Control.LayerSwitcher();
        this.map.addControl(switcher);
        switcher.minimizeControl(); // IF we do a layer switcher, but close it initially
    }

    // loading panel control (waiting for data control)
    this.map.addControl(new OpenLayers.Control.LoadingPanel());

    // geocoder is an object property with a div like {div:'bla'}
    if (this.geocoder) {
        this.activateGeocoder(this.geocoder)
    }
    function showBRT(){
        var layers = olMap.getLayersByName("BRT Achtergrondkaart");
        for(var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            olMap.setBaseLayer(layers[layerIndex]);
            this.baselayer = "BRT Achtergrondkaart";
        }
    }
    
    function showTOP10(){
        var layers = olMap.getLayersByName("TOP10NL");
        for(var layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            olMap.setBaseLayer(layers[layerIndex]);
            this.baselayer = "TOP10NL";
        }
    }
    if (this.ls === true){
        function showLufo(){
            alert("Helaas, er zijn nog geen\nluchtfoto's beschikbaar binnen PDOK'");
        }
        var panel = new OpenLayers.Control.Panel();
        var openBRT = new OpenLayers.Control({
            title:"Toon de BRT Achtergrondkaart als ondergrond",
            type: OpenLayers.Control.TYPE_BUTTON,
            trigger: showBRT,
            displayClass: "openBRT"
        });
        var openTOP10 = new OpenLayers.Control({
            title:"Toon de TOP10NL als ondergrond",
            type: OpenLayers.Control.TYPE_BUTTON,
            trigger: showTOP10,
            displayClass: "openTOP10"
        });
        var openLufo = new OpenLayers.Control({
            title:"Toon de luchtfoto's als ondergrond",
            type: OpenLayers.Control.TYPE_BUTTON,
            trigger: showLufo,
            displayClass: "openLufo"
        });
    
        panel.addControls([openLufo,openTOP10,openBRT]);
        olMap.addControl(panel);
    }
    // add different layers to the map
    // NOTE: baselayers, overlays and pdoklayers should be an array(!) of objects OR a commaseparted string
    // the function addLayers should handle both cases, NOT to be handled here!
    if (this.baselayers) {
        this.addLayers(this.baselayers, olMap);
    }
    if (this.overlays) {
        this.addLayers(this.overlays, olMap);
    }
    if(this.pdoklayers) {
        this.addLayers(this.pdoklayers, olMap);
    }
    if (!olMap.baseLayer){
        //olMap.addLayer(this.createWMTSLayer( this.defaultLayers.BRT ));
        this.addLayers([{id:'BRT', visible:true}], olMap);
    }

    // possiblitiy to override externalGraphic of mt0
    if (this.mimg){
        this.styles['mt0'].externalGraphic = this.mimg;
    }

    // apply WMSURL and WMSLAYERS if applicable
    if (this.wmsurl && this.wmslayers) {
        this.addWMS(this.wmsurl, this.wmslayers, this.wmsinfoformat);
    }

    // apply WMTSURL and WMTSLAYER and WMTSMATRIXSET if applicable
    if (this.wmtsurl && this.wmtslayer && this.wmtsmatrixset) {
        this.addWMTS(this.wmtsurl, this.wmtslayer, this.wmtsmatrixset);
    }

    // apply TMSURL and TMSLAYERS if applicable
    if (this.tmsurl && this.tmslayer) {
        this.addTMS(this.tmsurl,this.tmslayer, this.tmstype);
    }

    // apply KMLURL if applicable
    if ((this.kmlurl)) {
        this.addKML(this.kmlurl, this.kmlstyles, this.zoomtofeatures);
    }

    // apply TXTURL if applicable
    if (this.txturl) {
        this.addTxt(this.txturl, this.zoomtofeatures);
    }

    // apply BBOX or zoomlevel and location
    if (this.bbox) {
        olMap.zoomToExtent(OpenLayers.Bounds.fromArray(this.bbox).transform(olMap.displayProjection, olMap.getProjectionObject()));
    } else if (this.zoom && this.loc) {
        if (typeof this.loc === 'string') {
            this.loc = this.loc.split(',');
        }
        olMap.setCenter (new OpenLayers.LonLat(parseInt(this.loc[0]), parseInt(this.loc[1])), parseInt(this.zoom));
    } else {
        //olMap.zoomToMaxExtent();
        olMap.zoomToExtent([-15000,300000,300000,640000],true);
    }

    // featuresLayer is used for all features/markers
    this.featuresLayer = new OpenLayers.Layer.Vector(this.FEATURESLAYER_NAME);
    this.searchFeaturesLayer = new OpenLayers.Layer.Vector(this.SEARCHFEATURESLAYER_NAME);
    this.searchFeaturesLayer.displayInLayerSwitcher = false;
    // fix for the label ordering in labels+icons
    // http://comments.gmane.org/gmane.comp.gis.openlayers.devel.ol3/4156
    this.featuresLayer.renderer.textRoot = this.featuresLayer.renderer.vectorRoot;
    this.searchFeaturesLayer.renderer.textRoot = this.searchFeaturesLayer.renderer.vectorRoot;
    olMap.addLayer(this.featuresLayer);
    olMap.addLayer(this.searchFeaturesLayer);


    // locationLayer holds features for 'kaarprikker/locationtool'
    this.locationLayer = new OpenLayers.Layer.Vector('locationtool', {
        name:'locations', displayInLayerSwitcher:false
    });
    olMap.addLayer(this.locationLayer);

    // apply Baselayer if applicable
    if (this.baselayer != null) {
    	var baselayerbyid = olMap.getLayersBy('pdokid', this.baselayer);
		if(baselayerbyid.length > 0)
		{
			olMap.setBaseLayer(baselayerbyid[0]);
		}
    }

    if (typeof this.features === 'object' || typeof this.features === 'string') {
        // meaning we received a features string (kml) from the outside
        // features string handled, this.features now used as feature array
        if (this.features.toString().length > 0) {
            var kmlString = decodeURIComponent(this.features.toString());
            this.features = [];
            this.addFeaturesFromString(kmlString, 'KML');
        }
    }

    // add marker and use markertype if given, otherwise the default marker
    // backward compatibility: mloc is alway point
    if (this.mloc) {
        if(typeof this.mloc === 'string'){
            this.mloc = this.mloc.replace(' ', '').split(',');
        }
        var wkt = 'POINT('+this.mloc[0]+' '+this.mloc[1]+')';
        if (!this.mt){
            this.mt='mt0'; // mt0 is default point symbol
        }
        if(!this.features){
            this.features = [];
        }
        this.features.push(this.createFeature(wkt, this.mt, this.titel, this.tekst));
    }

    // selectControl for popups
    if ( (this.hoverPopup) || (this.hoverpopup) ){
        this.hoverPopup = true;
    }
    this.selectControl = new OpenLayers.Control.SelectFeature(
        this.featuresLayer, 
        {
            hover:this.hoverPopup
            // implement some on magic to have a visible selection,
            // which we lost when we gave every feature a style
            /*
            onBeforeSelect:function(feature){
                if(feature.style){
                    feature.style.strokeWidth+=2;
                    feature.style.graphicWidth+=5;
                    feature.style.graphicHeight+=5;
                }
            },
            onUnselect:function(feature){
                if(feature.style){
                    feature.style.strokeWidth-=2;
                    feature.style.graphicWidth-=5;
                    feature.style.graphicHeight-=5;
                }
            }
            */
        }
    );
	if (typeof(this.selectControl.handlers) != "undefined") {
		this.selectControl.handlers.feature.stopDown = false;
	}
    
    // Add invisible mousePosition control to keep track of mouseposition for making popups appear where mouse has been
    // clicked, instead of at center of feature. Not needed if normal mousePosition control is available.
    if (!this.showmouseposition) {
        olMap.addControl(new OpenLayers.Control.MousePosition({div: 'someDivNameThatHardlyEverWillExist:)'}));
    }
    
    olMap.addControl(this.selectControl);
    if (this.showPopup.toString().toLowerCase() === "false") {
        this.showPopup = false;
    }
    if (this.showPopup) {
        this.enablePopups();
        this.selectControl.activate();
    }
    
    if(this.features) {
        this.featuresLayer.addFeatures(this.features);
    }

    // enable Locationtool IF this.locationtool is set via config
    if (this.locationtool === true || this.locationtool === 'true') {
        var xorwkt = this.locationtoolwktfield;
        if(this.locationtoolyfield){
            yorwkt = this.locationtoolyfield;
        }
        this.enableLocationTool( this.locationtoolstyle,
            this.locationtoolzmin,
            this.locationtoolzmax,
            this.locationtoolurlfield,
            xorwkt,
            this.locationtoolyfield
            );
    }

    if (this.q){
    	this.zoekQ(this.q);
    }

    this.activateLegend(this.legend, this.div);

    return olMap;
};

/**
 * @private
 * Click handler for a feature to show a popup
 * Some magic is needed to handle empty popup content
 * @param {event} evt
 */
Pdok.Api.prototype.onPopupFeatureSelect = function(evt) {
    feature = evt.feature;
    var content = "";
    if (feature.attributes['name']){
        content=feature.attributes['name'];
    }
    if (feature.attributes['description']){
        content=content+"<br/>"+feature.attributes['description'];
    }
    if (!content || content.length === 0) {
        content = '&nbsp;';
    }
    // first try: get it from the mouseclick from the MousePosition control (NOT working on touch devices)
    var popupLoc = this.map.getLonLatFromPixel(this.map.getControlsByClass("OpenLayers.Control.MousePosition")[0].lastXy);
    // second try: see if this is a point geometry with an x and an y
    if (popupLoc == null && feature.geometry && feature.geometry.x && feature.geometry.y) {
        popupLoc = new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y);
    }
    // if still null (non point geometries?): try the center of bbox of geometry
    if (popupLoc == null){
        // try to get a click from mouse control (not working on touch devices)
        popupLoc = feature.geometry.getBounds().getCenterLonLat();
    }
    popup = new OpenLayers.Popup.FramedCloud("featurePopup",
                //feature.geometry.getBounds().getCenterLonLat(),
                popupLoc,
                new OpenLayers.Size(100,100),
                content,
                null, true, function(evt) {
                    this.hide();
                    // deselect ALL features to be able to select this one again
                    popup.feature.layer.selectedFeatures=[];
                }
            );
    feature.popup = popup;
    popup.feature = feature;
    this.map.addPopup(popup, true);
};

/**
 * @private
 * Click handler for a feature to unselect a feature and close the popup
 * Some magic is needed to handle empty popup content
 * @param {event} evt
 */
Pdok.Api.prototype.onPopupFeatureUnselect = function(evt) {
    feature = evt.feature;
    if (feature.popup) {
        popup.feature = null;
        this.map.removePopup(feature.popup);
        feature.popup.destroy();
        feature.popup = null;
    }
};

/**
 * Api method to disable popups in this Api instance
 * @public
 */
Pdok.Api.prototype.disablePopups = function(){
    this.featuresLayer.events.un({
        'featureselected': this.onPopupFeatureSelect,
        'featureunselected': this.onPopupFeatureUnselect
    });
    return true;
};
/**
 * Api method to enable popups in this Api instance
 * @public
 */
Pdok.Api.prototype.enablePopups = function(){
    this.featuresLayer.events.on({
        'featureselected': this.onPopupFeatureSelect,
        'featureunselected': this.onPopupFeatureUnselect
    });
    return true;
};

/**
 * Returns the current map object of this instance.
 * @public
 * @return OpenLayer.Map object
 */
Pdok.Api.prototype.getMapObject = function() {
    return this.map;
};

/**
 * Method to create a feature based on a wkt string and a typestyle (eg mt3), and giving it a title/name and description.
 * @depricated only internally used at the moment?
 * @param {String} wkt a WKT string for the geometry
 * @param {String} typestyle a style id for a defined style (like mt0, mt3, pt0 or lt0)
 * @param {String} name a title or name, to be shown as title in the popup
 * @param {String} description a feature description text to be shown in the popup
 * @returns OpenLayers.Feature
 */ 
Pdok.Api.prototype.createFeature = function(wkt, typestyle, name, description){
    var wktFormat = new OpenLayers.Format.WKT();
    // OpenLayers.Util.getParameters() splits parameters with comma's into an array
    // because a LINESTRING wkt contains comma we have to concat them back
    if (wkt instanceof Array) {
        wkt = wkt.join();
    }
    var feature = wktFormat.read(wkt);
    feature.attributes['name']=name;
    feature.attributes['description']=description;
    // only if we have this typestyle available
    if (this.styles[typestyle]) {
        // TODO check if this style corresponds with the geometry type (eg for points only mt* etc)
        feature.style = this.styles[typestyle];
        feature.attributes['styletype']=typestyle;
    } else {
        if (feature.geometry.CLASS_NAME === 'OpenLayers.Geometry.Point'){
            feature.style = this.styles['mt0'];
        } else if (feature.geometry.CLASS_NAME === 'OpenLayers.Geometry.LineString') {
            feature.style = this.styles['lt0'];
        }
        else if (feature.geometry.CLASS_NAME === 'OpenLayers.Geometry.Polygon'){
            feature.style = this.styles['pt0'];
        }
    }
    return feature;
};

/**
 * Internal function to create all styles definition into 'this.styles'.
 *
 * Every geometry type has a default style: mt0, pt0, lt0. They are based on the OpenLayers.Feature.Vector.style['default']-style.
 *
 * By defining an markerdefs url with style definitions more styles will be created.
 */
Pdok.Api.prototype.createStyles = function(){
    var olDefault = OpenLayers.Feature.Vector.style['default'];
    this.styles = {};

    // create a default styles for point: mt0, line: lt0 and polygon pt0
    //.these HAVE to be here because there is code depending on the availability of those
    // you can off course override this
    var pdokDefaultPoint = OpenLayers.Util.applyDefaults(
        {
            id: 'mt0',
            name: 'Standaard marker',
            externalGraphic: Pdok.ApiUrl+"/markertypes/document-properties.png",
            graphicHeight: 32,
            graphicWidth: 32,
            graphicYOffset: -32
        }, {});
    this.styles.mt0 = pdokDefaultPoint;
    var pdokDefaultLine = OpenLayers.Util.applyDefaults(
        {
            id: 'lt0', 
            strokeColor: '#273397', 
            strokeWidth: 5,
            strokeOpacity: 0.5, 
            name: 'Standaard lijn'
        }, {});
    this.styles.lt0 = pdokDefaultLine;
    var pdokDefaultPolygon = OpenLayers.Util.applyDefaults(
        {
            id: 'pt0', 
            fillColor: '#273397',
            fillOpacity: 0.3, 
            strokeColor: '#273397', 
            strokeWidth: 2, 
            name: 'Standaard vlak'
        }, {});
    this.styles.pt0 = pdokDefaultPolygon;

    var pdokDefaultStyle = OpenLayers.Util.applyDefaults(
    {
        externalGraphic: Pdok.ApiUrl+"/markertypes/default.png",
        graphicHeight: 37,
        graphicWidth: 32,
        graphicYOffset: -37,
        pointRadius: 1
    }, {});

    // if the the user added their own styles, they should create a variable 'defaultStyles'
    // hereby overriding the inbuild defaultStyles
    for (var i = 0; i<this.defaultStyles.length; i++){
        var style = this.defaultStyles[i];
        this.styles[style.id] = OpenLayers.Util.applyDefaults( style, pdokDefaultStyle);
    }

    return true;
};

/**
 * Activating/enabling the Api DrawingTool. Important: based on the first char of the styletype, the type of feature geometry is set: m = marker/point, l = linestring, p = polygon
 * 
 * It will add a OpenLayers.Control.DrawFeature control to the api, so clicking in the map will generate a feature, to be added in the this.featuresLayer
 * 
 * @param {String} styletype (eg 'mt1' or 'lt1' or 'pt1') also determining the geometry type
 * @param {Function} featureAddedCallback  Function handler to be called after feature is added
 */
Pdok.Api.prototype.enableDrawingTool = function(styletype, featureAddedCallback){
    this.disableDrawingTool();  // to be sure we do not have two drawfeature controls active at once
    var apiStyles = this.styles;
    var apiFeaturesLayer = this.featuresLayer;
    var currentDrawControl;
    // default to mt0 if called without a styletype
    if (!styletype) {
        styletype = 'mt0';
    }
    //todo; potential unhandled error.
    if (styletype[0] === 'm'){
        if (!this.drawFeaturePointControl){
            this.drawFeaturePointControl = new OpenLayers.Control.DrawFeature(this.featuresLayer, OpenLayers.Handler.Point);
            this.map.addControl(this.drawFeaturePointControl);
        }
        currentDrawControl = this.drawFeaturePointControl;
        //currentDrawControl.handler.style = apiStyles[styletype];
    //todo; potential unhandled error.
    } else if (styletype[0] === 'l') {
        if (!this.drawFeatureLineControl){
            this.drawFeatureLineControl = new OpenLayers.Control.DrawFeature(this.featuresLayer, OpenLayers.Handler.Path);
            this.map.addControl(this.drawFeatureLineControl);
        }
        currentDrawControl = this.drawFeatureLineControl;
        currentDrawControl.handler.style = apiStyles[styletype];
        currentDrawControl.handler.style.externalGraphic = null;
    //todo; potential unhandled error.
    } else if (styletype[0] ==='p'){
        if (!this.drawFeaturePolygonControl){
            this.drawFeaturePolygonControl = new OpenLayers.Control.DrawFeature(this.featuresLayer, OpenLayers.Handler.Polygon);
            this.map.addControl(this.drawFeaturePolygonControl);
        }
        currentDrawControl = this.drawFeaturePolygonControl;
        currentDrawControl.handler.style = apiStyles[styletype];
        currentDrawControl.handler.style.externalGraphic = null;
    }
    currentDrawControl.featureAdded = function(feature){
            feature.style = apiStyles[styletype];
            // also set an attribute 'styletype' to be able to export features with styletype
            feature.attributes['styletype'] = styletype;
            // we add a name attribute to be able to write to KML (the KML format uses that attribute as name)
            feature.attributes['name'] = '&nbsp;';  // we add &nbsp; here because null or '' will cause the KML writer to not see it as value
            apiFeaturesLayer.redraw();
            if (featureAddedCallback){
                featureAddedCallback(feature);
            }
    };
    currentDrawControl.activate();
    return true;
};

/**
 * Deactivating/disabling the Api DrawingTool.
 *
 */
Pdok.Api.prototype.disableDrawingTool = function(){
    if (this.drawFeaturePointControl){
        this.drawFeaturePointControl.deactivate();
    }
    if (this.drawFeatureLineControl){
        this.drawFeatureLineControl.deactivate();
    }
    if (this.drawFeaturePolygonControl){
        this.drawFeaturePolygonControl.deactivate();
    }
    return true;
};

/**
 * Deactivating/disabling the Api EditingTool.
 *
 */
Pdok.Api.prototype.disableEditingTool = function(){
    if (this.editFeatureControl) {
        this.editFeatureControl.deactivate();
    }
    return true;
};

/**
 * Api method for ctivating/enabling the Api EditingTool.
 * 
 * It will add a OpenLayers.Control.ModifyFeature control to the api, so clicking on a feature in the map will select it and make it editable, and when finished call the featureModifiedFunction
 * 
 * @param {Function} featureModifiedFunction  Function handler to be called when you are ready with changing the geometry
 */
Pdok.Api.prototype.enableEditingTool = function(featureModifiedFunction){
    if (!this.editFeatureControl) {
        this.editFeatureControl = new OpenLayers.Control.ModifyFeature(this.featuresLayer);
        this.map.addControl(this.editFeatureControl);
        this.featuresLayer.events.on({
            "beforefeaturemodified": featureModifiedFunction,
            "featuremodified": featureModifiedFunction
        });
    }
    this.editFeatureControl.activate();
    return true;
};

/**
 * Api method to set the current center of the map.
 * 
 * @param {Array or Atring} loc An array of two coordinates: like [x,y] OR a commaseparated String with the two coordinates
 */
Pdok.Api.prototype.setLocation = function(loc) {
    // if loc is a string like '150000,450000', split
    if( typeof(loc) === 'string'){
        loc = loc.split(',');
    }
    this.map.setCenter (new OpenLayers.LonLat(parseInt(loc[0]), parseInt(loc[1])));
    return true;
};

/**
 * Api method to set the current zoom level of this Api map
 * 
 * @param {integer} zoomlevel the zoomlevel (0 is full map, 14 is fully zoomed in)
 */
Pdok.Api.prototype.setZoomLevel = function(zoomlevel) {
    this.map.zoomTo (zoomlevel);
    return true;
};

/**
 * Api helper method to reproject a lat,lon coordinate (epsg:4326/latlon) into an Rijksdriehoekstelsel coordinate (epsg:28992)
 * NOTE: x = lon and y = lat !!
 * returning what is called an OpenLayersLonLat-object, but what is actually a coordinate in RD
 * 
 * @param {double} lat The latitude value (== the y value in epsg:4326)
 * @param {double} lon The longitude value (== the x value in epsg:4326)
 * @returns {OpenLayers.LonLat} the reprojected latlon coordinate actually a RD coordinate
 */
Pdok.Api.prototype.reprojectWGS84toRD = function(lat,lon){
    pointRD = new OpenLayers.LonLat(lon,lat)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from wgs84 
            new OpenLayers.Projection("EPSG:28992") // new RD
        );
    return(pointRD);
};

/**
 * Generic api method to add an already constructed OpenLayers layer 
 * to our map. 
 * The use of this method guarantees you that locationLayer and featureLayer 
 * are always on top
 * Can be used to add an external layer to the map.
 * @param {OpenLayer.Layer} openLayersLayer a valid OpenLayers.Layer layer
 */
Pdok.Api.prototype.addOLLayer = function(openLayersLayer) {
    this.map.addLayer(openLayersLayer);
    this.moveVectorLayersToTop();
};

/**
 * Api method to set the size of the map based on a css class
 * 
 * @param {String} namedSize Optional size name, defaults to 'big'
 */
Pdok.Api.prototype.setSizeByName = function(namedSize) {
    var sizeString = 'big';
    if (namedSize){
        sizeString = namedSize;
    }
    document.getElementById('map').className ='olMap ' + sizeString;
    this.map.updateSize();
    return true;
};
/**
 * Api method to add a TMS layer to the map, based on three strings
 * 
 * @param {String} tmsurl a valid URL string
 * @param {String} tmslayer a valid layername of the above tmsurl service
 * @param {String} tmstype Optional tmstype, defaulting to 'png'
 */
Pdok.Api.prototype.addTMS = function(tmsurl,tmslayer,tmstype) {
    if (!tmstype){
        tmstype="png";
    }
    var lyrTMS = this.createTMSLayer({
            url: tmsurl,
            layername: tmslayer,
            type: tmstype
        });
    this.addOLLayer(lyrTMS);
    return true;
};

/**
 * Method to create a TMS layer and add it to the map based on a layer configuration object. Normally you'll use the addTMS method, but you can also use this way.
 * @param {Object} layerConfigObj a layer configuration object as described in markersdef
 * @param {type} id
 * @returns {OpenLayers.Layer.TMS}
 */
Pdok.Api.prototype.createTMSLayer = function(layerConfigObj, id) {

    // default WMS layer object to set defaults:
    // missing values in config object will be replaced by sensible defaults:
    if (!id) {
        id = null;
    }
    // default TMS layer object to set defaults:
    // missing values in config object will be replaced by sensible defaults:
    var defaults = {
        name: 'tms layer',
        url: '',
        layertype: '',
        layername: '',
        type: 'png',
        visibility: true,
        isBaseLayer: false,
        attribution:''
    };

    layerConfigObj = OpenLayers.Util.applyDefaults(layerConfigObj, defaults);

    var layer = new OpenLayers.Layer.TMS(
        layerConfigObj.name,
        layerConfigObj.url,
        {   layername: layerConfigObj.layername, 
            type:layerConfigObj.type, 
            visibility: layerConfigObj.visibility, 
            isBaseLayer: layerConfigObj.isBaseLayer,
        attribution:layerConfigObj.attribution
        }
    );

    return layer;
};

/**
 * Api method to add a WMTS layer to the map, based on five strings
 * 
 * @param {String} wmtsurl a valid URL string
 * @param {String} wmtslayer a valid layername of the above tmsurl service
 * @param {String} wmtsmatrixset a valid matrixset id
 * @param {String} wmtsstyle a valid style (defaults to 'default')
 * @param {String} wmtsmatrixids (optional) will be created
 */
Pdok.Api.prototype.addWMTS = function(wmtsurl, wmtslayer, wmtsmatrixset, wmtsstyle, wmtsmatrixids) {
    this.wmtsurl = wmtsurl;
    this.wmtslayer = wmtslayer;
    this.wmtsmatrixset = wmtsmatrixset;
    var lyrWMTS = this.createWMTSLayer({
            name: wmtslayer,
            url: wmtsurl,
            layer: wmtslayer,
            matrixSet: wmtsmatrixset,
            matrixIds: wmtsmatrixids,
            style: wmtsstyle
        });
    this.addOLLayer(lyrWMTS);
    return true;
};

/**
 * Api method to find one (! last one is returned) WMTS layer in the map, based on two wmtsurl and wmtslayer
 *
 * @param {String} wmtsurl a valid URL string
 * @param {String} wmtslayer a valid layername of the above url service
 * @return {Object} Layer if found or NULL if nothing found
 */
Pdok.Api.prototype.findWMTS = function(wmtsurl, wmtslayer) {
    var url_layers = this.map.getLayersBy('url', this.wmtsurl);
    var layer = null;
    for (var i = 0;i<url_layers.length;i++) {
        if (url_layers[i].CLASS_NAME == "OpenLayers.Layer.WMTS" &&
            url_layers[i].layer == this.wmtslayer) {
            layer = url_layers[i];
        }
    }
    return layer;
}

/**
 * Method to create a WMTS layer and add it to the map based on a layer configuration object. Normally you'll use the addWMTS method, but you can also use this way.
 * @param {Object} layerConfigObj a layer configuration object as described in markersdef
 * @param {type} id
 * @returns {OpenLayers.Layer.WMTS}
 */
Pdok.Api.prototype.createWMTSLayer = function(layerConfigObj) {

    // From WMTS openlayers example:
    // If tile matrix identifiers differ from zoom levels (0, 1, 2, ...)
    // then they must be explicitly provided.
    var matrixIds = new Array(26);
    for (var i=0; i<26; ++i) {
        matrixIds[i] = layerConfigObj.matrixSet+':' + i;
    }

    // default WMTS layer object to set defaults:
    // missing values in config object will be replaced by sensible defaults:
    var defaults = {
            name: 'wmts layer',
            url: '',
            layer: '',
            style: 'default',
            matrixSet: '',
            matrixIds: matrixIds,
            visibility: true,
            isBaseLayer: false,
            format: 'image/png8',
            attribution:''
    };

    layerConfigObj = OpenLayers.Util.applyDefaults(layerConfigObj, defaults);

     /* var wmts = new OpenLayers.Layer.WMTS({
     *     name: "My WMTS Layer",
     *     url: "http://example.com/wmts",·
     *     layer: "layer_id",
     *     style: "default",
     *     matrixSet: "matrix_id"
     * });
     */
    var layer = new OpenLayers.Layer.WMTS(
        {
            name: layerConfigObj.name,
            url:layerConfigObj.url,
            layer: layerConfigObj.layer,
            style: layerConfigObj.style,
            matrixSet: layerConfigObj.matrixSet,
            matrixIds: layerConfigObj.matrixIds,
            format: layerConfigObj.format,
            visibility: layerConfigObj.visibility,
            isBaseLayer: layerConfigObj.isBaseLayer,
            attribution: layerConfigObj.attribution
        }
    );
    return layer;
};

/**
 * Api method to add a WMS layer to the map, based on two strings
 * 
 * @param {String} wmsurl a valid URL string
 * @param {String} wmslayers a valid layername of the above url service
 * @param {String} wmsinfoformat the format use to retrieve featureinfo
 */
Pdok.Api.prototype.addWMS = function(wmsurl, wmslayers, wmsinfoformat) {
    this.wmsurl = wmsurl;
    this.wmslayers = wmslayers;
    this.wmsinfoformat = wmsinfoformat;
    var lyrWMS = this.createWMSLayer({
            url: wmsurl,
            name: wmslayers, // RWS prefers to have layernames as names instead of default 'WMS-layer'
            layers: wmslayers,
            transparent: true,
            wmsinfoformat: wmsinfoformat
        });
    this.addOLLayer(lyrWMS);
    return true;
};

/**
 * Api method to find one (! last one is returned) WMS layer in the map, based on two wmsurl and wmslayers
 *
 * @param {String} wmsurl a valid URL string
 * @param {String} wmslayers a valid layername of the above url service
 * @return {Object} Layer if found or NULL if nothing found
 */
Pdok.Api.prototype.findWMS = function(wmsurl, wmslayers) {
    var url_layers = this.map.getLayersBy('url', this.wmsurl);
    var layer = null;
    for (var i = 0;i<url_layers.length;i++) {
        if (url_layers[i].CLASS_NAME == "OpenLayers.Layer.WMS" &&
            url_layers[i].params.LAYERS == this.wmslayers) {
            layer = url_layers[i];
        }
    }
    return layer;
}

/**
 * Method to create a WMS layer and add it to the map based on a layer configuration object. Normally you'll use the addWMS method, but you can also use this way.
 * @param {Object} layerConfigObj a layer configuration object as described in markersdef
 * @param {type} id
 * @returns {OpenLayers.Layer.WMS}
 */
Pdok.Api.prototype.createWMSLayer = function(layerConfigObj) {
    // default WMS layer object to set defaults:
    // missing values in config object will be replaced by sensible defaults:
    var defaults = {
            name: 'WMS layer',
            url: '',
            layers: '',
            wmsinfoformat: 'none',  // if this one is filled a featureinfocontrol is added
            styles: '',
            visibility: true,
            isBaseLayer: false,
            format: 'image/png',
            singleTile: true,
            attribution:''
    };

    layerConfigObj = OpenLayers.Util.applyDefaults(layerConfigObj, defaults);

    var layer = new OpenLayers.Layer.WMS(
            layerConfigObj.name,
            layerConfigObj.url,
            {
                layers: layerConfigObj.layers, 
                transparent: layerConfigObj.transparent, 
                format: layerConfigObj.format
            },
            {
                visibility: layerConfigObj.visibility, 
                isBaseLayer: layerConfigObj.isBaseLayer, 
                singleTile: layerConfigObj.singleTile,
                attribution:layerConfigObj.attribution 
            }
    );
    if (layerConfigObj.wmsinfoformat && layerConfigObj.wmsinfoformat !== 'none') {
        var infoformat = layerConfigObj.wmsinfoformat; // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
        var info = new OpenLayers.Control.WMSGetFeatureInfo({
            url: layerConfigObj.url,
            infoFormat: infoformat,
            title: 'Info voor'+layerConfigObj.name,
            queryVisible: true,
            eventListeners: {
                getfeatureinfo: function(event) {
                    // removing all popups here first!
                    while( this.map.popups.length ) {
                        this.map.removePopup(this.map.popups[0]);
                    }
                    popupContent = event.text;
                    if (infoformat === 'text/plain'){
                        popupContent = '<pre>'+event.text+'</pre>';
                    }
                    var popup = new OpenLayers.Popup.FramedCloud(
                        "featurePopup", 
                        this.map.getLonLatFromPixel(event.xy),
                        null,
                        popupContent,
                        null,
                        true
                    );
                    this.map.addPopup(popup);
                }
            }
        });
        this.map.addControl(info);
        info.activate();
    }

    return layer;
};

/**
 * Api Interface addLayers to add layers the map, there are three options handled
 * -1- commaseparated-string based on the layerkey-names from the layer config files Eg: 'BRT,TOP10NL2,CBS_PROVINCIES'
 * -2- an array like [{id:'BRT',visible='true'},{id:'TOP10NL@',visible='false'}]
 * -3- an array with layerkey-names ['BRT,TOP10NL2','CBS_PROVINCIES']
 * @param {array} arrLayerNames javascript array of layer names
 * @param {OpenLayers.Map} map the Pdok.Api-map to add the layers to
 */
Pdok.Api.prototype.addLayers = function(arrLayerNames, map){
    if (!arrLayerNames){
        return;
    }
    if (arrLayerNames === '-') {
        // this is the 'header' of the selectbox: "choose ..."
        return;
    }
    // handle case in which it is just a commaseparated string of keys OR just one key
    if (typeof arrLayerNames == 'string') {
        arrLayerNames = arrLayerNames.split(','); // now it is an array
    }
    // handle empty [] could come from empty string ''
    if (!map){
        map = this.map;
    }
    for (var l = 0;l<arrLayerNames.length;l++) {
        var layer = arrLayerNames[l];
        if (typeof layer == 'string') {
            // layer is a key from the layer configs
            layer = {id: layer, visible:'true'};
        }
        if (this.defaultLayers[layer.id]){
            var lyr;
            if (this.defaultLayers[layer.id].layertype.toUpperCase() === 'WMS'){
                lyr = this.createWMSLayer( this.defaultLayers[layer.id], layer.id);
            }
            else if (this.defaultLayers[layer.id].layertype.toUpperCase() === 'WMTS'){
                lyr = this.createWMTSLayer( this.defaultLayers[layer.id], layer.id);
            }
            else if (this.defaultLayers[layer.id].layertype.toUpperCase() === 'TMS'){
                lyr = this.createTMSLayer( this.defaultLayers[layer.id], layer.id);
            }
            else {
                alert('Laag type "' + this.defaultLayers.l.layertype + '" niet beschikbaar, controleer de configuratie.');
            }
            if (lyr){
                map.addLayer(lyr);
                lyr.pdokid = layer.id;
                if(lyr.isBaseLayer){
                    if(layer.visible){
                        map.setBaseLayer(lyr);
                    }
                } else {
                    lyr.setVisibility(layer.visible);
                }
            }
        } else {
            alert('Laag niet beschikbaar: ' + layer.id);
        }
    }
    // to be sure featuresLayer and locationLayer are always on top
    this.moveVectorLayersToTop();
    return true;
};

/**
 * Move the featuresLayer and the locationLayer (layer used by the locationTool) to the top after adding other layers.
 */
Pdok.Api.prototype.moveVectorLayersToTop = function(){
    // TODO ??take all vector layers into account??
    if(this.featuresLayer) {
        this.map.setLayerIndex(this.featuresLayer, this.map.layers.length-1);
    }
    if(this.locationLayer) {
        this.map.setLayerIndex(this.locationLayer, this.map.layers.length);
    }
};


/**
 * Api method to disable the locationTool (actually deactivate all needed OpenLayers controls)
 */
Pdok.Api.prototype.disableLocationTool = function(){

    if (this.drawLocationPointControl){
        this.drawLocationPointControl.deactivate();
    }
    if (this.drawLocationLineControl){
        this.drawLocationLineControl.deactivate();
    }
    if (this.drawLocationPolygonControl){
        this.drawLocationPolygonControl.deactivate();
    }
    return true;
};

/**
 * Api method to set the api location properties, detached from starting of the
 * locationtool to be able to only configure the tool within the wizard
 * @param {String} styletype a styletype string like mt0 
 * @param {int} zmin the minimal zoom level the user can click
 * @param {int} zmax the maximal zoom level the user can click
 * @param {String} url the name of the field to be filled with the url to current state of the map
 * @param {String} xorwkt the name of the field to be used as X-field OR WKT-field (in this case you should not define y)
 * @param {String} y the name of the field to be used as Y-field (without setting this one the tool will only set WKT field)
 */

Pdok.Api.prototype.setLocationToolProps = function(styletype, zmin, zmax, url, xorwkt, y){
    this.locationtool = true;
    if (styletype){
        this.locationtoolstyle = styletype;
    }
    // if y is defined, this function is called with an x and y field
    if(y) {
        this.locationtoolxfield = xorwkt;
        this.locationtoolyfield = y;
        this.locationtoolwktfield = null; // NO wkt
    }
    else if(xorwkt) {
        // apparently only a wkt field
        this.locationtoolxfield = null;
        this.locationtoolyfield = null;
        this.locationtoolwktfield = xorwkt;
    }
    else {
        // default to x y field from api defaults
        this.locationtoolwktfield = null; // NO wkt
    }
    if(url){
        this.locationtoolurlfield = url;
    }
    // be carefull not to use if(zmin) or if(zmax), they can be 0 (which solves to false)
    if(zmin){
        this.locationtoolzmin = zmin;
    }
    if(zmax){
        this.locationtoolzmax = zmax;
    }
    return true;
};


/**
 * Api method to UNset the locationtool, and set the api location properties to default values
 * this is necceary to be able to create code and a map link with or without the locationtool-props
 *
 */
Pdok.Api.prototype.removeLocationToolProps = function(){
    // back to defaults
    this.locationtool = false;
    this.locationtoolstyle = 'mt0';
    this.locationtoolxfield = 'x';
    this.locationtoolyfield = 'y';
    this.locationtoolurlfield = 'url';
    this.locationtoolwktfield = 'wkt';
    this.locationtoolzmin = '0';
    this.locationtoolzmax = '30';
    return true;
};

/**
 * Enable the location tool. Either use all locationtool defaults, OR set them via setLocationToolProps method.
 */
Pdok.Api.prototype.enableLocationTool = function(){
    var apiObject = this;

    var alerted = false;
    var locationToolCheck = function() {
        if (apiObject.locationLayer.features.length > 0) {
            // stop all locationtool controls
            if (confirm('Er is al een geldige lokatie. \nKlik OK om verder te gaan,\nof Annuleren/Cancel om opnieuw te klikken.')) {
                apiObject.map.events.unregister("moveend", apiObject.map, locationToolCheck);
                apiObject.map.events.unregister("click", apiObject.map, locationToolCheck);
                apiObject.disableLocationTool();
            }
            else {
                // features from api.locationLayer are already copied to the api.featuresLayer
                // we have to remove those (and ONLY those) from the api.featuresLayer
                var locationtoolFeatures = apiObject.locationLayer.features;
                apiObject.featuresLayer.removeFeatures(locationtoolFeatures);
                // now remove them from locationLayer also
                apiObject.locationLayer.removeAllFeatures();
                apiObject.removeFormCoordinates();
                apiObject.startLocationTool();
            }
            return false;
        }
        else if (apiObject.map.getZoom() >= apiObject.locationtoolzmin && apiObject.map.getZoom() <= apiObject.locationtoolzmax) {
            if(!apiObject.locationtoolstyle){
                apiObject.locationtoolstyle = 'mt0';
            }
            apiObject.startLocationTool();
        } else {
            var msg = "U kunt alleen tekenen tussen de zoomnivo's: "+apiObject.locationtoolzmin+" en "+apiObject.locationtoolzmax+". \nU zit nu op zoomnivo: "+apiObject.map.getZoom();
            var zoom;
            if (apiObject.map.getZoom() < apiObject.locationtoolzmin){
                msg += "\nKlik op OK om "+(apiObject.locationtoolzmin-apiObject.map.getZoom())+" zoomnivo's in te zoomen \n(of Annuleren/Cancel om het zelf te doen)";
                zoom = apiObject.locationtoolzmin;
            }
            else{
                msg += "\nKlik op OK om "+(apiObject.map.getZoom()-apiObject.locationtoolzmax)+" zoomnivo's uit te zoomen \n(of Annuleren/Cancel om het zelf te doen)";
                zoom = apiObject.locationtoolzmax;

            }
            if (!alerted){
                //alerted = true;
                if(confirm(msg)){
                    apiObject.map.zoomTo(zoom);
                }
                else{
                    apiObject.disableLocationTool();
                }
            }
        }
    };
    // register above check function to listen to moveend en click events of the map
    this.map.events.register("moveend", this.map, locationToolCheck);
    // sorry IE you fire to early: dirty fix for this
    if ('msie' !== OpenLayers.Util.getBrowserName()){
        this.map.events.register("click", this.map, locationToolCheck);
    }
    // first check
    locationToolCheck();
    return true;
};

/**
 * Clean up the locationtool form inputs
 */
Pdok.Api.prototype.removeFormCoordinates = function(){
    var apiObject = this;
    if (apiObject.locationtoolxfield && apiObject.locationtoolyfield) {
        apiObject[apiObject.locationtoolxfield] = "";
        apiObject[apiObject.locationtoolyfield] = "";
        if (document.getElementById(apiObject.locationtoolxfield) && document.getElementById(apiObject.locationtoolyfield)) {
            document.getElementById(apiObject.locationtoolxfield).value = "";
            document.getElementById(apiObject.locationtoolyfield).value = "";
        }
    }
    if (apiObject.locationtoolwktfield) {
        apiObject[apiObject.locationtoolwktfield] = "";
        if (document.getElementById(apiObject.locationtoolwktfield)){
            document.getElementById(apiObject.locationtoolwktfield).value = "";
        }
    }
    if (apiObject.locationtoolurlfield) {
        apiObject[apiObject.locationtoolurlfield] = "";
        if (document.getElementById(apiObject.locationtoolurlfield)){
            document.getElementById(apiObject.locationtoolurlfield).value = "";
        }
    }
};

/**
 * Start the locationtool
 */
Pdok.Api.prototype.startLocationTool = function(){
    this.disableLocationTool();  // to be sure we do not have two drawfeature controls active at once

    // selectControl and popups interfere with editing tools: disable all
    this.selectControl.deactivate();
    this.disablePopups();

    // create controls
    var currentDrawControl;
    if (!this.locationtoolstyle) {
        this.locationtoolstyle = 'mt0';
    }
    if (this.locationtoolstyle.charAt(0) === 'm'){
        if (!this.drawLocationPointControl){
            this.drawLocationPointControl = new OpenLayers.Control.DrawFeature(this.locationLayer, OpenLayers.Handler.Point);
            this.map.addControl(this.drawLocationPointControl);
        }
        currentDrawControl = this.drawLocationPointControl;
        //currentDrawControl.handler.style = this.styles[this.locationtoolstyle];
    } else if (this.locationtoolstyle.charAt(0) === 'l'){
        if (!this.drawLocationLineControl){
            this.drawLocationLineControl = new OpenLayers.Control.DrawFeature(this.locationLayer, OpenLayers.Handler.Path);
            this.map.addControl(this.drawLocationLineControl);
        }
        currentDrawControl = this.drawLocationLineControl;
        currentDrawControl.handler.style = this.styles[this.locationtoolstyle];
        //currentDrawControl.handler.style.externalGraphic = null;
    } else if (this.locationtoolstyle.charAt(0) === 'p'){
        if (!this.drawLocationPolygonControl){
            this.drawLocationPolygonControl = new OpenLayers.Control.DrawFeature(this.locationLayer, OpenLayers.Handler.Polygon);
            this.map.addControl(this.drawLocationPolygonControl);
        }
        currentDrawControl = this.drawLocationPolygonControl;
        currentDrawControl.handler.style = this.styles[this.locationtoolstyle];
        currentDrawControl.handler.style.externalGraphic = null;
    }

    var apiObject = this;
    var locationtoolfeatureadded = function(feature) {
        // sometimes we receive an event object (with a feature)
        if(feature.feature){
            feature = feature.feature;
        }
        feature.style = apiObject.styles[apiObject.locationtoolstyle];
        feature.layer.redraw();
        // also set an attribute 'styletype' to be able to export features with styletype
        feature.attributes['styletype'] = apiObject.locationtoolstyle;

        var wktFormat = new OpenLayers.Format.WKT();

        if (apiObject.locationtoolxfield && apiObject.locationtoolyfield) {
            apiObject[apiObject.locationtoolxfield] = feature.geometry.x;
            apiObject[apiObject.locationtoolyfield] = feature.geometry.y;
            // only for points
            if (feature.geometry.x && feature.geometry.y){
                if (document.getElementById(apiObject.locationtoolxfield) && document.getElementById(apiObject.locationtoolyfield)) {
                    document.getElementById(apiObject.locationtoolxfield).value = feature.geometry.x;
                    document.getElementById(apiObject.locationtoolyfield).value = feature.geometry.y;
                }
            }
        }
        if (apiObject.locationtoolwktfield) {
            apiObject[apiObject.locationtoolwktfield] = wktFormat.write(feature);
            if (document.getElementById(apiObject.locationtoolwktfield)){
                document.getElementById(apiObject.locationtoolwktfield).value = wktFormat.write(feature);
            }
        }
        if (apiObject.locationtoolurlfield) {
            // set locationTool to false for the maplink
            apiObject.locationtool = false;
            var link = apiObject.createMapLink();
            apiObject[apiObject.locationtoolurlfield] = link;
            if (document.getElementById(apiObject.locationtoolurlfield)){
                document.getElementById(apiObject.locationtoolurlfield).value = link;
            }
            apiObject.locationtool = true; // not sure if we need to do this
        }
        currentDrawControl.deactivate();
        return false;
    };
    currentDrawControl.featureAdded = locationtoolfeatureadded;
    currentDrawControl.activate();

    return true;
};

/**
 * @private
 * handle the response to retrieve external features via an ajax request (kml etc)
 * @param {response} response
 */
Pdok.Api.prototype.handleGetFeaturesResponse = function(response){
    //  trying to catch proxy errors
    if (response.status === 502 || response.status === 403){
        alert('Fout bij het ophalen van de url.\nDit lijkt een proxy probleem.\nKomt de data van een ander domein dan de web applicatie?\nDan moet het data domein opgenomen worden in de proxy-instellingen.');
        return;
    }
    else if (response.status !== 200){
        alert('Fout bij het ophalen van de url\n(Let op: een externe url moet met \'http://\' beginnen) ');
        return;
    }
    var data = response.responseText;
    // we have data now: add to map
    this.passthroughPdokObject.addFeaturesFromString(data, this.dataType, this.zoomToFeatures);
};

/**
 * Add features via a String. Either KML or TXT format
 * @param {String} data actual string of data
 * @param {String} type String one of 'KML' or 'TXT'
 * @param {Boolean} zoomToFeatures boolean to determine if we should zoom to the extent of the just added features
 */
Pdok.Api.prototype.addFeaturesFromString = function(data, type, zoomToFeatures){
    var format;
    var features;
    var options = {
        externalProjection: new OpenLayers.Projection("EPSG:4326"),
        internalProjection: this.map.baseLayer.projection,
        extractStyles: this.kmlstyles
    };
    if (type.toUpperCase() === 'KML') {
        format = new OpenLayers.Format.KMLv2_2(options);
        if (data.search(/\n/) > -1 && data.search(/\n/) < data.length){
            //alert("Er zijn returns gevonden in de KML, deze zijn vervangen door een spatie.")
            //features = format.read(data.replace(/\n/g," ").slice(0,data.replace(/\n/g," ").lastIndexOf(" ")) +"\n");
            features = format.read(data.replace(/\n/g," ") +"\n");
        } else {
            features = format.read(data);
        }
    } else if(type.toUpperCase() === "TXT") {
        // TXT files will default to epsg:28992 / RD coordinates
        options = {
            externalProjection: new OpenLayers.Projection("EPSG:28992"),
            internalProjection: this.map.baseLayer.projection
        };
        format = new OpenLayers.Format.Text(options);
        format.defaultStyle.externalGraphic = null;
        features = format.read(data);
        // default OpenLayers.Text format uses 'title' as 'name' attribute
        // we add a 'name' attribute here
        for (f in features){
            var feature = features[f];
            feature.attributes['name'] = feature.attributes['title'];
        }
    }
    else{
        alert('addFeaturesFromUrl aanroep met een niet ondersteund type: '+type);
        return;
    }
    // add styling to features
    for (var f = 0;f<features.length;f++){
        var feature = features[f];
        if (feature.attributes['styletype']) {
            var styletype = feature.attributes['styletype'];
            // some formats (KML) return attr as objects instead of strings
            if (typeof styletype === 'object') {
                styletype = styletype.value;
            }
            feature.style = this.styles[styletype];
        } else if (type === 'KML' && this.kmlstyles) {
            // ok a KML layer containing styles
        } else if (type === 'TXT' && feature.style.externalGraphic) {
            // this is a TXT feature with some style information
            // this is possible via the txturl parameter
            // in combination with OpenLayers.Format.Txt
        } else {
            if (feature.geometry.CLASS_NAME === 'OpenLayers.Geometry.Point') {
                feature.style = this.styles['mt0'];
            } else if (feature.geometry.CLASS_NAME === 'OpenLayers.Geometry.LineString') {
                feature.style = this.styles['lt0'];
            } else if (feature.geometry.CLASS_NAME === 'OpenLayers.Geometry.Polygon') {
                feature.style = this.styles['pt0'];
            }
        }
    }
    if (features.length === 0) {
        // mmm, no featues
        alert('Geen features aangemaakt. Is het formaat wel ok?\nU had gekozen voor het formaat: "'+type+'".\nRaadpleeg eventueel de help pagina\'s voor de juiste formaten.');
        return true;
    }
    this.featuresLayer.addFeatures(features);
    if (zoomToFeatures && this.featuresLayer.features.length>0) {
        // zoom to dataextent
        var totalFeaturesExtent = this.featuresLayer.getDataExtent();
        this.featuresLayer.map.zoomToExtent(totalFeaturesExtent);
    }
    return true;
};

/**
 * Deleting all layers, visible baseLayer and both internal vector layers
 * featureLayer and LocationsLayer will never be deleted
 * @param {Boolean} nonVectorLayers delete all non-vector layers
 * @param {Boolean} vectorLayers delete all vector layers
 */
Pdok.Api.prototype.deleteLayers = function(nonVectorLayers, vectorLayers) {
    // defaulting to always the nonVectorLayers and NOT the vectorLayer
    nonVectorLayers?nonVectorLayers:nonVectorLayers=true;
    vectorLayers?vectorLayers:vectorLayers=false;
    for (var i = this.map.layers.length-1; i>=0; i--) {
        var layer = this.map.layers[i];
        if (layer.isBaseLayer && layer.visibility) {
            // current visible baselayer: do NOT remove
        } else if (layer !== this.featuresLayer && layer !== this.locationLayer) {
            if (layer.CLASS_NAME === 'OpenLayers.Layer.Vector' 
                    && vectorLayers) {
                this.map.removeLayer(layer);
            } else if(nonVectorLayers) {
                this.map.removeLayer(layer);
            }
        }
    }
};

/**
 * Add features to the this.featuresLayer of the map via an URL and type
 * @param url {String} URL of either a text or a kml file to load
 * @param type {String} type, one of 'KML' or 'TXT'
 * @param {Boolean} zoomToFeatures boolean to determine if we should zoom to the extent of the just added features
 * @param {Pdok} passthroughPdokObject pass Pdok as it will be lost in context
 * @returns {Boolean|undefined}
 */
Pdok.Api.prototype.addFeaturesFromUrl = function(url, type, zoomToFeatures, passthroughPdokObject){

    var apiObject = this;
    var context = {};
    // little dirty way to pass type and zoomToFeatures:
    context.dataType = type;
    context.zoomToFeatures = zoomToFeatures;
    context.passthroughPdokObject = passthroughPdokObject;

    if (type.toUpperCase() === "KML"){
        // kml
        this.kmlurl = url;
    } else if(type.toUpperCase() === "TXT") {
        // tab separated txt file (in EPSG:28992)
        // format (including header!)
        //
        // point    title   description
        // 150000,350000  foo omschrijving foo
        //
        // OR
        //
        // lat  lon title   description
        // 150000   350000    foo omschrijving foo
        this.txturl = url;
    } else {
        alert('addFeaturesFromUrl aanroep met een niet ondersteund type: '+type);
        return;
    }
    OpenLayers.Request.GET({
            url: url,
            callback: apiObject.handleGetFeaturesResponse,
            scope: context
    });

    return true;
};

/**
 * Shorthand to add KML features via a KML url (always zooming to the extent of the KML)
  * @param {type} url
 */
Pdok.Api.prototype.addKML = function(url, kmlstyles, zoomtofeatures) {
	if (zoomtofeatures !== true && zoomtofeatures !== false) {
		zoomtofeatures = true;
	}
    this.addFeaturesFromUrl(url, 'KML', zoomtofeatures, this);
};

//Wellicht moet dit een andere call worden omdat nu een combinatie van txturl en mloc niet goed gaat
/**
 * Shorthand to add TXT features via a TXT url (always zooming to the extent of the TXT)
 * @param {string} url
 */
Pdok.Api.prototype.addTxt = function(url, zoomtofeatures) {
	if (zoomtofeatures !== true && zoomtofeatures !== false) {
		zoomtofeatures = true;
	}
    this.addFeaturesFromUrl(url, 'TXT', true, this);
};

/**
 * Create the iframe tags string for this instance
 */
Pdok.Api.prototype.createIframeTags = function(){
    // map div size
    if(this.map){
        var mapSize = this.map.getSize();
        var iframeTags = '<iframe width="'+mapSize.w+'" height="'+mapSize.h+'" frameborder="0" scrolling=no marginheight="0" marginwidth="0" src="'+this.createMapLink()+'" title="PDOK Kaart"></iframe>';
        return iframeTags;
    } else {
        return "";
    }
};

/**
 * Create the object tags string for this instance
 */
Pdok.Api.prototype.createObjectTags = function(){
    // map div size
    if(this.map){
        var mapSize = this.map.getSize();
        var objectTags = '<object width="'+mapSize.w+'" height="'+mapSize.h+'" codetype="text/html" data="'+this.createMapLink()+'" title="PDOK Kaart"></object>';
        return objectTags;
    } else {
        return "";
    }
};

/**
 * Create the minimal link string for this instance
 */
Pdok.Api.prototype.createMinimalMapLink = function(){
    var uri = Pdok.createBaseUri();
    var pathname = window.location.pathname;
    if (pathname.toLowerCase().search("api.html") > -1){
        uri += 'api.html';
    } // little hack to make our own examples work
    else if (pathname.toLowerCase().search("examples") > -1){
        uri = uri.replace('examples/','');
        uri += 'api/api.html';
    }
    else {
        uri += 'api/api.html';
    }
    var config = this.getMinimalConfig('vialink');
    var pdoklayers = [];
    var i;
    if(config.baselayers) {
        for (i = 0; i < config.baselayers.length; ++i) {
            if(config.baselayers[i].visible){
                pdoklayers.push(config.baselayers[i].id);
            }
        }    
        delete config.baselayers;
    }
    //Get the visible overlays and remove the others
    if(config.overlays){
        for (i = 0; i < config.overlays.length; ++i) {
          if(config.overlays[i].visible){
            pdoklayers.push(config.overlays[i].id);
          }
        }
        delete config.overlays;
    }
    //Concat the layers, assuming the first to be the baselayer and write them to the config object
    if (pdoklayers.length > 0){
		config.pdoklayers = pdoklayers.join(',');
    }
	return uri + '?'+OpenLayers.Util.getParameterString(config);
};

/**
 * Create the link string for this instance
 */
Pdok.Api.prototype.createMapLink = function(){
    var uri = Pdok.createBaseUri();
    var pathname = window.location.pathname;
    if (pathname.toLowerCase().search("api.html") > -1){
        uri += 'api.html';
    } // little hack to make our own examples work
    else if (pathname.toLowerCase().search("examples") > -1){
        uri = uri.replace('examples/','');
        uri += 'api/api.html';
    }
    else {
        uri += 'api/api.html';
    }
    var config = this.getConfig('vialink');
    var pdoklayers = [];
    var i;
    if(config.baselayers) {
        for (i = 0; i < config.baselayers.length; ++i) {
            if(config.baselayers[i].visible){
                pdoklayers.push(config.baselayers[i].id);
            }
        }    
        delete config.baselayers;
    } else {
        pdoklayers.push("BRT");
        pdoklayers.push("LUFO");
        pdoklayers.push("OAK");
    }

    //Get the visible overlays and remove the others
    if(config.overlays){
        for (i = 0; i < config.overlays.length; ++i) {
          if(config.overlays[i].visible){
            pdoklayers.push(config.overlays[i].id);
          }
        }
        delete config.overlays;
    }
    //Concat the layers, assuming the first to be the baselayer and write them to the config object
    config.pdoklayers = pdoklayers.join(',');
    return uri + '?'+OpenLayers.Util.getParameterString(config);
};

/**
 * Create the email link string for this instance
 */
Pdok.Api.prototype.createMailLink = function(){
    return 'mailto:UwMailAdres@provider.nl?Subject=PDOKKaart%20URL&BODY=URL%3A%20' + encodeURIComponent( this.createMapLink() );
};

/**
 * Create the html head string for this instance
 */
Pdok.Api.prototype.createHtml = function(){
    var base = Pdok.createBaseUri();
    // styles and layers definitions
    var stylesAndLayers = '';
    if (this.markersdef) {
        stylesAndLayers += '<script type="text/javascript" src="' + this.markersdef + '"></script>\n';
    }
    if (this.layersdef) {
        stylesAndLayers += '<script type="text/javascript" src="' + this.layersdef + '"></script>\n';
    }
    var uniqueid = OpenLayers.Util.createUniqueID("");
    var confobj = this.getConfig(uniqueid);
    var conf = JSON.stringify(confobj, null, 2);
    var head = '<script type="text/javascript" src="' + base + 'api/js/OpenLayers.js"></script>\n' +
    '<script type="text/javascript" src="' + base + 'api/js/proj4js-compressed.js"></script>\n' +
    '<script type="text/javascript" src="' + base + 'api/js/pdok-api.js"></script>\n'+ 
    '<script type="text/javascript" src="' + base + 'api/js/geozetlib.js"></script>\n' + stylesAndLayers;
    head += '<script type="text/javascript">\n' +
    //add the css ref automagically, it cannot be put inside the body!
    'Pdok.addcss("' + base + 'api/styles/default/style.css");\n' +
    'Pdok.addcss("' + base + 'api/styles/api.css");\n' +
    //'OpenLayers.ImgPath="' + Pdok.ApiUrl+ '/img/";' +
    'var config_' + uniqueid + '=' + conf + ';\n' +
    'var api_' + uniqueid + ';\n' +
    'Pdok.ready( \nfunction(){ \napi_' + uniqueid + ' = new Pdok.Api(config_' + uniqueid + ');\n} );\n' +
    '</script>\n';
    var activeClass = $('#map').attr('class');
    head += '<div id="map_' + uniqueid + '" class="' + activeClass + '"></div>\n';
    return head;
};

/**
 * Api call to get a config object which can be used to start an Api instance in current state
 * @param {type} uniqueid
 * @returns {Pdok.Api.prototype.getConfig.config}
 */
Pdok.Api.prototype.getConfig = function(uniqueid) {
    var config = {};
    config.mapdiv = 'map_' + uniqueid;
    if(this.map){
        config.zoom = this.map.getZoom();
        // only add the LayerSwitcher parameter if false (default value is true)
        if (typeof this.showlayerswitcher !== 'undefined' && this.showlayerswitcher == false){
            config.showlayerswitcher = this.showlayerswitcher;
        }
        if (typeof this.showzoom !== 'undefined' && this.showzoom == false){
            config.showzoom = this.showzoom;
        }
        if (typeof this.navigation !== 'undefined' && this.navigation == false){
            config.navigation = this.navigation;
        }
        if (this.showscaleline){
            config.showscaleline = this.showscaleline;
        }
        if (this.showmouseposition){
            config.showmouseposition = this.showmouseposition;
        }
        if (this.geocoder){
            config.geocoder = JSON.stringify(this.geocoder);
        }
        if (this.legend){
            config.legend = JSON.stringify(this.legend);
        }
        config.loc = this.map.getCenter().toShortString();
        // overlays are 'pdok layers' from the pdok-layers.js configuration
        // only overlays will be outputted as 'overlays'-query parameter when outputting a config
        // other added layers are NOT overlays as defined here
        var overlays = [];
        var baselayers = [];
        var mapLayer;
        for (layerId in this.map.layers){
            mapLayer = this.map.layers[layerId];
            // NOT our this.featuresLayer and this.locationslayer 
            if (!(mapLayer.name == this.FEATURESLAYER_NAME 
                || mapLayer.name == this.LOCATIONSLAYER_NAME
                || mapLayer.name.indexOf("OpenLayers.Handler.")>=0)){  // if there is still an editor active, we have such a layer
                if (typeof mapLayer.pdokid !== 'undefined') {  // only pdok-layers should be added to these lists
                    if (mapLayer.isBaseLayer) {
                        baselayers.push({"id": mapLayer.pdokid, visible: mapLayer.visibility});
                    } else {
                        overlays.push({"id": mapLayer.pdokid, visible: mapLayer.visibility});
                    }
                }
            }
        }
        if (baselayers.length > 0) {
            config.baselayers = baselayers;
        }
        if (overlays.length > 0) {
            config.overlays = overlays;
        }
        // wmsurl AND wmslayers
        if(this.wmsurl && this.wmsurl.length>0 && this.wmslayers && this.wmslayers.length>0) {
            config.wmsurl = this.wmsurl;
            config.wmslayers = this.wmslayers;
            if (this.wmsinfoformat && this.wmsinfoformat !== 'none'){
                config.wmsinfoformat = this.wmsinfoformat;
            }
        }
        // wmts
        if (this.wmtsurl && this.wmtslayer && this.wmtsmatrixset && 
            this.wmtsurl.length > 0 && this.wmtslayer.length > 0 && this.wmtsmatrixset.length > 0) {
            config.wmtsurl = this.wmtsurl;
            config.wmtslayer = this.wmtslayer;
            config.wmtsmatrixset = this.wmtsmatrixset;
        }
        // locationtool
        if(this.locationtool) {
            config.locationtool = true;
            config.locationtoolstyle = this.locationtoolstyle;
            if (this.locationtoolwktfield) {
                config.locationtoolwktfield = this.locationtoolwktfield;
            } else {
                config.locationtoolxfield = this.locationtoolxfield;
                config.locationtoolyfield = this.locationtoolyfield;
            }
            config.locationtoolurlfield = this.locationtoolurlfield;
            config.locationtoolzmin = this.locationtoolzmin;
            config.locationtoolzmax = this.locationtoolzmax;
        }
        // markersdef
        if(this.markersdef) {
            config.markersdef = this.markersdef;
        }
        // layersdef
        if(this.layersdef) {
            config.layersdef = this.layersdef;
        }

        var tempLayer = this.featuresLayer.clone();
        var allFeatures = tempLayer.features;
        if (this.locationLayer.features.length === 1) {
            allFeatures.push(this.locationLayer.features[0]);
        }

        // kmlurl OR txturl OR features
        // at this moment NOT a combination of these two
        // all features from KML or TXT are added to 'featureslayer'
        // so if the user added even more markers/features
        // we should try to make a diff, to know which features to add in the features-kmlstring-parameter
        // but if the user has made changes by hand in wizard, it is getting even more comples
        // so for now: there is either a kmlurl and/or a txturl OR only features as parameter
        if (allFeatures.length > 0) {
        //if (this.featuresLayer.features.length>0) {
            var doFeatures = true;
            // if features came from a kml/txt-url, do NOT write features yourself, only use kmlurl
            // NOTE: so at this moment it is NOT possible to use kmlurl PLUS wizard features!!
            if (this.kmlurl) {
                config.kmlurl = this.kmlurl;
                doFeatures = false;
                // if kmlstyles
                if (this.kmlstyles) {
                    config.kmlstyles = true;
                }
            }
            if (this.txturl) {
                config.txturl = this.txturl;
                doFeatures = false;
            }
            if (this.mimg){
                config.mimg = this.mimg;
            }
            if (doFeatures) {
                // If only one feature is added and this is a point then use the parameter mloc
                /*if (this.featuresLayer.features.length == 1 && this.featuresLayer.features[0].geometry.CLASS_NAME == "OpenLayers.Geometry.Point"){
                    config.mloc = this.featuresLayer.features[0].geometry.x + "," + this.featuresLayer.features[0].geometry.y;
                    config.titel = this.featuresLayer.features[0].attributes.name;
                    config.tekst =  this.featuresLayer.features[0].attributes.description;
                    config.mt = this.featuresLayer.features[0].attributes.styletype;
                }*/
                if (allFeatures.length === 1 && allFeatures[0].geometry.CLASS_NAME === "OpenLayers.Geometry.Point"){
                    config.mloc = allFeatures[0].geometry.x + "," + allFeatures[0].geometry.y;
                    config.titel = allFeatures[0].attributes.name;
                    config.tekst =  allFeatures[0].attributes.description;
                    config.mt = allFeatures[0].attributes.styletype;
                } else {
                    var myKML = this.createKML();
                    if(myKML){
                        config.features = myKML;
                    }
                }
            }
        }
    }
    return config;
};

/**
 * Api call to get a config object which can be used to start an Api instance in current state
 * @param {type} uniqueid
 * @returns {Pdok.Api.prototype.getConfig.config}
 */
Pdok.Api.prototype.getMinimalConfig = function(uniqueid) {
    var config = {};
    if(this.map){
        config.zoom = this.map.getZoom();
        // only add the LayerSwitcher parameter if false (default value is true)
        if (typeof this.showlayerswitcher !== 'undefined' && this.showlayerswitcher == false){
            config.showlayerswitcher = this.showlayerswitcher;
        }
        if (typeof this.showzoom !== 'undefined' && this.showzoom == false){
            config.showzoom = this.showzoom;
        }
        if (typeof this.navigation !== 'undefined' && this.navigation == false){
            config.navigation = this.navigation;
        }
        if (typeof this.showscaleline !== 'undefined' && this.showscaleline == false){
            config.showscaleline = this.showscaleline;
        }
        if (typeof this.showmouseposition !== 'undefined' && this.showmouseposition == false){
            config.showmouseposition = this.showmouseposition;
        }
        if (typeof this.geocoder !== 'undefined' && this.geocoder == false){
            config.geocoder = JSON.stringify(this.geocoder);
        }
        if (typeof this.legend !== 'undefined' && this.legend == false){
            config.legend = JSON.stringify(this.legend);
        }
		x = Math.round(this.map.getCenter().lon);
		y = Math.round(this.map.getCenter().lat);
        config.loc = x + "," + y;
    }
	var overlays = [];
	var baselayers = [];
	var mapLayer;
	for (layerId in this.map.layers){
		mapLayer = this.map.layers[layerId];
		// NOT our this.featuresLayer and this.locationslayer 
		if (!(mapLayer.name == this.FEATURESLAYER_NAME 
			|| mapLayer.name == this.LOCATIONSLAYER_NAME
			|| mapLayer.name.indexOf("OpenLayers.Handler.")>=0)){  // if there is still an editor active, we have such a layer
			if (typeof mapLayer.pdokid !== 'undefined') {  // only pdok-layers should be added to these lists
                    if (mapLayer.isBaseLayer) {
                        baselayers.push({"id": mapLayer.pdokid, visible: mapLayer.visibility});
                    } else {
                        overlays.push({"id": mapLayer.pdokid, visible: mapLayer.visibility});
                    }
			}
		}
	}
	if (baselayers.length > 0) {
		config.baselayers = baselayers;
	}
	if (overlays.length > 0) {
		config.overlays = overlays;
	}
	// wmsurl AND wmslayers
	if(this.wmsurl && this.wmsurl.length>0 && this.wmslayers && this.wmslayers.length>0) {
		config.wmsurl = this.wmsurl;
		config.wmslayers = this.wmslayers;
		if (this.wmsinfoformat && this.wmsinfoformat !== 'none'){
			config.wmsinfoformat = this.wmsinfoformat;
		}
	}
	// wmts
	if (this.wmtsurl && this.wmtslayer && this.wmtsmatrixset && 
		this.wmtsurl.length > 0 && this.wmtslayer.length > 0 && this.wmtsmatrixset.length > 0) {
		config.wmtsurl = this.wmtsurl;
		config.wmtslayer = this.wmtslayer;
		config.wmtsmatrixset = this.wmtsmatrixset;
	}

	var tempLayer = this.featuresLayer.clone();
	var allFeatures = tempLayer.features;
	if (this.locationLayer.features.length === 1) {
		allFeatures.push(this.locationLayer.features[0]);
	}

	// kmlurl OR txturl OR features
	// at this moment NOT a combination of these two
	// all features from KML or TXT are added to 'featureslayer'
	// so if the user added even more markers/features
	// we should try to make a diff, to know which features to add in the features-kmlstring-parameter
	// but if the user has made changes by hand in wizard, it is getting even more comples
	// so for now: there is either a kmlurl and/or a txturl OR only features as parameter
	if (allFeatures.length > 0) {
	//if (this.featuresLayer.features.length>0) {
		var doFeatures = true;
		// if features came from a kml/txt-url, do NOT write features yourself, only use kmlurl
		// NOTE: so at this moment it is NOT possible to use kmlurl PLUS wizard features!!
		if (this.kmlurl) {
			config.kmlurl = this.kmlurl;
			doFeatures = false;
			// if kmlstyles
			if (this.kmlstyles) {
				config.kmlstyles = true;
			}
		}
		if (this.txturl) {
			config.txturl = this.txturl;
			doFeatures = false;
		}
		if (this.mimg){
			config.mimg = this.mimg;
		}
		if (doFeatures) {
			// If only one feature is added and this is a point then use the parameter mloc
			/*if (this.featuresLayer.features.length == 1 && this.featuresLayer.features[0].geometry.CLASS_NAME == "OpenLayers.Geometry.Point"){
				config.mloc = this.featuresLayer.features[0].geometry.x + "," + this.featuresLayer.features[0].geometry.y;
				config.titel = this.featuresLayer.features[0].attributes.name;
				config.tekst =  this.featuresLayer.features[0].attributes.description;
				config.mt = this.featuresLayer.features[0].attributes.styletype;
			}*/
			if (allFeatures.length === 1 && allFeatures[0].geometry.CLASS_NAME === "OpenLayers.Geometry.Point"){
				config.mloc = Math.round(allFeatures[0].geometry.x) + "," + Math.round(allFeatures[0].geometry.y);
				config.titel = allFeatures[0].attributes.name;
				config.tekst =  allFeatures[0].attributes.description;
				config.mt = allFeatures[0].attributes.styletype;
			} else {
				var myKML = this.createKML();
				if(myKML){
					config.features = myKML;
				}
			}
		}
	}
    return config;
};

/**
 * Get KML from all features
 * @public
 * @returns {String} KML including style information
 */
Pdok.Api.prototype.createKML = function(uri_encoded){
    var features = this.featuresLayer.clone().features;
    if(features){
        var kmlformat = new OpenLayers.Format.KMLv2_2({
            foldersDesc: null,
            foldersName: null,
            placemarksDesc: '&nbsp;',   // we add &nbsp; here because null or '' will cause the KML writer to not see it as value
            internalProjection: this.map.baseLayer.projection,
            externalProjection: new OpenLayers.Projection("EPSG:4326"),
            extractStyles: this.kmlstyles
        });
        if(uri_encoded) {
            return encodeURIComponent('<?xml version="1.0" encoding="UTF-8"?>' + kmlformat.write(features));
        }
        else{
            return '<?xml version="1.0" encoding="UTF-8"?>' + kmlformat.write(features);

        }
    } else {
        return;
    }
};

/**
 * Function to toggle visibility of the OpenLayers.LayerSwitcher
 * @param {Boolean} isVisible to show the layer or not
 */
Pdok.Api.prototype.setLayerSwitcherVisible = function(isVisible){
    if (isVisible){
        this.showlayerswitcher = true;
    }
    else{
        this.showlayerswitcher = false;
    }
};
/**
 * Function to toggle visibility of the OpenLayers.zoom
 * @param {Boolean} isVisible to show the layer or not
 */
Pdok.Api.prototype.setZoomVisible = function(isVisible){
    if (isVisible){
        this.showzoom = true;
    }
    else{
        this.showzoom = false;
    }
};
/**
 * Function to toggle visibility of the OpenLayers.navigation
 * @param {Boolean} isVisible to show the layer or not
 */
Pdok.Api.prototype.setNavigation = function(isVisible){
    var nav = this.map.getControlsByClass("OpenLayers.Control.Navigation")[0];
    if (isVisible){
        this.navigation = true;
        if(nav){nav.activate();}
    }
    else{
        this.navigation = false;
        if(nav){nav.deactivate();}
    }
};
/**
 * Function to toggle visibility of the OpenLayers.navigation
 * @param {Boolean} isVisible to show the layer or not
 */
Pdok.Api.prototype.setScaleLineVisible = function(isVisible){
    if (isVisible){
        this.showscaleline = true;
    }
    else{
        this.showscaleline = false;
    }
};
/**
 * Function to toggle visibility of the OpenLayers.navigation
 * @param {Boolean} isVisible to show the layer or not
 */
Pdok.Api.prototype.setMousePositionVisible = function(isVisible){
    if (isVisible){
        this.showmouseposition = true;
    }
    else{
        this.showmouseposition = false;
    }
};

/**
 * Function to toggle visibility of the OpenLayers.navigation
 * @param {Boolean} isVisible to show the layer or not
 */
Pdok.Api.prototype.setMapsearchVisible = function(isVisible){
    if (isVisible){
        this.geocoder = {};
    } else {
        this.geocoder = null;
    }
};

Pdok.Api.prototype.setLegendVisible = function(isVisible){
    if (isVisible){
        this.legend = {};
    } else {
        this.legend = null;
    }
};

Pdok.Api.prototype.kmlToService = function(){
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    var email = window.prompt("Geef uw email als identificatie voor de KML-opslagservice","");
    if (!email){
        // user clicked cancel
        return false;
    }
    if (!pattern.test(email)){
        alert("Geen of een ongeldig email adres opgegeven.");
        return false;
    }
    var kml = this.createKML();
    // POST to Pdok.ApiKmlService
    var params = {
        email: email, 
        data: kml
    };
    OpenLayers.Request.POST({
        url: Pdok.ApiKmlService,
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: OpenLayers.Util.getParameterString(params),
        scope: this,
        callback: function(req){
            if (req.status === 200){
                var kmlurl = req.responseText.trim(); // TODO make json
                var userurl = kmlurl.split('?')[0];
                userurl += '?email=' + email;
                if (confirm(
                    'Gelukt.'+
                    '\nKlik op OK om de terugontvangen KML-url te laden.'+
                    '\nU kunt uw KML-bestanden bekijken en beheren via:\n'+userurl )){
                    // remove all features, and set KML parameter
                        this.featuresLayer.removeAllFeatures();
                        this.addKML(kmlurl);
                    }

            } else {
                alert('Er ging iets mis. Is de ingestelde service ('+Pdok.ApiKmlService+') aktief?');
            }
        }
    });
};

Pdok.Api.prototype.zoekQ = function(q){
	OpenLayers.Control.GeocoderControl.prototype.searchAdres(q);
	/*
	Ga op zoek naar het opgegeven adres en zoom er op in
	*/
}

Pdok.Api.prototype.handleLookupResponseAdres = function(req){
	var format = new Pdok.Format.PdokLocatieServer();
	var lookup = format.read(req.responseText);
	console.log(lookup);
	if (lookup.docs[0]){
		var ft = new OpenLayers.Format.WKT().read(lookup.docs[0].centroide_rd)
		var x = ft.geometry.x;
		var y = ft.geometry.y;
		var zoom = lookup.docs[0].type;
		var z = this.zoomScale[zoom];
		// Add marker to the map for the found location
        var wkt = 'POINT('+x+' '+y+')';
        weergavenaam = lookup.docs[0].weergavenaam
        if (!this.mt){
            this.mt='mt0'; // mt0 is default point symbol
        }
        if (Pdok.mt){
            this.mt=Pdok.mt; // use in url given mt symbol
        }
		api_vialink.featuresLayer.features.push(api_vialink.createFeature(wkt, this.mt, 'Adres', weergavenaam));
		api_vialink.map.setCenter(new OpenLayers.LonLat(x, y), z);
	}
	return false;
}


/*
    This part contains extra Openlayers classes to be used in the
    PdokKaart-api. Currently, these are:

    OpenLayers.Format.KMLv2_2
      Symbology support for the OpenLayers class for reading/writing KML 2.2

    OpenLayers.Control.GeocoderControl
      The GeocoderControl control adds pdok search functionality.

    OpenLayers.Control.LoadingPanel
      To show a nice 'loading' image when W*S is loading

*/

OpenLayers.Format.KMLv2_2 = OpenLayers.Class(OpenLayers.Format.KML, {
    /**
     * APIProperty: kmlns
     * {String} KML Namespace to use. Defaults to 2.0 namespace.
     */
    kmlns: "http://earth.google.com/kml/2.2",

    /**
     *
     * @param {type} features
     * @returns {string} the KML document
     */
    write: function(features) {
        this.styles = {};

        if(!(features instanceof Array)) {
            features = [features];
        }
        var kml = this.createElementNS(this.kmlns, "kml");
        var document = this.createDocumentXML();
        var folder = this.createFolderXML();
        for(var i=0, len=features.length; i<len; ++i) {
            var styleId = this.extractStyles ?
                this.createStyleNode(document, this.computedStyle(features[i])) :
                false;
            folder.appendChild(this.createPlacemarkXML(features[i], styleId));
        }
        kml.appendChild(folder);
        document.appendChild(folder);
        kml.appendChild(document);
        return OpenLayers.Format.XML.prototype.write.apply(this, [kml]);
    },
        /**
     * Method: createDocumentXML
     * Creates and returns a KML document node
     *
     * Returns:
     * {DOMElement}
     */
    createDocumentXML: function() {
        // Document name
        var documentName = this.createElementNS(this.kmlns, "name");
        var documentNameText = this.createTextNode(this.foldersName);
        documentName.appendChild(documentNameText);

        // Document description
        var documentDesc = this.createElementNS(this.kmlns, "description");
        var documentDescText = this.createTextNode(this.foldersDesc);
        documentDesc.appendChild(documentDescText);

        var document = this.createElementNS(this.kmlns, "Document");
        document.appendChild(documentName);
        document.appendChild(documentDesc);

        return document;
    },
        createPlacemarkXML: function(feature, styleId) {
        // Placemark name
        var placemarkName = this.createElementNS(this.kmlns, "name");
        var name = feature.style && feature.style.label ? feature.style.label :
                   feature.attributes.name || feature.id;
        placemarkName.appendChild(this.createTextNode(name));

        // Placemark description
        var placemarkDesc = this.createElementNS(this.kmlns, "description");
        var desc = feature.attributes.description || this.placemarksDesc;
        placemarkDesc.appendChild(this.createTextNode(desc));

        // Placemark
        var placemarkNode = this.createElementNS(this.kmlns, "Placemark");
        if(feature.fid) {
            placemarkNode.setAttribute("id", feature.fid);
        }
        placemarkNode.appendChild(placemarkName);
        placemarkNode.appendChild(placemarkDesc);

        if (styleId) {
            var styleNode = this.createElementNS(this.kmlns, "styleUrl");
            styleNode.appendChild(this.createTextNode(styleId));
            placemarkNode.appendChild(styleNode);
        }

        // Geometry node (Point, LineString, etc. nodes)
        var geometryNode = this.buildGeometryNode(feature.geometry);
        placemarkNode.appendChild(geometryNode);

        // output attributes as extendedData
        if (feature.attributes) {
            var edNode = this.buildExtendedData(feature.attributes);
            if (edNode) {
                placemarkNode.appendChild(edNode);
            }
        }

        return placemarkNode;
    },
    computedStyle: function(feature) {
        if (feature.style) {
            return feature.style;
        } else if (feature.layer) {
            if (feature.layer.style) {
                return feature.layer.style;
            } else {
                return feature.layer.styleMap.createSymbolizer(feature);
            }
        }
    },
    createKmlColorNode: function(color, opacity) {
        var alpha = "ff";
        if (opacity) {
            alpha = Math.round(parseFloat(opacity) * 255).toString(16);
        }
        // TBD: handle '#ccc', 'red'
        // only match '#rrggbb'
        var r = color.slice(1, 3);
        var g = color.slice(3, 5);
        var b = color.slice(5, 7);
        var colorNode = this.createElementNS(this.kmlns, "color");
        colorNode.appendChild(this.createTextNode(alpha + b + g + r));
        return colorNode;
    },

    createStyleNode: function(document, style) {
        if (!style){
            return false;
        } else {
            var styleNode = this.createElementNS(this.kmlns, "Style");
            var id = OpenLayers.Util.createUniqueID("style_");
            styleNode.setAttribute("id", id);

            // LineStyle
            if (style.strokeColor) {
                var lineNode = this.createElementNS(this.kmlns, "LineStyle");
                var colorNode = this.createKmlColorNode(style.strokeColor, style.strokeOpacity);
                lineNode.appendChild(colorNode);

                if (style.strokeWidth) {
                    var width = this.createElementNS(this.kmlns, "width");
                    width.appendChild(this.createTextNode(style.strokeWidth));
                    lineNode.appendChild(width);
                }
                styleNode.appendChild(lineNode);
            }

            // PolyStyle
            if (style.fillColor) {
                var polyNode = this.createElementNS(this.kmlns, "PolyStyle");
                var colorNode = this.createKmlColorNode(style.fillColor, style.fillOpacity);
                polyNode.appendChild(colorNode);
                styleNode.appendChild(polyNode);
            } else /*if (style.fillColor == "none")*/ {
                var polyNode = this.createElementNS(this.kmlns, "PolyStyle");
                var fill = this.createElementNS(this.kmlns, "fill");
                fill.appendChild(this.createTextNode("1"));
                var colorNode = this.createKmlColorNode("#ffffff", "0.01");
                polyNode.appendChild(colorNode);
                polyNode.appendChild(fill);
                styleNode.appendChild(polyNode);
            }
            if (polyNode && style.strokeWidth === "0") {
                var outline = this.createElementNS(this.kmlns, "outline");
                outline.appendChild(this.createTextNode("1"));
                polyNode.appendChild(outline);
                styleNode.appendChild(polyNode);
            }

            // IconStyle
            if (style.externalGraphic) {
                var iconstyleNode = this.createElementNS(this.kmlns, "IconStyle");
                var iconNode = this.createElementNS(this.kmlns, "Icon");

                var href = this.createElementNS(this.kmlns, "href");
                var urlObj = OpenLayers.Util.createUrlObject(
                    style.externalGraphic,
                    {ignorePort80: true}
                );
                if(urlObj.port && urlObj.port !== "80"){
                    url = [urlObj.protocol, '//', urlObj.host, ':', urlObj.port, urlObj.pathname].join('');
                } else {
                    url = [urlObj.protocol, '//', urlObj.host, urlObj.pathname].join('');
                }
                href.appendChild(this.createTextNode(url));
                iconNode.appendChild(href);
                iconstyleNode.appendChild(iconNode);
                var scaleNode = this.createElementNS(this.kmlns, "scale");

                // in KML 2.2, w and h <Icon> attributes are deprecated
                // this means that we can't modify the width/height ratio of the image
                var scale = style.graphicWidth || style.graphicHeight || style.pointRadius * 2;
                scaleNode.appendChild(this.createTextNode(scale/32));
                iconstyleNode.appendChild(scaleNode);
                styleNode.appendChild(iconstyleNode);
            }

            // LabelStyle
            if (style.fontColor) {
                var colorNode = this.createKmlColorNode(style.fontColor, style.fontOpacity);
                var labelStyle = this.createElementNS(this.kmlns, "LabelStyle");
                labelStyle.appendChild(colorNode);
                styleNode.appendChild(labelStyle);
            }
            document.appendChild(styleNode);
            return "#" + id;
        }
    }
});

Pdok.Format = Pdok.Format || {};

Pdok.Format.PdokLocatieServer = OpenLayers.Class(OpenLayers.Format.JSON, {

    initialize: function(options) {
        OpenLayers.Format.JSON.prototype.initialize.apply(this, [options]);
    },

    read: function(json, type, filter) {
        var results = null;
        var obj = null;
        if (typeof json == "string") {
            obj = OpenLayers.Format.JSON.prototype.read.apply(this,
                                                              [json, filter]);
        } else {
            obj = json;
        }
        if(!obj) {
            OpenLayers.Console.error("Bad JSON: " + json);
        } else {
            try {
                results = obj.response;
            } catch(err) {
                OpenLayers.Console.error(err);
            }
        }
        return results;
    },

    CLASS_NAME: "Pdok.Format.PdokLocatieServer"

});

/**
 * @requires OpenLayers/Control.js
 */

/**
 * Class: OpenLayers.Control.GeocoderControl
 * The GeocoderControl control adds pdok search functionality.
 *
 * Inherits from:
 *  - <OpenLayers.Control>
 */
OpenLayers.Control.GeocoderControl =
  OpenLayers.Class(OpenLayers.Control, {

    // PDOK
    geocoderUrl: 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?',
    geocoderParameter: 'q',

    zoomScale : {
        adres: 13,
        postcode: 11,
        weg: 11,
        woonplaats: 8,
        gemeente: 8,
        provincie: 5,
        standaard: 9
    },

    /**
     * Constructor:
     *
     * Parameters:
     * @param options - {Object} Options for control.
     */
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        // we create the div ourselves, to be able to put it outside the map-div
        // if we let OpenLayers create it, and let it be part of the map-div
        // then OpenLayers steals the cursor from our input
        if (!this.div){
            this.div = document.createElement("div");
            this.div.className = OpenLayers.Util.createUniqueID("gc_");
            this.div.id = this.div.className+'_'+this.id;
        }
        this.resultdiv_id = OpenLayers.Util.createUniqueID("gcr_");
        this.formdiv_id = this.resultdiv_id + '_form';
        this.button_id = this.resultdiv_id + '_button';
        this.input_id = this.resultdiv_id + '_input';
        this.geozet_id = this.resultdiv_id + '_geozet';
        this.allowSelection = true;
        this.api_id = options.div.offsetParent.id.split("_")[1];

        // deferred event delegation:
        // http://davidwalsh.name/event-delegate
        var me = this;
        var clickFunc = function(e) {
            var target;
            e.target ? target = e.target : target = e.srcElement;
            if(target && target.className === "closeWindow") {
                me.hideResults();
                document.getElementById(me.input_id).value = '';

            } else if(target && target.nodeName === "A") {
                me.resultClick(document.getElementById(target.id).attributes['id'].value, e);
                return false;
            }
        };
        if (this.div.addEventListener) {
            this.div.addEventListener("click", clickFunc);
        } else{
            // IE8
            this.div.attachEvent("onclick", clickFunc);
        }

    },

    /**
     * Method: destroy
     * Destroy control.
     */
    destroy: function() {
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },

    /**
     * Method: draw
     * Initialize control.
     *
     * Returns:
     * {DOMElement} A reference to the DIV DOMElement containing the control
     */
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        this.div.innerHTML =
            '<div>' +
                '<form action="#" id="' + this.formdiv_id + '" name="' + this.formdiv_id + '" onsubmit="return false;">' +
                    '<fieldset>' +
                        '<input class="autovalue default" type="text" title="adres, postcode of plaatsnaam" id="' + this.input_id +'" name="'+ this.input_id + '" />' +
                        '<input type="submit" id="' + this.button_id +'" class="filterbutton" value="Zoek" />' +
                    '</fieldset>' +
                '</form>' +
            '</div>' +
            '<div id="'+ this.resultdiv_id +'" style="display:none;height:300px;"></div>';
        var me = this;
        document.getElementById(this.button_id).onclick = function(){
            me.search();
        };
        document.getElementById(this.input_id).onkeyup = function(){
            me.search();
        };
        return this.div;
    },

    handleGeocodeResponse: function(req){
        var responseText = req.responseText;
        if(req.status === 404){
            document.getElementById(this.resultdiv_id).innerHTML = "De zoekfunctie is niet actief, neem contact op met systeembeheer (status: 404)";
            return false;
        }
        else if(req.status != 200){
            document.getElementById(this.resultdiv_id).innerHTML = "De zoekfunctie is niet actief, neem contact op met systeembeheer (status: )"+req.status;
            return false;
        }

        var format = new Pdok.Format.PdokLocatieServer();
        var suggest = format.read(req.responseText);
        //console.log(suggest)

        if (suggest.docs.length === 0) {
            // zero responses
            document.getElementById(this.resultdiv_id).innerHTML = "Geen locaties gevonden ...";
        } else {
            // > 0 hit show suggestions
            if(suggest.docs.length > 0){
                var searchString = document.getElementById(this.input_id).value;
                document.getElementById(this.resultdiv_id).innerHTML =
                    '<span class="closeWindow"><a onclick="return false;"><img class="closeWindow" src="' + Pdok.ApiUrl +
                    '/styles/default/img/close.gif" alt="Sluiten" title="Sluiten"/></a></span>' +
                    '<span class="searchedFor">Gezocht op: "' + searchString +
                    '"</span><h3>Zoekresultaten</h3><ul id="' + this.geozet_id + '" class="geozetSuggestions"></ul>';
            }
            for (i = 0; i < suggest.docs.length; i++) {
                var obj = suggest.docs[i];
                var suggestion = obj.weergavenaam + ' (' + obj.type + ')';
                var li = '<li><a href="#" id="'+obj.id+'">' + suggestion +'</a></li>';
                document.getElementById(this.geozet_id).innerHTML += li;
            }
        }
        this.showResults();
        return false;
    },
    handleGeocodeResponseAdres: function(req){
        var responseText = req.responseText;
        if(req.status === 404){
            console.error("De zoekfunctie is niet actief, neem contact op met systeembeheer (status: 404)");
            return false;
        }
        else if(req.status != 200){
            console.error("De zoekfunctie is niet actief, neem contact op met systeembeheer (status: )"+req.status);
            return false;
        }

        var format = new Pdok.Format.PdokLocatieServer();
        var suggest = format.read(req.responseText);
        //console.log(suggest)

        if (suggest.docs.length === 0) {
            // zero responses
            alert("Geen locaties gevonden ...");
        } else {
            // > 0 Zoom in to the 1st found address
			var obj = suggest.docs[0];
			this.resultClickAdres(obj.id);
        }
        return false;
    },

    search: function() {
        var searchString = document.getElementById(this.input_id).value;
        if (searchString.length<2){this.hideResults();return}
        document.getElementById(this.resultdiv_id).innerHTML = 'Bezig met zoeken...';
        var params = {}; //{request: 'geocode'};
        params[this.geocoderParameter] = searchString;
        if (searchString && searchString.length>0){
            OpenLayers.Request.GET({
                url: this.geocoderUrl,
                params: params,
                scope: this,
                callback: this.handleGeocodeResponse
                // failure: this.handleError
            });
        }
        return false;
    },
    searchAdres: function(adres) {
        var searchString = adres;
        if (searchString.length<2){return}
        var params = {}; //{request: 'geocode'};
        params[this.geocoderParameter] = searchString;
        if (searchString && searchString.length>0){
            OpenLayers.Request.GET({
                url: this.geocoderUrl,
                params: params,
                scope: this,
                callback: this.handleGeocodeResponseAdres
                // failure: this.handleError
            });
        }
        return false;
    },
    hideResults: function() {
        document.getElementById(this.resultdiv_id).style.display = 'none';
        //document.getElementById(this.input_id).value = '';
    },
    showResults: function() {
        document.getElementById(this.resultdiv_id).style.display = 'block';
    },
    resultClick: function(id, event) {
        //console.log(id);
        // retrieve the id, and get full info from
        // https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=
        event.preventDefault();
        lookupUrl = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?';
        OpenLayers.Request.GET({
                url: lookupUrl,
                params: {id:id},
                scope: this,
                callback: this.handleLookupResponse
                // failure: this.handleError
            });

    },
    resultClickAdres: function(id) {
        //console.log(id);
        // retrieve the id, and get full info from
        // https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=
        lookupUrl = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?';
        OpenLayers.Request.GET({
                url: lookupUrl,
                params: {id:id},
                scope: this,
                callback: Pdok.Api.prototype.handleLookupResponseAdres
                // failure: this.handleError
            });

    },
    handleLookupResponse: function(req){
        let  currentApi = null;
        // check for running in map editor or as map
        if (typeof api !== 'undefined') {
            currentApi = api;
        }else {
            // in case of multiple maps on page, prevent zoom to if map is not the clicked map
            // however, multiple maps with multiple geocoders does not seem to work anyways...
            if (this.map.div.id !== "map_" + this.api_id){
                return false;
            }
            currentApi = window["api_" + this.api_id];
        }
        

        currentApi.searchFeaturesLayer.removeAllFeatures();
        var format = new Pdok.Format.PdokLocatieServer();
        var lookup = format.read(req.responseText);
        // console.log(lookup);
        if (lookup.docs[0]){
            var ft = new OpenLayers.Format.WKT().read(lookup.docs[0].centroide_rd)
            var x = ft.geometry.x;
            var y = ft.geometry.y;
            var zoom = lookup.docs[0].type;
            var z = this.zoomScale[zoom];
            
            // Add marker to the map for the found location
            var wkt = 'POINT('+x+' '+y+')';
            weergavenaam = lookup.docs[0].weergavenaam;
            this.mt = 'mt6';
            currentApi.searchFeaturesLayer.features.push(currentApi.createFeature(wkt, this.mt, 'Adres', weergavenaam));
            this.map.setCenter(new OpenLayers.LonLat(x, y), z);
        }
        currentApi.searchFeaturesLayer.redraw();
        return false;
    },
    CLASS_NAME: "OpenLayers.Control.GeocoderControl"
});

/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Control.js
 *
 * Class: OpenLayers.Control.LoadingPanel
 * In some applications, it makes sense to alert the user that something is
 * happening while tiles are loading. This control displays a div across the
 * map when this is going on.
 *
 * Inherits from:
 *  - <OpenLayers.Control>
 */
OpenLayers.Control.LoadingPanel = OpenLayers.Class(OpenLayers.Control, {

    /**
     * Property: counter
     * {Integer} A counter for the number of layers loading
     */
    counter: 0,

    /**
     * Property: maximized
     * {Boolean} A boolean indicating whether or not the control is maximized
    */
    maximized: false,

    /**
     * Property: visible
     * {Boolean} A boolean indicating whether or not the control is visible
    */
    visible: true,

    /**
     * Constructor: OpenLayers.Control.LoadingPanel
     * Display a panel across the map that says 'loading'.
     *
     * Parameters:
     * options - {Object} additional options.
     */
    initialize: function(options) {
         OpenLayers.Control.prototype.initialize.apply(this, [options]);
    },

    /**
     * Function: setVisible
     * Set the visibility of this control
     *
     * Parameters:
     * visible - {Boolean} should the control be visible or not?
    */
    setVisible: function(visible) {
        this.visible = visible;
        if (visible) {
            OpenLayers.Element.show(this.div);
        } else {
            OpenLayers.Element.hide(this.div);
        }
    },

    /**
     * Function: getVisible
     * Get the visibility of this control
     *
     * Returns:
     * {Boolean} the current visibility of this control
    */
    getVisible: function() {
        return this.visible;
    },

    /**
     * APIMethod: hide
     * Hide the loading panel control
    */
    hide: function() {
        this.setVisible(false);
    },

    /**
     * APIMethod: show
     * Show the loading panel control
    */
    show: function() {
        this.setVisible(true);
    },

    /**
     * APIMethod: toggle
     * Toggle the visibility of the loading panel control
    */
    toggle: function() {
        this.setVisible(!this.getVisible());
    },

    /**
     * Method: addLayer
     * Attach event handlers when new layer gets added to the map
     *
     * Parameters:
     * evt - {Event}
    */
    addLayer: function(evt) {
        if (evt.layer) {
            evt.layer.events.register('loadstart', this, this.increaseCounter);
            evt.layer.events.register('loadend', this, this.decreaseCounter);
        }
    },

    /**
     * Method: setMap
     * Set the map property for the control and all handlers.
     *
     * Parameters:
     * map - {<OpenLayers.Map>} The control's map.
     */
    setMap: function(map) {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        this.map.events.register('preaddlayer', this, this.addLayer);
        for (var i = 0; i < this.map.layers.length; i++) {
            var layer = this.map.layers[i];
            layer.events.register('loadstart', this, this.increaseCounter);
            layer.events.register('loadend', this, this.decreaseCounter);
        }
    },

    /**
     * Method: increaseCounter
     * Increase the counter and show control
    */
    increaseCounter: function() {
        this.counter++;
        if (this.counter > 0) {
            if (!this.maximized && this.visible) {
                this.maximizeControl();
            }
        }
    },

    /**
     * Method: decreaseCounter
     * Decrease the counter and hide the control if finished
    */
    decreaseCounter: function() {
        if (this.counter > 0) {
            this.counter--;
        }
        if (this.counter == 0) {
            if (this.maximized && this.visible) {
                this.minimizeControl();
            }
        }
    },

    /**
     * Method: draw
     * Create and return the element to be splashed over the map.
     */
    draw: function () {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        return this.div;
    },

    /**
     * Method: minimizeControl
     * Set the display properties of the control to make it disappear.
     *
     * Parameters:
     * evt - {Event}
     */
    minimizeControl: function(evt) {
        this.div.style.display = "none";
        this.maximized = false;

        if (evt != null) {
            OpenLayers.Event.stop(evt);
        }
    },

    /**
     * Method: maximizeControl
     * Make the control visible.
     *
     * Parameters:
     * evt - {Event}
     */
    maximizeControl: function(evt) {
        this.div.style.display = "block";
        this.maximized = true;

        if (evt != null) {
            OpenLayers.Event.stop(evt);
        }
    },

    /**
     * Method: destroy
     * Destroy control.
     */
    destroy: function() {
        if (this.map) {
            this.map.events.unregister('preaddlayer', this, this.addLayer);
            if (this.map.layers) {
                for (var i = 0; i < this.map.layers.length; i++) {
                    var layer = this.map.layers[i];
                    layer.events.unregister('loadstart', this,
                        this.increaseCounter);
                    layer.events.unregister('loadend', this,
                        this.decreaseCounter);
                }
            }
        }
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },

    CLASS_NAME: "OpenLayers.Control.LoadingPanel"

});
