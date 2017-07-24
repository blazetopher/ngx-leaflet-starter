declare namespace L {
    export function timeDimension(options?: any): any;

    class TimeDimension{};
    
    namespace TimeDimension {
        class Player {
            constructor(options?: any, tdim: any);
        };
    }

    namespace Control {
        class TimeDimension extends Control {
            constructor(options?: any);
        }
    }

    // This is an attempt to get the 'map.timeDimension = timeDimension;' line in app.components.ts to work...doesn't work!
    namespace Map {
        export var timeDimension: any;
    }

}
