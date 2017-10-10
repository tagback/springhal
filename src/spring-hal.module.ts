import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HalRestService } from './hal-rest.service';
import { HalModelBuilder } from './hal-model-builder.service';


@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [HalRestService, HalModelBuilder]
})
export class SpringHalModule { }