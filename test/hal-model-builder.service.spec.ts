import { } from 'jasmine';
import { TestBed,inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HalRestService } from '../index';
import { SpringHalModule } from '../src/spring-hal.module';
import { HalModelBuilder } from '../src/hal-model-builder.service';
import { TestModel ,ResolveTestModel, FlatResolveTestModel} from './models';
import {MockHalRestService} from './mock-hal-rest-service';

describe('HalModelBuilder', () => {


    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, SpringHalModule],
            providers: [HalRestService],
        });

    });

    it('build(empty)', () => {
        let builder = TestBed.get(HalModelBuilder);
        let restService = TestBed.get(HalRestService);
     
        const response = '';

        let model : TestModel = builder.build(TestModel,response,restService);
        expect(model).toBeDefined();
        expect(model.test).toBeUndefined();
        
       
      
    });

    it('build(_embedded)', () => {
        let builder = TestBed.get(HalModelBuilder);
        let restService = TestBed.get(HalRestService);
     
        const response = {
            "_embedded":{
                "tests":[
                    {"test":"test1"},
                    {"test":"test2"}
                ]
            }
        };

        let model : TestModel[] = builder.build(TestModel,response,restService);
        
        expect(model.length).toBe(2);
        expect(model[0].test).toBe("test1");
        expect(model[1].test).toBe("test2");
        
    });

    it('build(content)', () => {
        let builder = TestBed.get(HalModelBuilder);
        let restService = TestBed.get(HalRestService);
     
        const response = {
            "content":{
                "test":"test"
                   
            }
        };

        let model : TestModel = builder.build(TestModel,response,restService);
        
        expect(model).toBeDefined();
        expect(model.test).toBe("test");
        
    });

    it('build()', () => {
        let builder = TestBed.get(HalModelBuilder);
        let restService = TestBed.get(HalRestService);
     
        const response = {
            "test":"test"
        };

        let model : TestModel = builder.build(TestModel,response,restService);
        
        expect(model).toBeDefined();
        expect(model.test).toBe("test");
        
    });

    it('buildLink()', () => {
        let builder = TestBed.get(HalModelBuilder);
        let restService = TestBed.get(HalRestService);
        let http = TestBed.get(HttpTestingController);
     
        const response = {
            "_links":{
                "testLink":{
                    "href":"http://whatever.to.test"
                }
            }
        };

        let model : TestModel = builder.build(TestModel,response,restService);
        
        expect(model).toBeDefined();
        expect(model.testLink).toBeDefined();

        model.testLink.subscribe((link:TestModel) => {
            expect(link).toBeDefined();
            expect(link.test).toBe('bla')
        });

        http.expectOne('http://whatever.to.test').flush({'test':'bla'});
        
    });

    it('buildLink(relationName)', () => {
        let builder = TestBed.get(HalModelBuilder);
        let restService = TestBed.get(HalRestService);
        let http = TestBed.get(HttpTestingController);
     
        const response = {
            "_links":{
                "relationTestLink":{
                    "href":"http://whatever.to.test"
                }
            }
        };

        let model : TestModel = builder.build(TestModel,response,restService);
        
        expect(model).toBeDefined();
        expect(model.namedLink).toBeDefined();

        model.namedLink.subscribe((link:TestModel) => {
            expect(link).toBeDefined();
            expect(link.test).toBe('bla')
        });

        http.expectOne('http://whatever.to.test').flush({'test':'bla'});
        
    });

    it('buildLink(array)', () => {
        let builder = TestBed.get(HalModelBuilder);
        let restService = TestBed.get(HalRestService);
        let http = TestBed.get(HttpTestingController);
     
        const response = {
            "_links":{
                "testLinks":{
                    "href":"http://whatever.to.test"
                }
            }
        };

        let model : TestModel = builder.build(TestModel,response,restService);
        
        expect(model).toBeDefined();
        expect(model.testLinks).toBeDefined();

        model.testLinks.subscribe((link:TestModel[]) => {
            expect(link.length).toBe(2);
            expect(link[0].test).toBe('test1');
            expect(link[1].test).toBe('test2');
        });

        http.expectOne('http://whatever.to.test').flush(
            {
                "_embedded":{
                    "tests":[
                        {"test":"test1"},
                        {"test":"test2"}
                    ]
                }
            }
        );
        
    });

    it('buildResolved()', inject([HttpTestingController],
        (http: HttpTestingController) => { 


        let builder = TestBed.get(HalModelBuilder);
        let restService = new MockHalRestService(builder);
        
     
        const response = {
            "_links":{
                "link":{
                    "href":"first"
                }
            }
        };
           
        restService.match('first',
            {
                "_links":{
                    "testLink":{
                        "href":"second"
                    }
                }
            }
        );

        restService.match('second',
            {
                "test":"testText"
            }
        );

        let model : ResolveTestModel = builder.build(ResolveTestModel,response,restService);
        expect(model).toBeDefined();
        expect(model.resolve).toBeDefined();
        expect(model.resolve).toBe('testText');

     

        
        
    }));

    it('buildResolvedFlatten', inject([HttpTestingController],
        (http: HttpTestingController) => { 


        let builder = TestBed.get(HalModelBuilder);
        let restService = TestBed.get(HalRestService);
             
        const response = {
            "_links":{
                "link":{
                    "href":"first"
                }
            }
        };
           
        let model : FlatResolveTestModel = builder.build(FlatResolveTestModel,response,restService);
        expect(model).toBeDefined();
       

        http.expectOne('first').flush(
            {
                "_embedded":{
                    "tests":[
                        {"test":"test1"},
                        {"test":"test2"}
                    ]
                }
            }
        );

      
        expect(model.resolve).toBeDefined();
        expect(model.resolve).toBe('test1,test2');
       

     

        
        
    }));
});