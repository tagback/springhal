import { } from 'jasmine';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HalRestService } from '../index';
import { SpringHalModule } from '../src/spring-hal.module';
import { TestModel } from './models';

describe('HalRestService', () => {


    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, SpringHalModule],
            providers: [HalRestService],
        });

    });

    it('get()', () => {
        let restService = TestBed.get(HalRestService);
        let http = TestBed.get(HttpTestingController);
       
        restService.get('blabla',TestModel).subscribe((res:TestModel) => {
           expect(res.test).toEqual("bla");
        });


        http.expectOne('blabla').flush({'test':'bla'});
    });

   

});