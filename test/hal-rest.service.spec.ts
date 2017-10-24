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
        let requestMock = http.expectOne('blabla');
        
        expect(requestMock.request.method).toBe('GET');
        expect(requestMock.request.headers.get('Content-Type')).toBe('application/hal+json');
        requestMock.flush({'test':'bla'});

    });

    it('post()', () => {
        let restService = TestBed.get(HalRestService);
        let http = TestBed.get(HttpTestingController);
       
        let model = new TestModel();
        model.test = "TestText";

        restService.post('blabla',TestModel).subscribe((res:TestModel) => {
           expect(res.test).toEqual("bla");
        });

        let requestMock = http.expectOne('blabla');

        expect(requestMock.request.method).toBe('POST');
        expect(requestMock.request.headers.get('Content-Type')).toBe('application/json');
        requestMock.flush({'test':'bla'});
    });

    it('patch()', () => {
        let restService = TestBed.get(HalRestService);
        let http = TestBed.get(HttpTestingController);
       
        let model = new TestModel();
        model.test = 'patchTest';
        model.addPlainLinks('_self','patchHref') ;

        restService.patch(model).subscribe((res:TestModel) => {
            
           expect(res.test).toEqual("bla");
        });


        let requestMock = http.expectOne('patchHref');
        expect(requestMock.request.method).toBe('PATCH');
        expect(requestMock.request.headers.get('Content-Type')).toBe('application/merge-patch+json');
        expect(requestMock.request.body).toBe('{"test":"patchTest"}');
        requestMock.flush({'test':'bla'});
    });

    it('put()', () => {
        let restService = TestBed.get(HalRestService);
        let http = TestBed.get(HttpTestingController);
       
        let model = new TestModel();
        model.test = 'putTest';
        model.addPlainLinks('_self','putHref') ;

        restService.put(model).subscribe((res:TestModel) => {
           expect(res.test).toEqual("bla");
        });


        let requestMock = http.expectOne('putHref');
        expect(requestMock.request.method).toBe('PUT');
        expect(requestMock.request.headers.get('Content-Type')).toBe('application/json');
        expect(requestMock.request.body).toBe('{"test":"putTest"}');
        requestMock.flush({'test':'bla'});
    });

    it('delete()', () => {
        let restService = TestBed.get(HalRestService);
        let http = TestBed.get(HttpTestingController);
       
        let model = new TestModel();
        model.test = 'deleteTest';
        model.addPlainLinks('_self','deleteHref') ;

        restService.delete(model).subscribe((status:number) => {
           expect(status).toBe(204);
        });


        let requestMock = http.expectOne('deleteHref');
        expect(requestMock.request.method).toBe('DELETE');
        requestMock.flush(null,{status:204,statusText:'Deleted.'});
    });

   

});