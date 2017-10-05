import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HalRestService } from './hal-rest.service';
import { HalModelBuilder } from './hal-model-builder.service';
var SpringHalModule = /** @class */ (function () {
    function SpringHalModule() {
    }
    SpringHalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpClientModule],
                    exports: [],
                    declarations: [],
                    providers: [HalRestService, HalModelBuilder]
                },] },
    ];
    /** @nocollapse */
    SpringHalModule.ctorParameters = function () { return []; };
    return SpringHalModule;
}());
export { SpringHalModule };
//# sourceMappingURL=spring-hal.module.js.map