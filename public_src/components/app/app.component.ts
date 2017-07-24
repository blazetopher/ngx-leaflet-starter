import {Component, ViewChild} from "@angular/core";
import {NavigatorComponent} from "../navigator/navigator.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {MapService} from "../../services/map.service";
import {GeocodingService} from "../../services/geocoding.service";
import {Location} from "../../core/location.class";

@Component({
    selector: "app",
    template: require<any>("./app.component.html"),
    styles: [
        require<any>("./app.component.less")
    ],
    providers: []
})
export class AppComponent {

    @ViewChild(ToolbarComponent) toolbarComponent: ToolbarComponent;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        let map = L.map("map", {
            zoomControl: false,
            center: L.latLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: "topright" }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
        this.geocoder.getCurrentLocation()
            .subscribe(
                location => map.panTo([location.latitude, location.longitude]),
                err => console.error(err)
            );
        this.toolbarComponent.Initialize();

        this.addTimeControl(map);

    }

    addTimeControl(map) {

        let timeDimension = L.timeDimension({
              period: "PT5M",
          });

        // helper to share the timeDimension object between all layers
        // map.timeDimension = timeDimension; 
        // otherwise you have to set the 'timeDimension' option on all layers.

        var player        = new L.TimeDimension.Player({
            transitionTime: 100, 
            loop: false,
            startOver:true
        }, timeDimension);

        var timeDimensionControlOptions = {
            player:        player,
            timeDimension: timeDimension,
            position:      'bottomleft',
            autoPlay:      true,
            minSpeed:      1,
            speedStep:     0.5,
            maxSpeed:      15,
            timeSliderDragUpdate: true
        };

        var timeDimensionControl = new L.Control.TimeDimension(timeDimensionControlOptions);
        map.addControl(timeDimensionControl);

    }
}
